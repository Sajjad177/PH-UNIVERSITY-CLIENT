import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logOut } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const handelLogout = () => {
    dispatch(logOut());
    toast.success("Logout successful", { duration: 2000 });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handelLogout} type="primary">
            Logout
          </Button>
        </Header>
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
      </Layout>
    </Layout>
  );
};

export default MainLayout;
