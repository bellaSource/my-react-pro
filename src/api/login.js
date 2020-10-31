import request from "@utils/request";

// 当前公共请求地址前缀
const url_prefix = "/login";

export const reqSendCode = (phone) => {
  return request({
    method: "POST",
    url: `${url_prefix}/digits`,
    data: {
      phone,
    },
  });
};
