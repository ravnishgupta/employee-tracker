const inquirer = require('inquirer');
const {addDepartment, getAllDepartments} = require('./lib/department')
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
    console.log(selection.choice)
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
                var ret = ''
                getAllDepartments(function(result){
                    ret = result;
                    const table = cTable.getTable(ret);
                    console.log(table)
                    askQuestions();
                })
               break;
        // case "ADD A ROLE":
        //     inquirer.prompt([
        //         {
        //             type: 'input',
        //             name: 'role',
        //             message: 'What is the name of the role? (Required)',
        //             validate: role => {
        //                 if (role) {
        //                     return true;
        //                 }
        //                 else {
        //                     console.log('Role name is required.');
        //                     return false;
        //                 }
        //             }
        //         },
        //         {
        //             type: 'input',
        //             name: 'salary',
        //             message: 'What is the salary of the role? (Required)',
        //             validate: salary => {
        //                 if (salary) {
        //                     return true;
        //                 }
        //                 else {
        //                     console.log('Salary is required.');
        //                     return false;
        //                 }
        //             }
        //         }//,
        //         // {
        //         //     type: 'rawlist',
        //         //     name: 'choice',
        //         //     message: 'What department does this role belong to?',
        //         //     choices: returnAllDepartments()
        //         // }

        //     ])
            // .then (data => {
            //     //addDepartment(data.dept_name);
            //     // if (addDepartment(data.dept_name)) {
            //          askQuestions()
            //     // }
            //     // 
            //     //console.log(data)
            // })


    }
}



askQuestions()