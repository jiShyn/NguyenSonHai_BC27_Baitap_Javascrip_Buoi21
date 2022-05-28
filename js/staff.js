function Staff(
   account,
   fullName,
   email,
   password,
   date,
   salary,
   position,
   workingHours
) {
   this.account = account;
   this.fullName = fullName;
   this.email = email;
   this.password = password;
   this.date = date;
   this.salary = salary;
   this.position = position;
   this.workingHours = workingHours;
}

Staff.prototype.getTotalSalary = function () {
   if (this.position === "Sếp") {
      return this.salary * 3;
   }
   if (this.position === "Trưởng phòng") {
      return this.salary * 2;
   }
   if (this.position === "Nhân viên") {
      return this.salary * 1;
   }

   return "Vui lòng chọn chức vụ";
};

Staff.prototype.getRank = function () {
   if (this.workingHours >= 192) {
      return "Xuất sắc";
   }

   if (this.workingHours >= 176) {
      return "Giỏi";
   }

   if (this.workingHours >= 160) {
      return "Khá";
   }

   if (this.workingHours < 160) {
      return "Trung Bình";
   }
};
