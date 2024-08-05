import { env } from '../constants/varsFromEnv';

const PREFIX = env.LOCAL_CLIENT_PREFIX;

const client = {
  read: <T>(key: string): T | null => {
    const data = window.localStorage.getItem(key);

    try {
      return data && JSON.parse(data);
    } catch (error) {
      return null;
    }
  },

  write: <T>(key: string, data: T): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  },

  remove: (key: string,): void => {
    window.localStorage.removeItem(key);
  },

  init: <T>(
    key: string,
    initialData: T,
    isValid: (item: any) => boolean,
  ): T => {
    const storedData = client.read<T>(key);

    if (Array.isArray(storedData) && storedData.every(isValid)) {
      return storedData;
    }

    if (storedData && isValid(storedData)) {
      return storedData;
    }

    client.write(key, initialData);

    return initialData;
  },
};

export function getClient(postfix: string) {
  const key = PREFIX.concat(postfix);

  return {
    read: <T>(): T | null => client.read(key),
    write: <T>(data: T): void => client.write(key, data),
    remove: (): void => client.remove(key),
    init: <T>(
      initialData: T,
      isValid: (item: any) => boolean,
    ): T => client.init(key, initialData, isValid),
  };
}

