import { toast } from 'react-toastify';
import mockedResponse from '../mocked-response.json';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  url: string;
  method: HttpMethod;
};

type HttpError = {
  cod: number;
  message: string;
};

const MAX_SUCCESS_CODE = 299;

export const isError = (resp: any): resp is HttpError => resp.cod > MAX_SUCCESS_CODE;

const DEV = false;

export const send = <T>({ url, method }: Options): Promise<T | HttpError> => DEV
  ? Promise.resolve(mockedResponse)
  : fetch(url, { method })
  .then((response) => response.json())
  .catch((_e) => toast.error(`Http request to ${url} failed`));
