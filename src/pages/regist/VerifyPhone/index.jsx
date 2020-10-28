import React, { Component } from "react";
import { NavBar, Icon, InputItem, Button, Modal, Toast } from "antd-mobile";
import { createForm } from "rc-form";

import "./index.css";
import { reqVerifyPhone } from "@api/regist";
import VerifyButton from "@comps/VerifyButton";

class VerifyPhone extends Component {
  state = {
    isDisabled: true,
  };
  componentDidMount() {
    Modal.alert(
      "注册协议及隐私政策",
      <span className="policy-text">
        在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
        <strong className="policy-strong-text">
          请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）
        </strong>
        ：<span className="policy-content">《硅谷用户注册协议》</span>
        <span className="policy-content">《硅谷隐私政策》</span>
      </span>,
      [
        { text: "不同意", onPress: () => console.log("第0个按钮被点击了") },
        { text: "同意", style: { backgroundColor: "red", color: "#000" } },
      ]
    );
  }
  //当用户输入数据时就会触发
  validator = (rule, value, callback) => {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|199)[0-9]{8}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      isDisabled = false;
      console.log(111111111);
    }
    this.setState({ isDisabled });
    console.log(2222222);
    //callback必须调用，否则校验失败
    // callback(message) 校验失败
    // callback() 校验成功
    callback();
  };
  //当点击下一步的回调，
  verifyPhone = async () => {
    try {
      //验证手机号是否注册过
      //获取单个表单项的值
      const phone = this.props.form.getFieldValue("phone");
      //向后台发送请求，验证电话号码是否已存在
      await reqVerifyPhone(phone);
      console.log("success");
    } catch (e) {
      //请求失败--手机号存在
      Toast.fail(e, 3);
    }
  };
  render() {
    const { isDisabled } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册登录
        </NavBar>
        <div className="verify-phone-input">
          <InputItem
            {...getFieldProps("phone", {
              //表单校验规则
              rules: [{ validator: this.validator }],
            })}
            clear
            placeholder="请输入手机号码"
          >
            <div className="verify-phone-prefix">
              <span>+ 86</span>
              <Icon type="down" />
            </div>
          </InputItem>
        </div>
        <VerifyButton
          disabled={isDisabled}
          callback={this.verifyPhone}
          btnText="下一步"
        />
      </div>
    );
  }
}
export default createForm()(VerifyPhone);
