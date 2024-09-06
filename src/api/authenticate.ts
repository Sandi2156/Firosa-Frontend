import makeApiCall from "../lib/make-api-call";

async function signUp(email: string, password: string) {
  const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/v1/user/signup`;

  return await makeApiCall({ body: { email, password }, method: "POST", url });
}

async function signIn(email: string, password: string) {
  const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/v1/user/signin`;

  return await makeApiCall({ body: { email, password }, method: "POST", url });
}

async function validateSession() {
  const url = `${
    import.meta.env.VITE_SERVER_ENDPOINT
  }/v1/user/validate-session`;

  return await makeApiCall({ method: "POST", url });
}

export { signUp, signIn, validateSession };
