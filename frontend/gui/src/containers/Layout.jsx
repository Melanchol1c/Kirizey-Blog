import React from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import "./Layout.scss";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/">Kirizey Blog</Link>
            </Menu.Item>

            {this.props.isAuthenticated ? (
              <Menu.Item key="3" className="login_tab">
                <Link to="/" onClick={this.props.logout}>
                  Выйти
                </Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="3" className="login_tab">
                <Link to="/login/">Войти</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: "80vh" }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by{" "}
          <a href="https://github.com/Melanchol1c"> Melanchol1c</a>
        </Footer>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(connect(mapDispatchToProps)(CustomLayout));
