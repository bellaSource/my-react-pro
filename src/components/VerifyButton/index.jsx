import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import PropTypes from "prop-types";
import { reqVerifyCode } from "@api/common";

export default class VerifyButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.verifyCallback = async (res) => {
      console.log(res);
      //res等于0，表示验证成功
      if (res.ret === 0) {
        try {
          //服务端验证
          await reqVerifyCode(res.randstr, res.ticket);
          this.props.callback();
        } catch (e) {
          Toast.fail(e, 3);
        }
      }
    };
  }
  render() {
    const { disabled, btnText } = this.props;
    console.log(disabled, btnText);
    return (
      <>
        <Button
          style={{ display: disabled ? "block" : "none" }}
          type="warning"
          className="warning-btn"
          disabled
        >
          下一步
        </Button>
        <Button
          style={{ display: !disabled ? "block" : "none" }}
          type="warning"
          id="TencentCaptcha"
          className="warning-btn"
          data-appid="2030765311"
          data-cbfn="verifyCallback"
          className="warning-btn"
        >
          {btnText}
        </Button>
      </>
    );
  }
}
