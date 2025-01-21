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
import { Link } from "react-router-dom";

export type TTableData = Pick<TStudent, "fullName" | "id" | "email">;

const StudentData = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParams[]>([]);
  const { data: studentData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "-createdAt" }, // there is sort by createdAt field
    ...params,
  ]);


  console.log(studentData);

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(({ _id, fullName, id, email }) => ({
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
      title: "Student Id",
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
            <Link to={`/admin/student-data/${item.key}`}>
              <Button type="primary">Details</Button>
            </Link>
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
