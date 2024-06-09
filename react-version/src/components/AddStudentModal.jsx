import React, { useState } from 'react';
import { Modal } from 'bootstrap';
import "./css/AddStudentModal.css";

function AddStudentModal(props) {
    const validateName = (name) => {
        return name.length <= 50;
    }

    const validateBirthday = (birthday) => {
        return /^\d{2}\/\d{2}\/\d{4}$/.test(birthday);
    }

    const [newStudent, setNewStudent] = useState({
        id: '',
        name: '',
        birthday: '',
        position: '',
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent({ ...newStudent, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, birthday, position } = newStudent;
        if (!validateName(name) || !validateBirthday(birthday) || !position) {
            if (!validateName(name)) {
                alert('Tên không được nhập quá 50 kí tự.');
                return;
            }
            else if (!validateBirthday(birthday)) {
                alert('Ngày sinh phải đúng định dạng dd/mm/yyyy.');
                return;
            }
            alert('Vui lòng kiểm tra lại thông tin.');
            return;
        }

        // Tìm id lớn nhất trong danh sách sinh viên hiện có
        const maxId = Math.max(1, ...props.students.map(student => student.id));

        // Tạo sinh viên mới với id lớn nhất + 1 và status là "Đang hoạt động"
        props.addStudent({...newStudent, id: maxId + 1, status: 'Đang hoạt động'
        });

        // Đóng modal sau khi thêm nhân viên
        const modalElement = document.getElementById('addStudentModal');
        const modalInstance = Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    };

    return (
        <div className="modal fade" id="addStudentModal" tabIndex="-1" aria-labelledby="addStudentModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h5 className="modal-title" id="addStudentModalLabel">Thêm học viên mới</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="addStudentForm" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="studentName" className="form-label">Họ và Tên</label>
                                <input type="text" className="form-control" id="studentName" name='name' value={newStudent.name} onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="studentBirthday" className="form-label">Năm sinh</label>
                                <input type="text" className="form-control" id="studentBirthday" name='birthday' value={newStudent.birthday} onChange={handleInputChange} placeholder="dd/mm/yyyy" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="studentPosition" className="form-label">Chức vụ</label>
                                <input type="text" className="form-control" id="studentPosition" name='position' value={newStudent.position} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="modal-footer bg-secondary">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-light deny" data-bs-dismiss="modal">Hủy</button>
                                <button type="submit" className="btn btn-primary add">Thêm</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddStudentModal;
