export const env: {
  API_URL: string;
  CORS_PROXY_URL: string;
  LOCAL_CLIENT_PREFIX: string;
} = Object.freeze({
  API_URL: {
    development: 'http://localhost:3005',
    production: import.meta.env.VITE_API_URL,
  }[import.meta.env.MODE],
  CORS_PROXY_URL:
    import.meta.env.VITE_CORS_PROXY_URL || '',
  LOCAL_CLIENT_PREFIX:
    import.meta.env.VITE_LOCAL_CLIENT_PREFIX || 'TASK_MANAGER_',
});
