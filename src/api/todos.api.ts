import { TyTodo } from '../types/Todo.type';
// import { getClient } from '../utils/httpClient';
import { getClient } from '../utils/axios.client';
import { env } from '../constants/varsFromEnv';
import { accessTokenApi } from './accessToken.api';

const client = getClient({
  baseURL: `${env.API_URL}/todos`
});

client.interceptors.request.use(req => {
  const accessToken = accessTokenApi.get();

  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

export const todosApi = {
  getAll(
    query: TyTodo.Request.GetAll,
  ) {
    const params: any = {
      userId: query.userId,
      page: (query.page && query.page > 1)
        ? String(query.page)
        : '1',
      size: (query.size && query.size > 0)
        ? String(query.size)
        : '100',
    };

    if (query.title) {
      params.title = query.title;
    }

    if (query.completed) {
      params.completed = String(query.completed);
    }

    return client.get<TyTodo.Response.GetAll>('', { params })
      .then(res => res.data);
  },

  create({ userId, title, completed }: TyTodo.CreationAttributes) {
    return client.post<TyTodo.Item>('', { userId, title, completed });
  },

  remove(todoId: TyTodo.Item['id']) {
    return client.delete(`/${todoId}`)
      .then(() => todoId);
  },

  update({
    id,
    userId,
    title,
    completed,
  }: TyTodo.Item) {
    return client.put<TyTodo.Item>(`/${id}`, { userId, title, completed });
  },
};
