import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicDepartmentManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagementType";

export type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
  const { data: academicDepartments, isFetching } =
    useGetAllAcademicDepartmentsQuery(undefined);

  const tableData = academicDepartments?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Faculty Name",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
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

export default AcademicDepartment;
