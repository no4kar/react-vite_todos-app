import axios, {
  AxiosError,
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
      req.headers.Authorization = `Bearer ${accessToken}`;
      req.withCredentials = true;
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

  handleUnauthorizedError(
    client: AxiosInstance,
    refresh: () => Promise<TyAuth.Response.Refresh>,
  ) {
    // prevent infinity loop
    let firstRequest = true;

    return async (error: any) => {
      const originalRequest = error.config;

      if (error.response?.status !== 401
        || !firstRequest
      ) {
        firstRequest = true;
        throw axiosErrorToError(error);
      }

      firstRequest = false;

      try {
        const { accessToken } = await refresh();
        accessTokenApi.save(accessToken);
        return client.request(originalRequest);
      } catch (error: any) {
        throw axiosErrorToError(error);
      }
    };
  },
}

function axiosErrorToError(
  error: AxiosError<{
    message: string,
    error: string,
  }, any>,
) {
  return {
    code: `${error.response?.status} ${error.code}`,
    message: error.response?.data?.message,
    name: error.name,
    stack: `
    CLIENT:
    ${error.stack}

    SERVER:
    ${error.response?.data.error}`,
  };
}
