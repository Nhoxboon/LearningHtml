document.getElementById("formSinhVien").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy dữ liệu từ form
    let maSinhVien = document.getElementById("maSV").value;
    let tenSinhVien = document.getElementById("hoTen").value;
    let ngaySinh = document.getElementById("ngaySinh").value;
    let lop = document.getElementById("lop").value;

    // Validate dữ liệu
    if (!maSinhVien || !tenSinhVien || !ngaySinh || !lop) {
      alert("Vui lòng nhập đầy đủ thông tin sinh viên");
      return;
    }

    // Thêm sinh viên vào bảng và localStorage
    let sinhVien = {
      maSinhVien: maSinhVien,
      tenSinhVien: tenSinhVien,
      ngaySinh: ngaySinh,
      lop: lop,
    };

    // Lấy danh sách sinh viên từ localStorage
    let danhSachSinhVien =
      JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];

    // Thêm sinh viên vào danh sách
    danhSachSinhVien.push(sinhVien);

    // Lưu danh sách sinh viên vào localStorage
    localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSinhVien));

    // Hiển thị sinh viên vừa thêm vào bảng
    hienThiDanhSachSinhVien();

    // Reset form
    document.getElementById("formSinhVien").reset();
  });

// Hàm hiển thị danh sách sinh viên từ localStorage khi trang tải
function hienThiDanhSachSinhVien() {
  // Lấy danh sách sinh viên từ localStorage
  let danhSachSinhVien =
    JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];

  // Hiển thị danh sách sinh viên lên bảng
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
                    <button class="btn btn-danger" onclick="xoaSinhVien(${index})">Xoá</button>
                </td>
            </tr>
        `;
  });
}

// Hàm xóa sinh viên
function xoaSinhVien(index) {
  let danhSachSinhVien =
    JSON.parse(localStorage.getItem("danhSachSinhVien")) || [];
  danhSachSinhVien.splice(index, 1); // Xóa sinh viên theo index

  // Lưu lại danh sách sinh viên mới vào localStorage
  localStorage.setItem("danhSachSinhVien", JSON.stringify(danhSachSinhVien));

  // Cập nhật lại bảng sau khi xóa
  hienThiDanhSachSinhVien();
}

// Gọi hàm hiển thị danh sách khi trang tải
hienThiDanhSachSinhVien();
