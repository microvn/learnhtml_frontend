import runtimeEnv from '@mars/heroku-js-runtime-env';

// get url from env var(heroku) or use local
export const HOST = runtimeEnv().REACT_API_URL !== undefined ? runtimeEnv().API_URL : 'http://localhost:8000';
export const API = '/api/v1';