

// Get employees from localStorage or fallback to JSON file
function getStudent(callback) {
    const students = JSON.parse(localStorage.getItem('students'));
    if (students) {
        callback(students);
    } else {
        $.getJSON('/asset/json/data.json', data => {
            localStorage.setItem('students', JSON.stringify(data));
            callback(data);
        }).fail(() => console.error('Request failed'));
    }
}


function saveStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
}


function renderStudentTable(data) {
    const studentTable = $('#studentTable').empty();
    data.forEach((student, index) => {
        
        const statusAngle = getStatusAngle(student.status);
        const statusCircle = `<div class="status-circle" style="${statusAngle}"></div>`;

        studentTable.append(`
            <div class="row border-top py-3 m-2" data-index="${index}">
                <div class="col">${student.id}</div>
                <div class="col">${student.name}</div>
                <div class="col">${student.birthday}</div>
                <div class="col">${student.position}</div>
                <div class="col">
                    ${statusCircle} ${student.status}
                </div>
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
$('#addStudentForm').submit(function(event) {
    event.preventDefault();

    //id khi thêm vào sẽ bằng số id lớn nhất hiện có + 1
    const data = JSON.parse(localStorage.getItem('students'));
    let maxId = 0;
    data.forEach((student) => {
        if (student.id > maxId) {
            maxId = student.id;
        }
    });
    //parseInt để chuyển từ string sang number
    maxId = parseInt(maxId);
    let id = maxId + 1;
    const name = $('#studentName').val().trim();
    const birthday = $('#studentBirthday').val().trim();
    const position = $('#studentPosition').val().trim();
    const status = "Đang hoạt động";

    if (!name || !birthday || !position) {
        alert('Vui lòng kiểm tra lại thông tin.');
        return;
    }

    const newStudent = { id, name, birthday, position, status };
    const editIndex = $('#addStudentModal').data('editIndex');

    getStudent(data => {
        if (editIndex !== undefined) {
            data[editIndex] = newStudent;
            $('#addStudentModal').removeData('editIndex');
        } else {
            data.push(newStudent);
        }
        saveStudents(data);
        renderStudentTable(data);
    });

    $('#addStudentModal').modal('hide');
    $('#addStudentModal')[0].reset();
});

// Initial load of employee data
$(document).ready(() => {
    getStudent(renderStudentTable);
});

const getStatusAngle = (status) => {
    switch (status) {
      case "Thôi học":
        return "background-color: red;";
      case "Vắng":
        return "background-color: yellow;";
      case "Đang hoạt động":
        return "background-color: green;";
      default:
        return "background-color: green;";
    }
  };

// Handle edit button click
function handleEdit() {
    const index = $(this).closest('.row').data('index');
    getStudent(data => {
        const student = data[index];
        $('#studentName').val(student.name);
        $('#studentBirthday').val(student.birthday);
        $('#studentPosition').val(student.position);
        $('#addStudentModal').data('editIndex', index).modal('show');
    });
}

// Handle delete button click
function handleDelete() {
    const index = $(this).closest('.row').data('index');
    getStudent(data => {
        data.splice(index, 1);
        saveStudents(data);
        renderStudentTable(data);
    });
}