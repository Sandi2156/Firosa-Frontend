import axios, { AxiosRequestConfig, Method } from "axios";

async function makeApiCall({
  method,
  url,
  body,
  headers = {},
}: {
  method: Method;
  url: string;
  body?: object;
  headers?: object;
}) {
  const config: AxiosRequestConfig = {
    url,
    method,
    data: body ? JSON.stringify(body) : null,
    headers: { "Content-Type": "application/json", ...headers },
    withCredentials: true,
  };

  const response = await axios(config);

  return response.data;
}

export default makeApiCall;
