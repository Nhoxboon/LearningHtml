// Validate phone number
function validatePhoneNumber(phone) {
    return /^0\d{9}$/.test(phone);
}

// Get employees from localStorage or fallback to JSON file
function getEmployees(callback) {
    const employees = JSON.parse(localStorage.getItem('employees'));
    if (employees) {
        callback(employees);
    } else {
        $.getJSON('/assets/json/data.json', data => {
            localStorage.setItem('employees', JSON.stringify(data));
            callback(data);
        }).fail(() => console.error('Request failed'));
    }
}

// Save employees to localStorage
function saveEmployees(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

// Render employee table
function renderEmployeeTable(data) {
    const employeeTable = $('#employeeTable').empty();
    data.forEach((employee, index) => {
        employeeTable.append(`
            <div class="row border-top py-3 m-2" data-index="${index}">
                <div class="col"><input type="checkbox"></div>
                <div class="col">${employee.name}</div>
                <div class="col">${employee.email}</div>
                <div class="col">${employee.address}</div>
                <div class="col">${employee.phone}</div>
                <div class="col ml-0">
                    <button class="btn text-primary btn-lg btn-edit" type="button"><i class="bi bi-pencil"></i></button>
                    <button class="btn text-danger btn-lg btn-delete" type="button"><i class="bi bi-trash-fill"></i></button>
                </div>
            </div>
        `);
    });

    $('.btn-edit').click(handleEdit);
    $('.btn-delete').click(handleDelete);
}

// Handle form submission
$('#addEmployeeForm').submit(function(event) {
    event.preventDefault();
    
    const name = $('#employeeName').val().trim();
    const email = $('#employeeEmail').val().trim();
    const address = $('#employeeAddress').val().trim();
    const phone = $('#employeePhone').val().trim();

    if (!name || !email || !address || !validatePhoneNumber(phone)) {
        alert('Vui lòng kiểm tra lại thông tin. Số điện thoại phải có độ dài 10 ký tự và bắt đầu bằng số 0.');
        return;
    }

    const newEmployee = { name, email, address, phone };
    const editIndex = $('#addEmployeeModal').data('editIndex');

    getEmployees(data => {
        if (editIndex !== undefined) {
            data[editIndex] = newEmployee;
            $('#addEmployeeModal').removeData('editIndex');
        } else {
            data.push(newEmployee);
        }
        saveEmployees(data);
        renderEmployeeTable(data);
    });

    $('#addEmployeeModal').modal('hide');
    $('#addEmployeeForm')[0].reset();
});

// Handle edit button click
function handleEdit() {
    const index = $(this).closest('.row').data('index');
    getEmployees(data => {
        const employee = data[index];
        $('#employeeName').val(employee.name);
        $('#employeeEmail').val(employee.email);
        $('#employeeAddress').val(employee.address);
        $('#employeePhone').val(employee.phone);
        $('#addEmployeeModal').modal('show').data('editIndex', index);
    });
}

// Handle delete button click
function handleDelete() {
    const index = $(this).closest('.row').data('index');
    getEmployees(data => {
        data.splice(index, 1);
        saveEmployees(data);
        renderEmployeeTable(data);
    });
}

// Initial load of employee data
$(document).ready(() => {
    getEmployees(renderEmployeeTable);
});
