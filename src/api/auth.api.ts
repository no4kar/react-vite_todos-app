import { getClient } from '../utils/axios.client';
import { env } from '../constants/varsFromEnv';
import { axiosResToConsoleInfo } from '../utils/helpers';
import { AxiosResponse } from 'axios';
import { TyAuth } from '../types/Auth.type';

const client = getClient({
  baseURL: `${env.API_URL}/auth`
});

export const authApi = {
  login: async ({
    email,
    password,
  }: TyAuth.Request.Login
  ) => {
    return client.post<TyAuth.Response.Login>('/login', { email, password })
      .then<AxiosResponse<TyAuth.Response.Login>>(axiosResToConsoleInfo)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err.response.data.message;
      });
  },

  registration: async ({
    email,
    password,
  }: TyAuth.Request.Registration
  ) => {
    return client.post('/registration', { email, password })
      .then<AxiosResponse<TyAuth.Response.Registration>>(axiosResToConsoleInfo)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err.response.data.error;
      });
  },

  activation: async (
    activationToken: TyAuth.Request.Activation['activationToken']
  ) => {
    return client.get(`/activate/${activationToken}`)
      .then<AxiosResponse<TyAuth.Response.Activation>>(axiosResToConsoleInfo)
      .then(res => res.data)
      .catch(err => {
        console.error(err);
        throw err.response.data.message;
      });
  },
};