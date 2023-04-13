import { LaptopOutlined, UserOutlined } from "@ant-design/icons";

const menus = [
  {
    key: "",
    icon: <UserOutlined />,
    label: "Home",
  },
  {
    key: "banner",
    icon:<UserOutlined/>,
    label: "Banner",
  },
  {
    key: "about",
    icon: <LaptopOutlined />,
    label: "About",
    children: [
      {
        key: "about/inner",
        icon: <LaptopOutlined />,
        label: "About",
      },
    ],
  },
];

export default menus;
