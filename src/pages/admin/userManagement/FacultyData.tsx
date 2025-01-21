import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TFaculty, TQueryParams } from "../../../types";
import { useGetAllFacultyDataQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TFaculty, "fullName" | "id" | "email">;

const FacultyData = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: facultyData, isFetching } = useGetAllFacultyDataQuery([
    { name: "page", value: page },
    { name: "sort", value: "-createdAt" }, // there is sort by createdAt field
    ...params,
  ]);

  const metaData = facultyData?.meta;
  const tableData = facultyData?.data?.map(({ _id, fullName, id, email }) => ({
    key: _id,
    fullName,
    id,
    email,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Faculty Id",
      key: "id",
      dataIndex: "id",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Action",
      key: "action",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Button type="primary">Update</Button>
            <Button type="primary">Details</Button>
            <Button
              style={{ backgroundColor: "red", color: "white", border: "none" }}
            >
              Block
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) => {
        queryParams.push({
          name: "name",
          value: item,
        });
      });
      filters.year?.forEach((item) => {
        queryParams.push({
          name: "year",
          value: item,
        });
      });
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table<TTableData>
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default FacultyData;
