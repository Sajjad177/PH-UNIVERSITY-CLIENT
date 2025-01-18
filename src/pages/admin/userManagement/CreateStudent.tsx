import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../Components/form/PHForm";
import PHInput from "../../../Components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHDatePicker from "../../../Components/form/PHDatePicker";
import PHSelect from "../../../Components/form/PHSelect";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicDepartmentManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
  password: "student123",
  student: {
    name: {
      firstName: "I am ",
      middleName: "Student",
      lastName: "Number 1",
    },
    gender: "male",
    dateOfBirth: "1990-01-01",
    bloodGroup: "A+",

    email: "student3@gmail.com",
    contactNo: "1235678",
    emergencyContactNo: "987-654-3210",
    presentAddress: "123 Main St, Cityville",
    permanentAddress: "456 Oak St, Townsville",

    guardian: {
      fatherName: "James Doe",
      fatherOccupation: "Engineer",
      fatherContactNo: "111-222-3333",
      motherName: "Mary Doe",
      motherOccupation: "Teacher",
      motherContactNo: "444-555-6666",
    },

    localGuardian: {
      name: "Alice Johnson",
      occupation: "Doctor",
      contactNo: "777-888-9999",
      address: "789 Pine St, Villageton",
    },

    admissionSemester: "65bb60ebf71fdd1add63b1c0",
    academicDepartment: "65b4acae3dc8d4f3ad83e416",
    academicFaculty: "676d9ac44c0c117ddeed04fe",
  },
};
// only for devlopment and remove it
const studentDefaultValue = {
  name: {
    firstName: "Front",
    middleName: "End",
    lastName: "Data",
  },
  gender: "male",
  bloodGroup: "A+",

  email: "studentff3@gmail.com",
  contactNo: "12645735678",
  emergencyContactNo: "987-65764-3210",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "111-22672-3333",
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "444-55675-6666",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "777-88678-9999",
    address: "789 Pine St, Villageton",
  },
};

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();

  const { data: semesterData } = useGetAllSemestersQuery(undefined);
  const semesterOptions = semesterData?.data?.map(({ _id, name, year }) => ({
    value: _id,
    label: `${name} ${year}`,
  }));

  const { data: departmentData } = useGetAllAcademicDepartmentsQuery(undefined);
  const depatmentDataOptions = departmentData?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImage);
    addStudent(formData);
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValue}>
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
          </Row>
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
            Gardian
          </Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="fatherName" label="Father Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="fatherContactNo"
                label="Father Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="motherName" label="Mother Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="motherContactNo"
                label="Mother Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="motherOccupation"
                label="Mother Occupation"
              />
            </Col>
          </Row>
          <Divider style={{ marginTop: 0, fontSize: "1.5rem" }}>
            Local Gardian
          </Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name" label="name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="ContactNo" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="occupation" label="Occupation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="address" label="address" />
            </Col>
          </Row>
          <Divider style={{ marginTop: 0, fontSize: "1.5rem" }}>
            Academic Information
          </Divider>
          <Row gutter={16}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                label="Admission Semester"
                options={semesterOptions as { value: string; label: string }[]}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Admission Department"
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

export default CreateStudent;
