import { Button, Popconfirm, Table, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ContainerAll } from "modules"
import { useState } from "react"
import MenuModal from './components/form'
import { Tabs } from "components"
import { useLocation, useNavigate } from "react-router-dom"
import qs from 'qs'
import { useSelector } from "react-redux"
import { usePost } from "crud";
import { get } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment/moment";


const index = () => {
  const [menuModal, setMenuModal] = useState({
    item: null,
    isOpen:false,
  })
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {mutate} = usePost()
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const currentLangCode = useSelector(
    (state) => state.system.currentLangCode
  );
  return (
    <>
      <div className="flex items-center justify-between mb-10">
        <Tabs/>
        <Button type="primary" onClick={()=>setMenuModal({item:null, isOpen:true})}>
          ADD
        </Button>
      </div>
      <ContainerAll
       url={'/menu'}
       queryKey={['menus']}
       params={{extra:{_l:'uz'}}}
      >
        {
          ({items})=>{
            console.log(items);
            return (
              <Table
                dataSource={items}
                rowKey={"id"}
                columns={[
                  {
                    title: "ID",
                    key: "id",
                    dataIndex: "id",
                  },
                  {
                    title: "Title",
                    key: "title",
                    dataIndex: "title",
                    render:(value, {id})=>{
                      return (
                        <p className="cursor-pointer m-0" onClick={()=>navigate({
                          pathname:`/menu-items/${id}`,
                        })}>{value}</p>
                      )
                    }
                  },
                  {
                    title: "Alias",
                    key: "alias",
                    dataIndex: "alias",
                  },
                  {
                    title: "Created",
                    key: "created_at",
                    dataIndex: "created_at",
                    render:(value)=>{
                      return(
                        moment(value).format('DD.MM.YYYY, HH:mm:ss')
                      )
                    }
                  },
                  {
                    title: "Action",
                    render: (_, row) => {
                      return (
                        <div className="flex gap-5">
                          <Tooltip title="Delete">
                            <Popconfirm
                              placement="topRight"
                              description={"Delete"}
                              onConfirm={() => {
                                mutate({
                                  url: `/menu/${get(row, "id")}`,
                                  method: "delete",
                                  params: {
                                    extra: {
                                      _l: get(params, "lang", currentLangCode),
                                    },
                                  },
                                  onSuccess: () => {
                                    queryClient.invalidateQueries({
                                      queryKey: ["menus"],
                                    });
                                    notification.success({
                                      message: "Deleted",
                                    });
                                  },
                                });
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <DeleteOutlined className="text-red-500 cursor-pointer text-lg" />
                            </Popconfirm>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <EditOutlined
                              className="text-blue-500 cursor-pointer text-lg"
                              onClick={() =>
                                setMenuModal({ isOpen: true, item: row })
                              }
                            />
                          </Tooltip>
                        </div>
                      );
                    },
                  },
                ]}
              />
            );
          }
        }
      </ContainerAll>
      <MenuModal {...{menuModal, setMenuModal}}/>
    </>
  )
}

export default index