import React, { useState } from "react";
import msg from "../../../assets/imgs/msg.png";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import { reqRegistUser } from "@api/regist";

function VerifyPassword({ form, location,history }) {
  //定义密码显示隐藏的状态参数
  const [isSecret, setIsSecret] = useState(true);
  //定义下一步按钮的状态的参数
  const [isDisabled, setIsDisabled] = useState(true);
  const { getFieldProps, getFieldValue } = form;
  //验证密码规则的方法
  const validator = (rule, value, callback) => {
    //验证码通过，则改变按钮的状态值
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      isDisabled = false;
    }
    setIsDisabled(isDisabled);
    callback();
  };
  //点击小眼睛，设置密码是否可见的回调
  const setSecret = () => {
    setIsSecret(!isSecret);
  };
  //点击下一步按钮的回调
  const next = async () => {
    const phone = location.state;
    const password = getFieldValue("password");
    await reqRegistUser(phone, password);
    history.push("/login");
  };
  //设置眼睛小图标的样式切换
  const iconClassName =
    "iconfont verify-password-icon " + (isSecret ? "icon-eye1" : "icon-eye");

  return (
    <div>
      <NavBar
        mode="light"
        icon={<Icon className="left" type="left" />}
        onLeftClick={() => console.log("onLeftClick")}
      >
        硅谷注册
      </NavBar>
      <WingBlank>
        <img className="verify-code-msg" src={msg} alt="msg" />
        <p className="verify-code-tip">请设置登录密码</p>
        <InputItem
          placeholder="请设置8-20位登录密码"
          extra={<span onTouchEnd={setSecret} className={iconClassName}></span>}
          type={isSecret ? "password" : "text"}
          {...getFieldProps("password", {
            rules: [{ validator: validator }],
          })}
        />
        <p>
          密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
        </p>
        <Button
          type="warning"
          className="warning-btn"
          onClick={next}
          disabled={isDisabled}
        >
          下一步
        </Button>
        <span className="verify-code-question">
          遇到问题 ?请<a>联系客服</a>
        </span>
      </WingBlank>
    </div>
  );
}
export default createForm()(VerifyPassword);
