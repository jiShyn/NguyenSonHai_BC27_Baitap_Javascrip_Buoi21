var staffs = [];

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

   display(staffs);

   reset();
}

//hàm này gắn ở nút Cập nhật trong modal
function update() {
   var accountCurrent = document.getElementById("tknv").value;
   var index = findStaff(accountCurrent);

   staffs[index].fullName = document.getElementById("name").value;
   staffs[index].email = document.getElementById("email").value;
   staffs[index].password = document.getElementById("password").value;
   staffs[index].date = document.getElementById("datepicker").value;
   staffs[index].salary = document.getElementById("luongCB").value;
   staffs[index].position = document.getElementById("chucvu").value;
   staffs[index].workingHours = document.getElementById("gioLam").value;

   display(staffs);

   reset();
}

//hàm này gắn ở nút search
function findRankStaff() {
	var newStaffs = []
   var searchNameEl = document.getElementById("searchName").value;
   for (var i = 0; i < staffs.length; i++) {
      if (staffs[i].getRank().toLowerCase() === searchNameEl.toLowerCase()) {
				newStaffs.push(staffs[i])
      }
   }

	 display(newStaffs)
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
		 <td>
				 <button class="btn btn-secondary mb-3" onclick ="reopenModal('${
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
   var account = (document.getElementById("tknv").value = "");
   var fullName = (document.getElementById("name").value = "");
   var email = (document.getElementById("email").value = "");
   var password = (document.getElementById("password").value = "");
   var date = (document.getElementById("datepicker").value = "");
   var salary = (document.getElementById("luongCB").value = "");
   var position = (document.getElementById("chucvu").value = "");
   var workingHours = (document.getElementById("gioLam").value = "");

   account.disabled = false;
   document.getElementById("btnThemNV").disabled = false;
}
