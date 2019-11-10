import { toast } from "react-toastify";

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  url: string;
  method: HttpMethod;
}

export const send = <T>({ url, method }: Options): Promise<T> =>
  fetch(url, { method })
    .then(response => response.json())
    .catch(_e => toast.error(`Http request to ${url} failed`));
