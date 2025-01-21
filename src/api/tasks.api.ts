import { TyTask } from '../types/Task.type';
import { getClient, onReq, onRes } from '../utils/axios.client';
import { env } from '../constants/varsFromEnv';
import { authApi } from './auth.api';

const client = getClient({
  baseURL: `${env.API_URL}/tasks`,
});

export const tasksApi = {
  async getAll(
    query: TyTask.Request.GetAll,
  ) {
    const params: {
      userId: string,
      name?: string,
      page: string,
      size: string,
    } = {
      userId: query.userId,
      page: (query.page && query.page > 1)
        ? String(query.page)
        : '1',
      size: (query.size && query.size > 0)
        ? String(query.size)
        : '100',
    };

    if (query.name) {
      params.name = query.name;
    }

    return client.get('', { params })
      .then<TyTask.Response.GetAll>(onRes.obtainData);
  },

  async create(props: TyTask.Request.Create) {
    return client.post('', props)
      .then<TyTask.Response.Create>(onRes.obtainData);
  },

  async remove(taskId: TyTask.Item['id']) {
    return client.delete(`/${taskId}`)
      .then<TyTask.Item['id']>(() => taskId);
  },

  async update({
    id,
    userId,
    name,
  }: TyTask.Request.Update) {
    return client.put(`/${id}`, { userId, name })
      .then<TyTask.Response.Update>(onRes.obtainData);
  },
};

client.interceptors.request.use(onReq.stickAccessToken);
client.interceptors.response.use(
  onRes.toConsoleInfo,
  onRes.handleUnauthorizedError(client, authApi.refresh));
