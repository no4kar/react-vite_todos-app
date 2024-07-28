import { getClient } from '../utils/axios.client';
import { BASE_URL } from '../utils/helpers';

const client = getClient({
  baseURL: `${BASE_URL}/auth`
});

export const authApi = {
  login: async ({
    email,
    password,
  }: {
    email: string,
    password: string,
  }): Promise<boolean> => {
    return client.post<{ token: string }>('/login', { email, password })
      .then(res => {
        // accessTokenApi.save(res.data.token);
        console.info(res);

        return true;
      })
      .catch(err => {
        // accessTokenApi.remove();
        console.error(err);

        return false;
      });
  },
};