import { Button, Flex } from "antd";
import PHForm from "../../../Components/form/PHForm";
import PHInput from "../../../Components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../Components/form/PHSelect";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyManagement.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagementSchema";
import { useAddAcademicManagementMutation } from "../../../redux/features/admin/academicDepartmentManagement.api";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const [addAcademicManagement] = useAddAcademicManagementMutation();

  const facultyDataList = facultyData?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  console.log(facultyDataList);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Department...");
    try {
      const res = (await addAcademicManagement(data)) as TResponse;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <PHForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicDepartmentSchema)}
      >
        <PHInput type="text" name="name" label="Name" />
        <PHSelect
          label={"Academic Faculty"}
          name={"academicFaculty"}
          options={facultyDataList as { value: string; label: string }[]}
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </Flex>
  );
};

export default CreateAcademicDepartment;
