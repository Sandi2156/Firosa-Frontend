import axios, { AxiosRequestConfig, Method } from "axios";

interface ApiCallResponse {
  success: boolean;
  message: string;
  data: null | object;
  errorCode: string;
}

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
}): Promise<ApiCallResponse> {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers: { "Content-Type": "application/json", ...headers },
    withCredentials: true,
  };

  if (body) config.data = JSON.stringify(body);

  try {
    const response = await axios(config);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }

    return {
      success: false,
      message: error as string,
      data: null,
      errorCode: "unknown_error",
    };
  }
}

export default makeApiCall;
