import { useParams } from "react-router-dom";

const StudentDetails = () => {
    const {studentId} = useParams();

    return (
        <div>
            student details {studentId}
        </div>
    );
};

export default StudentDetails;