// get url from env var(heroku) or use local
export const HOST = process.env.REACT_APP_SECRET_CODE !== undefined ? process.env.REACT_APP_SECRET_CODE : 'http://localhost:8000';
export const API = '/api/v1';