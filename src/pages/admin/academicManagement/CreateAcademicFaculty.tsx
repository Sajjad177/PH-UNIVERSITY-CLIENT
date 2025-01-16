import { Button, Flex } from "antd";
import PHForm from "../../../Components/form/PHForm";
import PHInput from "../../../Components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicFacultyManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicFacultySchema } from "../../../schemas/academicManagementSchema";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Academic Faculty...");

    try {
      const res = (await addAcademicFaculty(data)) as TResponse;

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
      <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
        <PHInput type="text" name="name" label="Name" />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </Flex>
  );
};

export default CreateAcademicFaculty;
