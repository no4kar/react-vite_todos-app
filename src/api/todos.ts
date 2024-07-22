import { TyTodo } from '../types/Todo';
// import { getClient } from '../utils/httpClient';
import { getClient } from '../utils/axiosClient';
import { BASE_URL } from '../utils/helpers';

const client = getClient({
  baseURL: `${BASE_URL}/todos`
});

export const todosApi = {
  getAll(
    query: TyTodo.Request.GetQuery,
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

    return client.get<TyTodo.Response.Get>('', { params })
      .then(res => res.data);
  },

  create({ userId, title, completed }: TyTodo.CreationAttributes) {
    return client.post<TyTodo.Item>('', { userId, title, completed });
  },

  remove(todoId: TyTodo.Item['id']) {
    return client.delete(`/${todoId}`)
      .then(() => todoId);
  },

  // update({
  //   id,
  //   userId,
  //   title,
  //   completed,
  // }: TyTodo.Item){
  //   return client.patch<TyTodo.Item>(`/${id}`, { userId, title, completed });
  // },
};
