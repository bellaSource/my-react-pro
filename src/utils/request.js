import axios from "axios";
//设置请求的根路径
const request = axios.create({
  baseURL: "/",
});
//设置请求拦截器
request.interceptors.request.use((config) => {
  //config包含了请求的所有信息
  return config;
});
request.interceptors.response.use(
  (response) => {
    //响应成功的回调
    if (response.data.code === 20000) {
      return response.data.data;
    } else {
      //功能失败
      return Promise.reject(response.data.message);
    }
  },
  (error) => {
    //响应失败的回调
    if (error.message) {
      //服务器返回了响应，但是响应时失败的
      if (error.message.status === 401) {
        return Promise.reject("网络超时");
      }
    } else {
      //服务器没有返回响应
      return Promise.reject("请检查网络连接");
    }
  }
);
export default request;
