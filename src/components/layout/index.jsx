import { Layout } from "antd";
import Sidebar from "components/layout/sidebar";
import Content from "components/layout/content";
import { useLocation } from "react-router-dom";

const index = () => {
  const location = useLocation()
  const blackList = ['/create', '/update']
  return (
    <Layout
      // className={`h-${blackList.some((path) =>
      //   location.pathname.includes(path)
      // )?'full':'screen'}`}
      className='h-screen'
    >
      {blackList.some((path) => location.pathname.includes(path)) ? null : (
        <Sidebar />
      )}
      <Content />
    </Layout>
  );
};

export default index;
