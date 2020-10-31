import React, { Component } from "react";
import { reqCountryData } from "@api/common";
import { List, NavBar, Icon } from "antd-mobile";
import "./index.css";
const Item = List.Item; //获取Item标签
export default class CountryPicker extends Component {
  state = {
    countryData: {},
  };
  async componentDidMount() {
    //发送请求，获取城市列表数据
    const countryData = await reqCountryData();
    this.setState({
      countryData,
    });
  }
  //点击右侧导航栏，去对应的位置的方法
  goCountry = (e) => {
    const id = e.target.textContent;
    window.scrollTo(0, document.getElementById(id).offsetTop - 45);
  };
  //点击左上侧返回上一个页面
  goBack = (value) => {
    return () => {
      this.props.history.push(this.props.location.state, value);
    };
  };
  render() {
    const { countryData } = this.state;
    const countryDataKeys = Object.keys(countryData);
    return (
      <div>
        <NavBar
          className="country-picker-nav"
          mode="light"
          icon={<Icon className="left" type="left" />}
        >
          选择国家或者地区
        </NavBar>
        <ul className="country-picker-sidebar" onTouchEnd={this.goCountry}>
          {countryDataKeys.map((key) => {
            return <li key={key}>{key}</li>;
          })}
        </ul>
        <div className="country-picker-container">
          {countryDataKeys.map((key) => {
            return (
              <List id={key} renderHeader={() => key} key={key}>
                {countryData[key].map((item, index) => {
                  const key = Object.keys(item)[0];
                  const value = "+" + item[key];
                  return (
                    <Item
                      onClick={this.goBack(value)}
                      key={index}
                      extra={<span style={{ paddingRight: 17 }}>{value}</span>}
                    >
                      {key}
                    </Item>
                  );
                })}
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}
