import AddStudentModal from "./AddStudentModal";
import { useState, useEffect } from "react";
import "./css/TitleAndButton.css"

function TitleAndButton() {


    const getStatusAngle = (status) => {
            switch (status) {
              case "Thôi học":
                return { "backgroundColor": "red" };
              case "Vắng":
                return { "backgroundColor": "yellow" };
              case "Đang hoạt động":
                return { "backgroundColor": "green" };
              default:
                return { "backgroundColor": "green" };
            }
          };

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const storeStudents = localStorage.getItem('students');
        if(storeStudents){
            setStudents(JSON.parse(storeStudents));
        }
        else{
            fetch('./data.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('students', JSON.stringify(data));
                setStudents(data);
            })
            .catch(err => console.error(err));
        }
    }, []);

    function addStudent(student){
        setStudents(students => [...students, student]);

        localStorage.setItem('students', JSON.stringify([...students, student]));
    }

    function deleteStudent(index){
        setStudents(students.filter((_, i) => i !== index));
    
        localStorage.setItem('students', JSON.stringify(students.filter((_, i) => i !== index)));
    }
    
    
    

  return (
    <>
        <div className="linear-gradient" style={{background: "linear-gradient(0,#ffffff,gray)", height: "2rem",}}></div>
            <div className="container-header">
                <div className="d-flex justify-content-between p-3 mb-2 bg-primary text-white">
                    <h3 className="mb-0">Quản lý Học viên</h3>
                    <div className="btn-option">
                        <button className="btn btn-light" type="button"><i className="bi bi-file-earmark-fill"></i>Nhập dữ liệu</button>
                        <button className="btn btn-secondary mx-1" type="button"><i className="bi bi-file-earmark-fill"></i>Xuất dữ liệu</button>
                        <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#addStudentModal"><i className="bi bi-plus-square-fill me-2"></i>Thêm học viên</button>
                    </div>
                </div>
            </div>

            <div className="row border-top border-bottom py-3 m-2">
                <div className="col">
                    <label htmlFor="">STT</label>
                </div>
                <div className="col">
                    <label htmlFor="">Họ và Tên</label>
                </div>
                <div className="col">
                    <label htmlFor="">Năm sinh</label>
                </div>
                <div className="col">
                    <label htmlFor="">Chức vụ</label>
                </div>
                <div className="col">
                    <label htmlFor="">Tình trạng</label>
                </div>
                <div className="col">
                    <label htmlFor="">Hành động</label>
                </div>
            </div>

            <div id="studentTable">
                {students.map((student, index) => (
                    <div className="row border-top py-3 m-2" key={index}>
                        <div className="col">{student.id}</div>
                        <div className="col">{student.name}</div>
                        <div className="col">{student.birthday}</div>
                        <div className="col">{student.position}</div>
                        <div className="col">
                            <div className="status-circle" style={getStatusAngle(student.status)}></div>{student.status}
                        </div>
                        <div className="col ml-0">
                            <button className="btn text-primary btn-lg btn-edit" type="button"><i className="bi bi-pencil"></i></button>
                            <button className="btn text-danger btn-lg btn-delete" onClick={() => deleteStudent(index)} type="button"><i className="bi bi-trash-fill"></i></button>
                        </div>
                 </div>
                ))}
            </div>

            <AddStudentModal students={students} addStudent={addStudent}/>
    </>
  );
}

export default TitleAndButton;