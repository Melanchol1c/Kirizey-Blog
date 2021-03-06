import React from "react";
import { Layout, Menu, Dropdown, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import "./Layout.scss";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/my_articles/">Список статей</Link>
        </Menu.Item>

        <Menu.Item>
          <Link to="/" onClick={this.props.logout}>
            Выйти
          </Link>
        </Menu.Item>
      </Menu>
    );

    const { isAuthenticated, children } = this.props;

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

            {isAuthenticated ? (
              <Menu.Item key="3" className="login_tab">
                <Dropdown overlay={menu}>
                  <div className="ant-dropdown-link">
                    {localStorage.user} <Icon type="down" />
                  </div>
                </Dropdown>
              </Menu.Item>
            ) : (
              <Menu.Item key="3" className="login_tab">
                <Link to="/login/">Войти</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              paddingBottom: 50,
              minHeight: "100vh"
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 - 2019 | Created by
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
