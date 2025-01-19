import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester } from "./academicManagementType";

export interface TStudent {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
}

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  isDeleted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
  _id: string;
}

// export interface AdmissionSemester {
//   _id: string;
//   name: string;
//   code: string;
//   year: string;
//   startMonth: string;
//   endMonth: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// export interface AcademicDepartment {
//   _id: string;
//   name: string;
//   academicFaculty: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// export interface AcademicFaculty {
//   _id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }
