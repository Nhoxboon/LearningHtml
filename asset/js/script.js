$(document).ready(function() {
    // Đọc dữ liệu từ data.json và hiển thị danh sách lớp vào dropdown
    $.getJSON("/asset/json/data.json", function(data) {
      var lop = $("#lop");
      lop.append('<option value="">Chọn lớp</option>');
      $.each(data, function(index, value) {
        lop.append('<option value="' + index + '">' + value.tenLop + '</option>');
      });
    });

    // Xử lý sự kiện khi chọn lớp từ dropdown
    $("#lop").change(function() {
      var lopIndex = $(this).val();
      if (lopIndex === "") {
        $("#sinhvien tbody").empty();
        return;
      }

      // Đọc dữ liệu sinh viên từ data.json và hiển thị danh sách sinh viên
      $.getJSON("/asset/json/data.json", function(data) {
        var sinhvien = $("#sinhvien tbody");
        sinhvien.empty();
        var selectedClass = data[lopIndex];
        $.each(selectedClass.sinhVien, function(index, student) {
          sinhvien.append('<tr><td class="border px-4 py-2">' + student.maSV + '</td><td class="border px-4 py-2">' + student.hoTen + '</td><td class="border px-4 py-2">' + student.ngaySinh + '</td><td class="border px-4 py-2"><button class="btn btn-primary btn-sm">Sửa</button> <button class="btn btn-danger btn-sm">Xóa</button></td></tr>');
        });
      });
    });

    // Các hàm xử lý sự kiện thêm, sửa, xóa sinh viên
    $("#sinhvien").on("click", ".btn-primary", function() {
      var tr = $(this).closest("tr");
      var masv = tr.find("td:eq(0)").text();
      var hoten = tr.find("td:eq(1)").text();
      var ngaysinh = tr.find("td:eq(2)").text();
      $("#masv").val(masv);
      $("#hoten").val(hoten);
      $("#ngaysinh").val(ngaysinh);
    });
  });