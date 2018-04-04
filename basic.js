var storage = require('node-persist');

//--------------------------------------------------------//
// storage.initSync();

//then start using it
// storage.setItemSync('name','yourname');
// console.log(storage.getItemSync('name'));

/*//using async
storage.init().then(function(){
	storage.setItem('name','yourname').then(function(){
		return storage.getItem('name')
	}).then(function(value){
		console.log(value);
	})
});*/
//--------------------------------------------------------//
storage.initSync({
	dir : "students"
});

//get list student
function getAllStudents()
{
	var students = storage.getItemSync('students');

	if(typeof students === "undefined"){
		return [];
	}

	return students
}

//get detail student
function getStudent(studentId)
{
	var students = getAllStudents();

	var matchedStudent = null;

	for(var i=0; i<students.length; i++){
		if(students[i].id === studentId){
			matchedStudent = students[i];
			break;
		}
	}

	return matchedStudent
}

//add student
function addStudent(id, fullname)
{
	var students = getAllStudents();
	var flg      = 0; 
	for(var i=0; i<students.length; i++){
		if (students[i].id === id){
			flg = 1;
		}
	}
	if(flg == 0){
		students.push({
			id : id,
			fullname : fullname
		});
	}
	
	storage.setItemSync('students', students);
}

//remove Student
function removeStudent(studentId)
{
	var students = getAllStudents();

	for(var i=0; i<students.length; i++){
		if(students[i].id === studentId){
			students.splice(i, 1);
		}
	}

	storage.setItemSync('students', students);
}

//edit student
function editStuent(studentId, studentName)
{
    var students = getAllStudents();
 
    for (var i = 0; i < students.length; i++){
        if (students[i].id === studentId){
            students[i].fullname = studentName;
        }
    }
     
    storage.setItemSync('students', students);
}

//show student
function showStudent()
{
	var students = getAllStudents();
	students.forEach(function(student){
		console.log('Student: ' + student.fullname + ' (' + student.id + ') ');
	});
}


// Thêm sinh viên
addStudent(1, 'Cuong');
addStudent(2, 'Kinh');
addStudent(3, 'Chinh');
addStudent(4, 'Quyen');
 
// Hiển thị danh sách sinh viên
showStudent();