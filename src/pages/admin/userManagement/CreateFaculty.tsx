import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../Components/form/PHForm";
import PHInput from "../../../Components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHDatePicker from "../../../Components/form/PHDatePicker";
import PHSelect from "../../../Components/form/PHSelect";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicDepartmentManagement.api";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/academicFacultyManagement.api";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

// only for devlopment and remove it
const facultyDefaultValue = {
  name: {
    firstName: "Demo2",
    middleName: "Al",
    lastName: "Kader",
  },
  designation: "Professor",
  gender: "male",
  email: "Demo2@example.com",
  contactNo: "+1280",
  emergencyContactNo: "+0985",
  bloodGroup: "B+",
  presentAddress: "123 University Avenue, Cityville, Country",
  permanentAddress: "456 Home Street, Townsville, Country",
  isDeleted: false,
};

const CreateFaculty = () => {
  const [addFaculty] = useAddFacultyMutation();
  const { data: facultyData } = useGetAllFacultyQuery(undefined);
  const semesterOptions = facultyData?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  const { data: departmentData } = useGetAllAcademicDepartmentsQuery(undefined);
  const depatmentDataOptions = departmentData?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Faculty...", );
    try {
      const facultyData = {
        password: "111111111111111",
        faculty: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(facultyData));
      formData.append("file", data.profileImage);
      await addFaculty(formData);
      toast.success("Faculty added successfully", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValue}>
          <Divider style={{ marginTop: 0, fontSize: "1.5rem" }}>
            Personal Information
          </Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="bloodGroup" label="Blood Group" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImage"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
          </Row>
          {/* contract information */}
          <Divider style={{ marginTop: 0, fontSize: "1.5rem" }}>
            Contract Information
          </Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>
          <Divider style={{ marginTop: 0, fontSize: "1.5rem" }}>
            Academic Information
          </Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicFaculty"
                label="Admission Faculty"
                options={semesterOptions as { value: string; label: string }[]}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={depatmentDataOptions}
              />
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
