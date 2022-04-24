const inquirer = require('inquirer');
const {addDepartment} = require('./lib/department')

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
                            addDepartment(dept_name);
                            return true;
                        }
                        else {
                            console.log('Department name is required.');
                            return false
                        }
                    }


                }
            ])


    }
}


askQuestions()