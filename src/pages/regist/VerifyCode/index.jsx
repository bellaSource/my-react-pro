import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { createForm } from "rc-form";
import { reqSendCode } from "@api/login";
import { reqVerifyCode } from "@api/regist";

import msg from "./msg.png";
import "./index.css";
const TOTAL_TIME = 6;
class VerifyCode extends Component {
  state = {
    //决定是否显示获取验证码
    isSendCode: true,
    //倒计时事件
    time: TOTAL_TIME,
    //按钮的样式的
    isDisabled: true,
  };
  //设置倒计时定时器
  setTimer = () => {
    this.timer = setInterval(() => {
      const time = this.state.time - 1;
      if (time <= 0) {
        //清除定时器，并且重置时间和按钮
        clearInterval(this.timer);
        this.setState({
          isSendCode: false,
          time: TOTAL_TIME,
        });
        return;
      }
      this.setState({
        time,
      });
    }, 1000);
  };
  componentDidMount() {
    //初始化的时候设置定时器
    this.setTimer();
  }
  componentWillUnmount() {
    //页面销毁前清除定时器
    clearInterval(this.timer);
  }
  //验证表单的回调函数
  validator = (rule, value, callback) => {
    const reg = /^[0-9]{6}$/;
    let isDisabled = true;
    if (reg.test(value)) {
      isDisabled = false;
    }

    this.setState({
      isDisabled,
    });
    callback();
  };
  //发送验证码的回调函数
  sendCode = () => {
    const phone = this.props.location.state;
    Modal.alert("", `我们将发送短信/语音验证码至：${phone}`, [
      {
        text: "取消",
      },
      {
        text: "确定",
        style: { backgroundColor: "red", color: "#fff" },
        onPress: async () => {
          //当用户点击确认，发送请求，请求短信验证码
          await reqSendCode(phone);
          this.setState({
            isSendCode: true,
          });
          //重新开启定时器
          this.setTimer();
        },
      },
    ]);
  };
  //点击下一步按钮的回调
  next = async () => {
    const phone = this.props.location.state;
    const code = this.props.form.getFieldValue("code");
    // 验证验证码是否正确
    await reqVerifyCode(phone, code);

    this.props.history.push("/regist/verifypassword", phone);
  };
  //点击向左箭头回退到上一个页面
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { isDisabled, isSendCode, time } = this.state;
    const { getFieldProps } = this.props.form;
    const btnClassName =
      "verify-code-btn" + (isSendCode ? " verify-code-btn-disabled" : "");
    const btnText = isSendCode ? `重新发送(${time}s)` : "获取验证码";
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon className="left" type="left" onClick={this.goBack} />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册
        </NavBar>
        <WingBlank>
          <img className="verify-code-msg" src={msg} alt="msg" />
          <p className="verify-code-tip">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <div className="verify-code-container">
            <InputItem
              placeholder="请输入手机验证码"
              {...getFieldProps("code", {
                rules: [{ validator: this.validator }],
              })}
            />
            <Button className={btnClassName} onClick={this.sendCode}>
              {btnText}
            </Button>
          </div>
          <Button
            type="warning"
            disabled={isDisabled}
            className="warning-btn"
            onClick={this.next}
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
}
export default createForm()(VerifyCode);
