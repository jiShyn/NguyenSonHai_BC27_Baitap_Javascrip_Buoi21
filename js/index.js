var staffs = [];

init();

//hàm này tự động chạy khi load trình duyệt. Lấy dữ liệu ở localStorage lên hiển thị
function init() {
   staffs = JSON.parse(localStorage.getItem("staffs")) || [];
   // console.log(staffs);

   for (var i = 0; i < staffs.length; i++) {
      staffs[i] = new Staff(
         staffs[i].account,
         staffs[i].fullName,
         staffs[i].email,
         staffs[i].password,
         staffs[i].date,
         staffs[i].salary,
         staffs[i].position,
         staffs[i].workingHours
      );
   }

   display(staffs);
}

//hàm này gắn ở nút Thêm người dùng trong modal
function addStaff() {
   var account = document.getElementById("tknv").value;
   var fullName = document.getElementById("name").value;
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var date = document.getElementById("datepicker").value;
   var salary = +document.getElementById("luongCB").value;
   var position = document.getElementById("chucvu").value;
   var workingHours = +document.getElementById("gioLam").value;

   var isValid = validation();
   if (!isValid) {
      return;
   }

   var staff = new Staff(
      account,
      fullName,
      email,
      password,
      date,
      salary,
      position,
      workingHours
   );

   staffs.push(staff);

   localStorage.setItem("staffs", JSON.stringify(staffs));

   display(staffs);

   reset();
}

//hàm này gắn ở nút Cập nhật trong modal
function update() {
   var accountCurrent = document.getElementById("tknv").value;
   var index = findStaff(accountCurrent);

   var isValid = validation();
   if (!isValid) {
      return;
   }

   staffs[index].fullName = document.getElementById("name").value;
   staffs[index].email = document.getElementById("email").value;
   staffs[index].password = document.getElementById("password").value;
   staffs[index].date = document.getElementById("datepicker").value;
   staffs[index].salary = document.getElementById("luongCB").value;
   staffs[index].position = document.getElementById("chucvu").value;
   staffs[index].workingHours = document.getElementById("gioLam").value;

   localStorage.setItem("staffs", JSON.stringify(staffs));

   display(staffs);

   reset();
}

//hàm này gắn ở nút search
function findRankStaff() {
   var newStaffs = [];
   var searchNameEl = document.getElementById("searchName").value;
   for (var i = 0; i < staffs.length; i++) {
      if (staffs[i].getRank().toLowerCase() === searchNameEl.toLowerCase()) {
         newStaffs.push(staffs[i]);
      }
   }

   display(newStaffs);
}

//hàm này gắn ở nút Cập nhật ở table
function reopenModal(accountStaff) {
   var account = document.getElementById("tknv");
   var fullName = document.getElementById("name");
   var email = document.getElementById("email");
   var password = document.getElementById("password");
   var date = document.getElementById("datepicker");
   var salary = document.getElementById("luongCB");
   var position = document.getElementById("chucvu");
   var workingHours = document.getElementById("gioLam");

   // document.getElementById('btnCapNhat').disabled = false

   var index = findStaff(accountStaff);

   account.value = staffs[index].account;
   fullName.value = staffs[index].fullName;
   email.value = staffs[index].email;
   password.value = staffs[index].password;
   date.value = staffs[index].date;
   salary.value = staffs[index].salary;
   position.value = staffs[index].position;
   workingHours.value = staffs[index].workingHours;

   account.disabled = true;
   document.getElementById("btnThemNV").disabled = true;
}

//hàm này gắn ở nút Xóa ỏ table
function deleteStaff(accountStaff) {
   var index = findStaff(accountStaff);
   if (index !== -1) {
      staffs.splice(index, 1);
   }

   localStorage.setItem("staffs", JSON.stringify(staffs));

   display(staffs);
}

//hàm hiển thị ra giao diện
function display(staffs) {
   var tableEl = document.getElementById("tableDanhSach");
   var html = "";
   for (var i = 0; i < staffs.length; i++) {
      var staff = staffs[i];
      html += `
	 <tr>
		 <td>${staff.account}</td>
		 <td>${staff.fullName}</td>
		 <td>${staff.email}</td>
		 <td>${staff.date}</td>
		 <td>${staff.position}</td>
		 <td>${staff.getTotalSalary()}</td>
		 <td>${staff.getRank()}</td>
		 <td class="d-flex flex-wrap justify-content-center align-items-center">
				 <button class="btn btn-secondary" onclick ="reopenModal('${
                staff.account
             }')" data-toggle="modal"
							data-target="#myModal">Cập nhật</button>
				 <button class="btn btn-danger" onclick="deleteStaff('${
                staff.account
             }')">Xóa</button>
		 </td>
	 </tr>`;
   }
   tableEl.innerHTML = html;
}

//hàm tìm nhân viên: nhận input là account và return index của staff bên trong staffs
function findStaff(accountStaff) {
   var index = -1;
   for (var i = 0; i < staffs.length; i++) {
      if (staffs[i].account === accountStaff) {
         index = i;
         return index;
      }
   }
}

//hàm reset form
function reset() {
   document.getElementById("tknv").value = "";
   document.getElementById("name").value = "";
   document.getElementById("email").value = "";
   document.getElementById("password").value = "";
   document.getElementById("datepicker").value = "";
   document.getElementById("luongCB").value = "";
   document.getElementById("chucvu").value = "";
   document.getElementById("gioLam").value = "";

   document.getElementById("tknv").disabled = false;
   document.getElementById("btnThemNV").disabled = false;
}

//validation
//hàm kiểm tra dữ liệu input có trống hay không
function isRequired(value) {
   if (!value) {
      return false;
   }
   return true;
}

//hàm kiểm tra độ dài kí tự của input
function suitableLength(value, minLength, maxLength) {
   if (value.length < minLength || value.length > maxLength) {
      return false;
   }
   return true;
}

//hàm kiểm tra hợp lệ từng ô input
function validation() {
   var account = document.getElementById("tknv").value;
   var fullName = document.getElementById("name").value;
   var email = document.getElementById("email").value;
   var password = document.getElementById("password").value;
   var date = document.getElementById("datepicker").value;
   var salary = document.getElementById("luongCB").value;
   var position = document.getElementById("chucvu").value;
   var workingHours = document.getElementById("gioLam").value;

   document.getElementById("tbTKNV").style.display = "block";
   document.getElementById("tbTen").style.display = "block";
   document.getElementById("tbEmail").style.display = "block";
   document.getElementById("tbMatKhau").style.display = "block";
   document.getElementById("tbNgay").style.display = "block";
   document.getElementById("tbLuongCB").style.display = "block";
   document.getElementById("tbChucVu").style.display = "block";
   document.getElementById("tbGiolam").style.display = "block";

   var isValid = true;

   if (!isRequired(account)) {
      isValid = false;
      document.getElementById(
         "tbTKNV"
      ).innerHTML = `Tên tài khoản không được để trống`;
   } else if (!suitableLength(account, 4, 6)) {
      isValid = false;
      document.getElementById(
         "tbTKNV"
      ).innerHTML = `Tên tài khoản phải từ 4 - 6 kí tự`;
   } else {
      document.getElementById("tbTKNV").innerHTML = "";
   }

   var lettersFullName = new RegExp(
      "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
   );
   // var lettersFullName = /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u
   if (!isRequired(fullName)) {
      isValid = false;
      document.getElementById(
         "tbTen"
      ).innerHTML = `Họ và tên không được để trống`;
   } else if (!lettersFullName.test(fullName)) {
      isValid = false;
      document.getElementById(
         "tbTen"
      ).innerHTML = `Họ và tên chỉ được nhập chữ không dấu`;
   } else {
      document.getElementById("tbTen").innerHTML = "";
   }

   var lettersEmail = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
   if (!isRequired(email)) {
      isValid = false;
      document.getElementById(
         "tbEmail"
      ).innerHTML = `Email không được để trống`;
   } else if (!lettersEmail.test(email)) {
      isValid = false;
      document.getElementById(
         "tbEmail"
      ).innerHTML = `Email không đúng định dạng`;
   } else {
      document.getElementById("tbEmail").innerHTML = "";
   }

   var lettersPassword = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,10}$"
   );
   if (!isRequired(password)) {
      isValid = false;
      document.getElementById(
         "tbMatKhau"
      ).innerHTML = `Mật khẩu không được để trống`;
   } else if (!suitableLength(password, 6, 10)) {
      isValid = false;
      document.getElementById(
         "tbMatKhau"
      ).innerHTML = `Mật khẩu phải từ 6 - 10 kí tự`;
   } else if (!lettersPassword.test(password)) {
      isValid = false;
      document.getElementById(
         "tbMatKhau"
      ).innerHTML = `Mật khẩu bao gồm 6 - 10 kí tự, phải chứa ít nhất 1 kí tự số, 1 kí tự chữ in hoa, 1 kí tự đặc biệt `;
   } else {
      document.getElementById("tbMatKhau").innerHTML = "";
   }

   var lettersDate = new RegExp(
      "^([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0-9]{4}|[0-9]{2})$"
   );
   if (!isRequired(date)) {
      isValid = false;
      document.getElementById(
         "tbNgay"
      ).innerHTML = `Vui lòng chọn ngày vào làm.`;
   } else if (!lettersDate.test(date)) {
      isValid = false;
      document.getElementById("tbNgay").innerHTML =
         "Vui lòng nhập đúng định dạng (mm/dd/yyyy)";
   } else {
      document.getElementById("tbNgay").innerHTML = "";
   }

   if (!isRequired(salary)) {
      isValid = false;
      document.getElementById(
         "tbLuongCB"
      ).innerHTML = `Lương cơ bản không được để trống`;
   } else if (+salary < 1000000 || +salary > 20000000) {
      isValid = false;
      document.getElementById(
         "tbLuongCB"
      ).innerHTML = `Vui lòng nhập lương cơ bản thích hợp (1 000 000 - 20 000 000)`;
   } else {
      document.getElementById("tbLuongCB").innerHTML = "";
   }

   if (!isRequired(position) || position === "Chọn chức vụ") {
      isValid = false;
      document.getElementById(
         "tbChucVu"
      ).innerHTML = `Vui lòng chọn chức vụ thích hợp.`;
   } else {
      document.getElementById("tbChucVu").innerHTML = "";
   }

   if (!isRequired(workingHours)) {
      isValid = false;
      document.getElementById(
         "tbGiolam"
      ).innerHTML = `Giờ làm không được để trống`;
   } else if (+workingHours < 80 || +workingHours > 200) {
      isValid = false;
      document.getElementById(
         "tbGiolam"
      ).innerHTML = `Vui lòng nhập giờ làm thích hợp (80 - 200 giờ)`;
   } else {
      document.getElementById("tbGiolam").innerHTML = "";
   }
   return isValid;
}
