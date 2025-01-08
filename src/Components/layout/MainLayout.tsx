import { Layout, Menu, MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { createElement } from "react";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "nav 1",
  },
  {
    key: "2",
    label: "nav 2",
  },
  {
    key: "3",
    label: "nav 3",
    children: [
      {
        key: "4",
        label: "nav 4",
      },
      {
        key: "5",
        label: "nav 5",
      },
    ],
  },
];

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{ height: "4rem", margin: "1rem", color: "#fff" }}>
          <h1>PH-University</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* outlet is add there */}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
