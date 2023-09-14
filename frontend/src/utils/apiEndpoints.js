const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT || "";
const basePath = import.meta.env.VITE_API_BASE;

export const apiEndpoint = `${host}${port ? ":" : ""}${port}/${basePath}`;
