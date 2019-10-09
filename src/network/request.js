import axios from 'axios';
export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/v1/',
    timeout: 5000
  });


  return instance(config)

}
