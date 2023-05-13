import { Button, Popconfirm, Popover, Switch, Tooltip, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get, truncate } from 'lodash';
import { useDelete, usePost} from 'crud';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerAll } from 'modules';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { Table, Tabs } from 'components';
import { useQueryClient } from '@tanstack/react-query';
import { systemSelectors } from 'store/system';

const index = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()
    const currentLangCode = useSelector(systemSelectors.selectLanguage);
    const params = qs.parse(location.search, {ignoreQueryPrefix:true})
    const { mutate: deleteHandler } = useDelete();
    const { mutate: statusHandler } = usePost();

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <Tabs/>
        <Button type="primary" onClick={() => navigate("/page/create")}>
          ADD
        </Button>
      </div>
      <ContainerAll
        queryKey={["pages"]}
        url={"/pages"}
        params={{
          limit: 2,
          sort:'id',
          page: get(params, "page", 1),
          extra: {
            _l: get(params, "lang", currentLangCode),
          },
        }}
        // onSuccess={(data)=>console.log(data)}
        // onError={(error)=>console.log(error)}
      >
        {({ items, isLoading, isFetching, meta }) => {
          return (
            <Table
              meta={meta}
              hasDelete={true}
              hasUpdate={true}
              hasStatus={true}
              hasPagination={false}
              customPagination={true}
              updateAction={(row) =>navigate(`/page/update/${get(row, "id")}`)}
              deleteAction={(row) => {
                              deleteHandler({
                                url: `/pages/${get(row, "id")}`,
                                params: {
                                  extra: {
                                    _l: get(params, "lang", currentLangCode),
                                  },
                                },
                                onSuccess: () => {
                                  queryClient.invalidateQueries(["pages"]);
                                  notification.success({
                                    message: "Deleted",
                                  });
                                },
                              });
                            }}
              statusAction={(e, row) => {
                          statusHandler({
                            url: `/pages/updateStatus/${row?.id}`,
                            method: "put",
                            params: {
                              extra: {
                                _l: get(params, "lang", currentLangCode),
                              },
                            },
                            values: e ? { status: 1 } : { status: 0 },
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["pages"],
                              });
                              notification.success({
                                message: "Changed",
                              });
                            },
                          });
                        }}
              isLoading={isLoading}
              items={items}
              columns={[
                {
                  title: "ID",
                  dataIndex: "id",
                  className: "w-[20px]",
                },
                {
                  title: "Title",
                  dataIndex: "title",
                },
                {
                  title: "Slug",
                  dataIndex: "slug",
                  render: (value) => {
                    return value?.length > 50 ? (
                      <Popover title={value}>
                        {truncate(value, { length: 50, omission: "..." })}
                      </Popover>
                    ) : (
                      value
                    );
                  },
                },
                {
                  title: "Description",
                  dataIndex: "description",
                  render: (value) => {
                    return value.length > 50 ? (
                      <Popover title={value}>
                        {truncate(value, { length: 50, omission: "..." })}
                      </Popover>
                    ) : (
                      value
                    );
                  },
                },
              ]}
            />
          );
        }}
      </ContainerAll>
    </div>
  );
}

export default index