// axios docs https://axios-http.com/docs/intro
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export function getClient(
  config: CreateAxiosDefaults<any>)
  : AxiosInstance {
  return axios.create(config);
}
