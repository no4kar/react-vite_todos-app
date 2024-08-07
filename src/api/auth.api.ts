import { getClient, onReq, onRes } from '../utils/axios.client';
import { env } from '../constants/varsFromEnv';
import { TyAuth } from '../types/Auth.type';

const client = getClient({
  baseURL: `${env.API_URL}/auth`,
});

export const authApi = {
  makeCookies: async () => {
    return client.get('/set-cookie')
      .then<TyAuth.Response.Login>(onRes.obtainData);
  },
  
  login: async ({
    email,
    password,
  }: TyAuth.Request.Login
  ) => {
    return client.post<TyAuth.Response.Login>('/login', { email, password })
      .then<TyAuth.Response.Login>(onRes.obtainData);
  },

  registration: async ({
    email,
    password,
  }: TyAuth.Request.Registration
  ) => {
    return client.post('/registration', { email, password })
      .then<TyAuth.Response.Registration>(onRes.obtainData);
  },

  activation: async (
    activationToken: TyAuth.Request.Activation['activationToken']
  ) => {
    return client.get(`/activate/${activationToken}`)
      .then<TyAuth.Response.Activation>(onRes.obtainData);
  },

  refresh: async () => {
    return client.get(`/refresh`)
      .then<TyAuth.Response.Refresh>(onRes.obtainData);
  },
};

client.interceptors.request.use(onReq.stickAccessToken);
client.interceptors.response.use(
  onRes.toConsoleInfo,
  onRes.handleError(client, authApi.refresh));
