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
  inquirer.prompt([
    {
      name: "query",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Update employee roles",
        "Exit"
      ]
    }])
    .then(function (answer) {
      switch (answer.query) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Update employee roles":
          updateRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};
// view query for departments roles and employee tables, console.table response
function viewDepartments() {
  connection.query(`SELECT * FROM departments`, function (err, res) {
    if (err) throw err;
    console.table(res);
    userPrompt();
  })
};

function viewRoles() {
  connection.query(`SELECT * FROM role`, function (err, res) {
    if (err) throw err;
    console.table(res);
    userPrompt();
  })
};

function viewEmployees() {
  connection.query(`SELECT * FROM employee`, function (err, res) {
    if (err) throw err;
    console.table(res);
    userPrompt();
  })
};
function addDepartment() {
  inquirer.prompt([
    {
      name: "addDept",
      message: "What is the name of the new department?"
    }
  ]).then(function (answer) {
    connection.query(
      "INSERT INTO departments SET ?", {
      name: answer.addDept
    },
      function (err, res) {
        if (err) throw err;
        console.log(" Department Added!\n");
        userPrompt();
      }
    );
  });
}


function addRole() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
         
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?"
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary of this position?",
      },
      {
        name: "deptId",
        type: "list",
        message: "Select a department for this role",
        choices: res.map(item => item.name)
      }
    ]).then(function (answers) {
      const selectedDept = res.find(dept => dept.name === answers.deptId);
      connection.query("INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
          department_id: selectedDept.id
        },
        function (err, res) {
          if (err) throw err;
          console.log("New role added!\n");
          userPrompt();
        }
      );
    });
  })
};

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the new employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "roleId",
        type: "list",
        choices: results.map(item => item.title),
        message: "Select a role for the employee"
      }
    ]).then(function (answers) {
      const selectedRole = results.find(item => item.title === answers.roleId);
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: selectedRole.id
        }, function (err, res) {
          if (err) throw err;
          userPrompt();
        })
    })
  })
};

function updateRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        name: "selectEmp",
        message: "Select the employee who is changing roles",
        choices: res.map(emp => emp.first_name)
      }
    ]).then(function (answer) {
      const selectedEmp = res.find(emp => emp.first_name === answer.selectEmp);
      connection.query("SELECT * FROM role", function (err, res) {
        inquirer.prompt([
          {
            type: "list",
            name: "newRole",
            message: "Select the new role for this employee",
            choices: res.map(item => item.title)
          }
        ]).then(function (answer) {
          const selectedRole = res.find(role => role.title === answer.newRole);

          connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [selectedRole.id, selectedEmp.id],
            function (error) {
              if (error) throw err;
              userPrompt();
            }
          );
        })
      })
    })
  })
};