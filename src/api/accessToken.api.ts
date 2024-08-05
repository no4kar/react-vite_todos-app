import { getClient } from '../utils/local.client';

const localClient = getClient('accessToken');

export const accessTokenApi = {
  get: () => localClient.read<string>(),
  save: (token: string) => localClient.write(token),
  remove: () => localClient.remove(),
};
