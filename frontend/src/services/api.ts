import axios from 'axios';

const axiosAPI = axios.create({
  baseURL : "PUBLIC_URL"
});

export function search(url: string): any {
  return axiosAPI.post('/search', { url });
}