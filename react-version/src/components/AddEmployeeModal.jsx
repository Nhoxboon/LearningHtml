import React, {useState} from 'react';
import 'bootstrap/js/dist/modal';

function AddEmployeeModal(props) {

    function validatePhoneNumber(phone) {
        return /^0\d{9}$/.test(phone);
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!name || !email || !address || !validatePhoneNumber(phone)) {
            alert("Vui lòng kiểm tra lại thông tin. Số điện thoại phải có độ dài 10 ký tự và bắt đầu bằng số 0.");
            return;
        }
        const newEmployee = { name, email, address, phone };
        props.addEmployee(newEmployee);
        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
    };
    document.getElementById('addEmployeeModal').classList.remove('show'); // Loại bỏ lớp 'show' để đóng modal
    document.getElementById('addEmployeeModal').setAttribute('aria-hidden', 'true'); // Đặt thuộc tính aria-hidden thành 'true' để đóng modal
    

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
                                <input type="text" className="form-control" id="employeeName" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeEmail" className="form-label">Thư điện tử</label>
                                <input type="email" className="form-control" id="employeeEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeeAddress" className="form-label">Địa chỉ</label>
                                <textarea className="form-control" id="employeeAddress" value={address} onChange={(e) => setAddress(e.target.value)} required rows="2"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="employeePhone" className="form-label">Số điện thoại</label>
                                <input type="text" className="form-control" id="employeePhone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
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
