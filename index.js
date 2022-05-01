const inquirer = require('inquirer');
const {addDepartment, getAllDepartments} = require('./lib/department')
const {getAllRoles, addRole} = require('./lib/role')
const {getAllEmployees,getAllManagers,addEmployee, updateEmployeeRole} = require('./lib/employee');
const db = require('./db/connection')
const cTable = require('console.table');


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

const consumeSelection = async (selection) => {
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
                let roles = [];
                const rolesData = await getAllRoles();
                rolesData[0].forEach(role => roles.push(role))
                console.log(cTable.getTable(roles));
                askQuestions();
               break;
            case "VIEW ALL EMPLOYEES":
                let emp = [];
                const emplData = await getAllEmployees();
                emplData[0].forEach(employee => emp.push(employee))
                console.log(cTable.getTable(emp));
                askQuestions();
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
                
                let mgr = '';
                let mgrID = null;
                let roleID = ''
                
        
                getAllManagers(function(result){
                    mgr = result
                    mgr.forEach((manager) => mgrArray.push(`${manager.first_name} ${manager.last_name}`));
                })
                
                let rolesArray = [];
                const rolesRec = await getAllRoles();
                rolesRec[0].forEach(role => rolesArray.push(role.JOB_TITLE))
                
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
                        type: 'rawlist',
                        name: 'empRole',
                        message: 'Please select a Role.',
                        choices: rolesArray
                    },
                    {
                        type: 'confirm',
                        name: 'hasManager',
                        message: "Does this employee have a manager? (Required)"
                    }
                ])
                .then((data) => {
                    rolesRec[0].forEach((role) => {
                        if (role.JOB_TITLE == data.empRole)  {(roleID = role.ROLE_ID)}
                    })

                    if (data.hasManager) {
                        inquirer.prompt([
                            {
                                type: 'rawlist',
                                name: 'empMgr',
                                message: 'Please select a Manager.',
                                choices: mgrArray
                            }
                        ])
                        .then   (mgrData =>  {
                                            mgr.forEach((manager) => {
                                                if ((manager.first_name === mgrData.empMgr.split(' ')[0]) && ((manager.last_name === mgrData.empMgr.split(' ')[1]))) {
                                                    mgrID = manager.id;
                                                }
                                            })
                                            addEmployee(data.firstName, data.lastName, roleID, mgrID, function(result) {
                                                rtn = result;
                                                if (result) {
                                                    console.log(`${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()} successfully added`)
                                                    askQuestions()
                                                }
                                                else console.log('fail')
                                            })
                                    })
                                            
                    }
                    else {
                        addEmployee(data.firstName, data.lastName, roleID, mgrID, function(result) {
                            rtn = result;
                            if (result) {
                                console.log(`${data.firstName.toUpperCase()} ${data.lastName.toUpperCase()} successfully added`)
                                askQuestions()
                            }
                            else console.log('fail')
                        })
                    }
                    
                    
                })
                break;
                case "UPDATE AN EMPLOYEE ROLE":       
                    const data = await getAllRoles();
                    const jobTitle = data[0].map(role => role.JOB_TITLE)

                    const empData = await getAllEmployees();
                    const employeeNamesArray = empData[0].map(employee => `${employee.FIRST_NAME} ${employee.LAST_NAME}`)
                   
                     inquirer.prompt([
                        {
                            type: 'rawlist',
                            name: 'employeeSelected',
                            message: 'Please select an Employee.',
                            choices: employeeNamesArray
                        },
                        {
                            type: 'rawlist',
                            name: 'empRole',
                            message: 'Please select a Role that you want to switch to.',
                            choices: jobTitle
                        }
                     ])
                     .then( selectedData => {
                                let empID = ''
                                let roleID = ''
                                empData[0].forEach((employee) => {
                                    if ((employee.FIRST_NAME === selectedData.employeeSelected.split(' ')[0]) && (employee.LAST_NAME === selectedData.employeeSelected.split(' ')[1])) {empID = employee.EMPLOYEE_ID;}
                                })
                                
                                data[0].forEach((role) => {
                                    if (role.JOB_TITLE === selectedData.empRole) {roleID = role.ROLE_ID;}
                                })
                                try{
                                    const updateRole = updateEmployeeRole(empID,roleID)
                                    console.log(`${selectedData.employeeSelected}'s role has been sucessfully changed to ${selectedData.empRole}`)
                                    askQuestions()
                                }
                                catch (err) {
                                    console.log(err)
                                }
                                
                            })
                break;
                case "QUIT":
                    console.log("Goodbye!")
                    db.end()
                break;
    }
}
askQuestions()