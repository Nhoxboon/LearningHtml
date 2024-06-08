import React, { useState } from 'react';


function AddEmployeeModal(props) {
    const validatePhoneNumber = (phone) => /^0\d{9}$/.test(phone);

    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, address, phone } = newEmployee;
        if (!name || !email || !address || !validatePhoneNumber(phone)) {
            alert("Vui lòng kiểm tra lại thông tin. Số điện thoại phải có độ dài 10 ký tự và bắt đầu bằng số 0.");
            return;
        }
        props.addEmployee(newEmployee);
        setNewEmployee({
            name: '',
            email: '',
            address: '',
            phone: ''
        });
        document.getElementById('addEmployeeModal').classList.remove('show'); // Loại bỏ lớp 'show' để đóng modal
        document.getElementById('addEmployeeModal').setAttribute('aria-hidden', 'true'); // Đặt thuộc tính aria-hidden thành 'true' để đóng modal
    };

    return (
        <div className="modal fade" id="addEmployeeModal" tabIndex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addEmployeeModalLabel">Thêm Nhân Viên</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="addEmployeeForm" onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="employeeName" className="form-label">Họ và Tên</label>
                                <input type="text" className="form-control" id="employeeName" name="name" value={newEmployee.name} onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeEmail" className="form-label">Thư điện tử</label>
                                <input type="email" className="form-control" id="employeeEmail" name="email" value={newEmployee.email} onChange={handleInputChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeAddress" className="form-label">Địa chỉ</label>
                                <textarea className="form-control" id="employeeAddress" name="address" value={newEmployee.address} onChange={handleInputChange} required rows="2"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeePhone" className="form-label">Số điện thoại</label>
                                <input type="text" className="form-control" id="employeePhone" name="phone" value={newEmployee.phone} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="modal-footer bg-secondary">
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn" data-bs-dismiss="modal">Hủy</button>
                                <button type="submit" className="btn btn-primary">Thêm</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployeeModal;
