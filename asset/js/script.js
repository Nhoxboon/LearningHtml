$(document).ready(function() {
    // Đọc dữ liệu từ data.json và hiển thị danh sách lớp vào dropdown
    $.getJSON("data.json", function(data) {
        var lop = $("#lop");
        lop.append('<option value="">Chọn lớp</option>');
        $.each(data, function(key, value) {
            lop.append('<option value="' + key + '">' + value.tenlop + '</option>');
        });
    });

    // Xử lý sự kiện khi chọn lớp từ dropdown
    $("#lop").change(function() {
        var lop = $(this).val();
        if (lop == "") {
            $("#sinhvien").empty();
            return;
        }

        // Đọc dữ liệu sinh viên từ data.json và hiển thị danh sách sinh viên
        $.getJSON("data.json", function(data) {
            var sinhvien = $("#sinhvien");
            sinhvien.empty();
            sinhvien.append('<tr><th>Mã SV</th><th>Họ tên</th><th>Điểm</th><th></th></tr>');
            $.each(data[lop].sinhvien, function(key, value) {
                sinhvien.append('<tr><td>' + key + '</td><td>' + value.hoten + '</td><td>' + value.diem + '</td><td><button class="btn btn-primary btn-sm">Sửa</button> <button class="btn btn-danger btn-sm">Xóa</button></td></tr>');
            });
        });
    });

    // Các hàm xử lý sự kiện thêm, sửa, xóa sinh viên
    $("#sinhvien").on("click", ".btn-primary", function() {
        var tr = $(this).closest("tr");
        var masv = tr.find("td:eq(0)").text();
        var hoten = tr.find("td:eq(1)").text();
        var diem = tr.find("td:eq(2)").text();
        $("#masv").val(masv);
        $("#hoten").val(hoten);
        $("#diem").val(diem);
    });
});