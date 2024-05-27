// Event listener for form submission
document.getElementById("formSinhVien").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn việc gửi form mặc định

    // Lấy dữ liệu từ form
    let maSinhVien = document.getElementById("maSV").value;
    let tenSinhVien = document.getElementById("hoTen").value;
    let ngaySinh = document.getElementById("ngaySinh").value;
    let lop = document.getElementById("lop").value;

    // Kiểm tra dữ liệu
    if (!maSinhVien || !tenSinhVien || !ngaySinh || !lop) {
        alert("Vui lòng nhập đầy đủ thông tin sinh viên");
        return;
    }

    // Lấy danh sách sinh viên từ localStorage
    let danhSachSinhVien = JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];

    // Kiểm tra nút có đang ở chế độ cập nhật hay không
    if (document.getElementById("btnThem").innerText === "Cập nhật") {
        // Tìm vị trí của sinh viên đang được chỉnh sửa
        let index = danhSachSinhVien.findIndex((sv) => sv.maSinhVien === maSinhVien);
        if (index !== -1) {
            // Cập nhật thông tin sinh viên
            danhSachSinhVien[index] = {
                maSinhVien: maSinhVien,
                tenSinhVien: tenSinhVien,
                ngaySinh: ngaySinh,
                lop: lop,
            };
        }
        document.getElementById("btnThem").innerText = "Thêm";
    } 
    else {
        // Thêm sinh viên mới vào danh sách
        let sinhVien = {
            maSinhVien: maSinhVien,
            tenSinhVien: tenSinhVien,
            ngaySinh: ngaySinh,
            lop: lop,
        };
        danhSachSinhVien.push(sinhVien);
    }

    // Lưu danh sách sinh viên vào localStorage
    localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSinhVien));

    // Hiển thị sinh viên vừa thêm hoặc cập nhật trong bảng
    hienThiDanhSachSinhVien();

    // Đặt lại form
    document.getElementById("formSinhVien").reset();
});

// Hàm hiển thị danh sách sinh viên từ localStorage khi trang được tải
function hienThiDanhSachSinhVien() {
    // Lấy danh sách sinh viên từ localStorage
    let danhSachSinhVien = JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];

    // Hiển thị danh sách sinh viên trong bảng
    let tbody = document.getElementById("tbodySinhVien");
    tbody.innerHTML = "";
    danhSachSinhVien.forEach(function (sinhVien, index) {
        tbody.innerHTML += `
            <tr>
                <td>${sinhVien.tenSinhVien}</td>
                <td>${sinhVien.maSinhVien}</td>
                <td>${sinhVien.ngaySinh}</td>
                <td>${sinhVien.lop}</td>
                <td>
                    <button class="btn btn-primary" onclick="suaSinhVien(${index})">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien(${index})">Xoá</button>
                </td>
            </tr>
        `;
    });
}

// Hàm chỉnh sửa thông tin sinh viên
function suaSinhVien(index) {
    let danhSachSinhVien = JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];
    let sinhVien = danhSachSinhVien[index];

    // Hiển thị thông tin sinh viên cần chỉnh sửa trong form
    document.getElementById("maSV").value = sinhVien.maSinhVien;
    document.getElementById("hoTen").value = sinhVien.tenSinhVien;
    document.getElementById("ngaySinh").value = sinhVien.ngaySinh;
    document.getElementById("lop").value = sinhVien.lop;

    document.getElementById("btnThem").innerText = "Cập nhật";
}

// Hàm xoá sinh viên
function xoaSinhVien(index) {
    let danhSachSinhVien = JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];
    danhSachSinhVien.splice(index, 1);

    // Lưu danh sách sinh viên đã cập nhật vào localStorage
    localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSinhVien));

    // Cập nhật bảng sau khi xoá
    hienThiDanhSachSinhVien();
}

// Gọi hàm hiển thị danh sách sinh viên khi trang được tải
hienThiDanhSachSinhVien();
