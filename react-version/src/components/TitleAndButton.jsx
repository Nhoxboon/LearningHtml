import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import AddEmployeeModal from './AddEmployeeModal';
import { useState, useEffect } from 'react';

function TitleAndButton() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const storedEmployees = localStorage.getItem('employees');
        if (storedEmployees) {
          // Load from local storage
          setEmployees(JSON.parse(storedEmployees));
        } else {
          // Load from JSON file if local storage is empty
          fetch('./data.json')
            .then(response => response.json())
            .then(data => setEmployees(data));
        }
      }, []);
    
      const addEmployee = (employee) => {
        setEmployees([...employees, employee]);
        // Update local storage after adding a new employee
        localStorage.setItem('employees', JSON.stringify([...employees, employee]));
      };

      const deleteEmployee = (index) => {
        const newEmployees = employees.filter((employee, i) => i !== index);
        setEmployees(newEmployees);
        // Update local storage after deleting an employee
        localStorage.setItem('employees', JSON.stringify(newEmployees));
        };

    return (
        <>
            <div className="linear-gradient" style={{background: "linear-gradient(0,#ffffff,gray)", height: "2rem"}}></div>
            <div className="container-header">
                <div className="d-flex justify-content-between p-3 mb-2 bg-primary text-white">
                    <h3>Quản lý Nhân viên</h3>
                    <div className="btn-option">
                        <button className="btn btn-danger m-2" type="button"><i className="bi bi-dash-circle me-2"></i>Xóa</button>
                        <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#addEmployeeModal"><i className="bi bi-plus-square-fill me-2"></i>Thêm nhân viên</button>
                    </div>
                </div>
            </div>

            <div className="row border-top border-bottom py-3 m-2">
                <div className="col">
                    <input type="checkbox" id="main-checkbox" />
                </div>
                <div className="col">
                    <label>Họ và Tên</label>
                </div>
                <div className="col">
                    <label>Thư điện tử</label>
                </div>
                <div className="col">
                    <label>Địa chỉ</label>
                </div>
                <div className="col">
                    <label>Số điện thoại</label>
                </div>
                <div className="col">
                    <label>Hành động</label>
                </div>
            </div>

            <div id="employeeList">
                {employees.map((employee, index) => (
                    <div key={index} className="row py-2 m-2 border-bottom">
                        <div className="col">
                            <input type="checkbox"/>
                        </div>
                        <div className="col">
                            {employee.name}
                        </div>
                        <div className="col">
                            {employee.email}
                        </div>
                        <div className="col">
                            {employee.address}
                        </div>
                        <div className="col">
                            {employee.phone}
                        </div>
                        <div className="col ml-0">
                            <button className="btn text-primary btn-lg btn-edit" type="button"><i className="bi bi-pencil"></i></button>
                            <button className="btn text-danger btn-lg btn-delete" onClick={() => deleteEmployee(index)} type="button"><i className="bi bi-trash-fill"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pop up */}
            <AddEmployeeModal addEmployee={addEmployee}/>
        </>
    );
}

export default TitleAndButton;
