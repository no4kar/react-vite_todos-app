// axios docs https://axios-http.com/docs/intro
import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';
import { accessTokenApi } from '../api/accessToken.api';
import { TyAuth } from '../types/Auth.type';

export function getClient(
  config: CreateAxiosDefaults<any>)
  : AxiosInstance {
  return axios.create(config);
}

export const onReq = {
  stickAccessToken<T>(req: InternalAxiosRequestConfig<T>) {
    const accessToken = accessTokenApi.get();

    if (accessToken) {
      req.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return req;
  },
}

export const onRes = {
  obtainData<T>(res: AxiosResponse<T>) {
    return res.data;
  },

  toConsoleInfo<T>(res: T) {
    console.info(res);
    return res;
  },

  handleError(
    client: AxiosInstance,
    refresh: () => Promise<TyAuth.Response.Refresh>,
  ) {
    return async (error: any) => {
      const originalRequest = error.config;

      console.error(error);

      if (error.response.status !== 401) {
        throw {
          code: `${error?.response?.status} ${error?.code}`,
          message: error?.response?.data?.message,
          name: error?.name,
          stack: error?.stack,
        };
      }

      // prevent infinity loop
      try {
        const { accessToken } = await refresh();

        accessTokenApi.save(accessToken);
        return client.request(originalRequest);

      } catch (error: any) {
        throw {
          code: `${error?.response?.status} ${error?.code}`,
          message: error?.response?.data?.message,
          name: error?.name,
          stack: error?.stack,
        };
      }
    };
  },
}

