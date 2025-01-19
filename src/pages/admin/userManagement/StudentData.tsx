import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParams, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<TStudent, "fullName" | "id">;

const StudentData = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 2 },
    { name: "page", value: page },
    { name: "sort", value: "-createdAt" }, // there is sort by createdAt field
    ...params,
  ]);

  const metaData = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Student Id",
      key: "id",
      dataIndex: "id",
      showSorterTooltip: { target: "full-header" },
    },

    {
      title: "Action",
      key: "action",
      render: () => {
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

export default StudentData;
