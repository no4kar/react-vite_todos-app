import { BASE_URL, wait } from './helpers';
import type { TyGeneral } from '../types/General';

export function getClient(
  baseURL = BASE_URL,
) {
  console.info(`BASE_URL = ${BASE_URL}`);// eslint-disable-line

  function request<T>(
    url: string,
    method: TyGeneral.RequestMethod = 'GET',
    data: any = null, // we can send any data to the server
  ): Promise<T> {
    const options: RequestInit = { method };

    if (data) {
      // We add body and Content-Type only for the requests with data
      options.body = JSON.stringify(data);
      options.headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      };
    }

    // DON'T change the delay it is required for tests
    return wait(100)
      .then(() => fetch(baseURL + url, options))
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      });
  }

  return {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
    patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
    delete: <T>(url: string) => request<T>(url, 'DELETE'),
  };
}
