import { Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";

const index = () => {
  return (
    <Layout className="h-screen overflow-y-hidden">
      <Sidebar />
      <Content />
    </Layout>
  );
};

export default index;
