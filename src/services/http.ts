import { toast } from 'react-toastify';

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

export const send = <T>({ url, method }: Options): Promise<T | HttpError> =>
  fetch(url, {
    method,
    headers: {
      'Accept': 'application/vnd.github.machine-man-preview+json',
      'User-Agent': 'https://sergeikalachev.github.io/weather-app/'
    }
  })
  .then((response) => response.json())
  .catch((_e) => toast.error(`Http request to ${url} failed`));
