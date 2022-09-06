// steps: set up schema/ tables, create seeds, establish connection to mysql database. Create inquirer application that takes in user input and allows view departments employees and roles.  Add departments, employees, and roles.  Update employee roles.
var mysql = require("mysql2");
var inquirer = require("inquirer");





var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db"
});
console.log("hello")
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId + "\n");
  userPrompt()
});
function userPrompt(){
    // inquirer questions here
}
// put all query functions here