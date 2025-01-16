import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagementType";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } = useGetAllFacultyQuery(undefined);
  console.log(facultyData);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div>
            <Button type="primary">Edit</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("onChange", _pagination, filters, _sorter, extra);
    // filter query condition added later in there
  };

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicFaculty;
