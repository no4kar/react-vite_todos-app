import { TyTodo } from '../types/Todo';
// import { getClient } from '../utils/httpClient';
import { getClient } from '../utils/axiosClient';

const client = getClient({
  baseURL: 'http://localhost:3005/todos'
});

export function getAll(
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
}

export const create = ({ userId, title, completed }: Omit<TyTodo.Item, 'id'>) => {
  return client.post<TyTodo.Item>('/todos', { userId, title, completed });
};

export const remove = (todoId: number) => {
  return client.delete<number>(`/todos/${todoId}`)
    .then(() => todoId);
};

export const update = ({
  id,
  userId,
  title,
  completed,
}: TyTodo.Item) => {
  return client.patch<TyTodo.Item>(`/todos/${id}`, { userId, title, completed });
};
