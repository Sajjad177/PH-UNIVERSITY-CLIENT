import { Button, Flex } from "antd";
import PHForm from "../../../Components/form/PHForm";
import PHInput from "../../../Components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicFacultyManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

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
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="name" label="Name" />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </Flex>
  );
};

export default CreateAcademicFaculty;
