import VerifyPhone from "@pages/regist/VerifyPhone";
import VerifyCode from "@pages/regist/VerifyCode";
import VerifyPassword from "@pages/regist/VerifyPassword";
import CountryPicker from "@comps/CountryPicker";
//路由配置文件
const routes = [
  { path: "/regist/verifyPhone", component: VerifyPhone },
  { path: "/regist/verifycode", component: VerifyCode },
  { path: "/regist/verifypassword", component: VerifyPassword },
  { path: "/regist/countrypicker", component: CountryPicker },
];
export default routes;
