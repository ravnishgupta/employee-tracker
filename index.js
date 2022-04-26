const inquirer = require('inquirer');
const {addDepartment, getAllDepartments} = require('./lib/department')
const {getAllRoles, addRole} = require('./lib/role')
const {getAllEmployees,getAllManagers} = require('./lib/employee');
const db = require('./db/connection')
const cTable = require('console.table')


//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const askQuestions = () => {
    return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'choice',
            message: 'What would you like to do?',
            choices: getAllFunctions()
        }
    ])
    .then (selection => consumeSelection(selection));
}

const getAllFunctions = () => {
    const funcArray = ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'];
    return funcArray;
}

const consumeSelection = (selection) => {
    switch (selection.choice.toUpperCase()) {
        case "ADD A DEPARTMENT":
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'dept_name',
                    message: 'What is the department name? (Required)',
                    validate: dept_name => {
                        if (dept_name) {
                            return true;
                        }
                        else {
                            console.log('Department name is required.');
                            return false;
                        }
                    }
                }
            ])
            .then(data =>   { 
                                var ret = ''
                                addDepartment(data.dept_name, function(result){
                                    ret = result;
                                    if (result) {
                                        console.log(`${data.dept_name} successfully added`)
                                        askQuestions()
                                    }
                                    else console.log('fail')
                                })      
                            }            
                )
            break;
            case "VIEW ALL DEPARTMENTS":
                let ret = ''
                getAllDepartments(function(result){
                    ret = result;
                    console.log(cTable.getTable(ret));
                    askQuestions();
                })
               break;
            case "VIEW ALL ROLES":
                let roles = ''
                getAllRoles(function(result){
                    roles = result;
                    console.log(cTable.getTable(roles));
                    askQuestions();
                })
               break;
            case "VIEW ALL EMPLOYEES":
                let emp = ''
                getAllEmployees(function(result){
                    emp = result;
                    console.log(cTable.getTable(emp));
                    askQuestions();
                })
            break;
            case "ADD A ROLE":
                let dept = ''
                let deptArray = [];
                getAllDepartments(function(result){
                    dept = result
                    dept.forEach((department) => {deptArray.push(department.DEPARTMENT_NAME);});
                })
                inquirer.prompt([
                {
                    type: 'input',
                    name: 'roleTitle',
                    message: 'What is the name of the role? (Required)',
                    validate: role => {
                        if (role) {
                            return true;
                        }
                        else {
                            console.log('Role name is required.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary of the role? (Required)',
                    validate: salary => {
                        if (salary) {
                            return true;
                        }
                        else {
                            console.log('Salary is required.');
                            return false;
                        }
                    }
                },
                {
                    type: 'rawlist',
                    name: 'roleDept',
                    message: 'What Department does this role belong to?',
                    choices: deptArray
                }

                ])
                .then (data => { 
                    let departmentId;

                    dept.forEach((department) => {
                        if (department.DEPARTMENT_NAME === data.roleDept) {departmentId = department.DEPARTMENT_ID;}
                    });

                    let rtn;
                    addRole(data.roleTitle, data.salary, departmentId, function(result){
                        rtn = result;
                        if (result) {
                            console.log(`${data.roleTitle.toUpperCase()} successfully added`)
                            askQuestions()
                        }
                        else console.log('fail')
                    })            
                })
            break;
            case "ADD AN EMPLOYEE":
                let mgrArray = [];
                let mgr =''
                getAllManagers(function(result){
                    mgr = result
                    mgr.forEach((manager) => mgrArray.push(`${manager.first_name} ${manager.last_name}`));
                })
                
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: "What is the employee's first name? (Required)",
                        validate: firstName => {
                            if (firstName) {
                                return true;
                            }
                            else {
                                console.log('First name is required.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: "What is the employee's last name? (Required)",
                        validate: lastName => {
                            if (lastName) {
                                return true;
                            }
                            else {
                                console.log('Last name is required.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'confirm',
                        name: 'hasManager',
                        message: "Does this employee have a manager? (Required)"
                    }
                ])
                .then((data) => {
                    
                    if (data.hasManager) {
                        inquirer.prompt([
                            {
                                type: 'rawlist',
                                name: 'empMgr',
                                message: 'Please select a Manager.',
                                choices: mgrArray
                            }
                        ])
                        .then (data =>  {
                                            let mgrID;
                                            mgr.forEach((manager) => {
                                            if ((manager.first_name === data.empMgr.split(' ')[0]) && ((manager.last_name === data.empMgr.split(' ')[1]))) {
                                                mgrID = manager.id;
                                            }
                                        })
                        });
                        
                    }
                    else {
                        
                    }
                })
                break;


    }
}
askQuestions()