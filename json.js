var persist = require('node-persist');

var student_string = '{"name" : "Nguyen Van Cuong", "age" : "26"}';
 
var student_obj = JSON.parse(student_string);


persist.initSync();
persist.setItemSync('student', student_string);

var content_from_file = persist.getItemSync('student');

console.log(content_from_file);

console.log("__OBJECT__");
console.log("Name: " + student_obj.name);
console.log("Age: " + student_obj.age);

console.log("__STRING__");
console.log(JSON.stringify(student_obj));