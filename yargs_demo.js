var yargs = require('yargs');
var storage = require('node-persist');

storage.initSync({
	dir : "students",
	ttl : false
});


// // console.log(argv);	

// function check_snt(n){
// 	var flg = true;

// 	if(n < 2){
// 		flg = false;
// 	}
// 	else if( n == 2){
// 		flg = true;
// 	}
// 	else if( n % 2 == 0){
// 		flg = false;
// 	}
// 	else{
// 		for (var i = 3; i < n-1; i+=2){
// 			if (n % i == 0){
// 				flg = false;
// 				break;
// 			}
// 		}
// 	}

// 	return flg;
// }
// var argv = yargs.argv;
// if(typeof argv.n == "undefined"){
// 	console.log("Chua nhap n");
// }
// else{
// 	if(check_snt(argv.n)){
// 		console.log("La so nguyen to");
// 	}
// 	else{
// 		console.log("khong la so nguyen to");
// 	}
// }

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

	students.forEach(function(student){
		if(student.id === studentId){
			console.log('Student: ' + student.fullname + ' (' + student.id + ') ');
		}
	});

	
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
		storage.setItemSync('students', students);
		return true;
	}
	else {
		return false;
	}
	
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

var argv = yargs.command('list', 'Get list student', 
	function(yargs){

	}).command('create', 'create a student', 
	function(yargs){
		return yargs.options({
			id : {
				demand : true,
				type : "number"
			},
			fullname : {
				demand : true,
				type : "string"
			}
		});
	}).command('delete', 'delete a student',
	function(yargs){
		return yargs.options({
			id : {
				demand : true,
				type : "number"
			}
		});
	}).command('edit', 'Edit a student',
	function(yargs){
		return yargs.options({
			id : {
				demand : true,
				type : "number"
			},
			fullname : {
				demand : true,
				type : "string"
			}
		});
	}).command('get', 'get info a student',
	function(yargs){
		return yargs.options({
			id : {
				demand : true,
				type : "number"
			}
		});
	}).argv;

var action = argv._[0];

if (action === 'list'){
	showStudent();
}
else if (action === 'create'){
	var bool = addStudent(argv.id, argv.fullname);
	if(bool === true){
		console.log("add successfully");	
	}
	else {
		console.log("exists");	
	}
	showStudent();
}
else if(action === 'delete'){
	removeStudent(argv.id);
	console.log("removed");
	showStudent();
}
else if(action === 'edit'){
	editStuent(argv.id, argv.fullname);
	console.log("edit successfully");
	showStudent();
}
else if(action === 'get'){
	getStudent(argv.id);
}
else{
	console.log("command not found");
	showStudent();
}