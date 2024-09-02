import makeApiCall from "../lib/make-api-call";

async function getProjects() {
  const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/v1/project`;

  return await makeApiCall({ method: "GET", url });
}

async function deployProject(gitURL: string) {
  const url = `${import.meta.env.VITE_SERVER_ENDPOINT}/v1/project`;

  return await makeApiCall({ method: "POST", url, body: { gitURL } });
}

export { getProjects, deployProject };
