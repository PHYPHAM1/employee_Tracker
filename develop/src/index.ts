// import express from 'express';
import { QueryResult } from 'pg';       //interface to annotate from our pg
import { pool, connectToDb } from './connection.js';    //connection to our connection.js
import inquirer from 'inquirer';
await connectToDb();            //wait for this to connect first

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());            //for out post/put/delete req ...

// class Employees {
//     fistName: string;
//     lastName: string;
//     roleId: number;
//     managerID: number;

//     constructor(firstName: string, lastName: string, roleId: number, managerID: number) {
//         this.fistName = firstName;
//         this.lastName = lastName;
//         this.roleId = roleId;
//         this.managerID = managerID;
//     }
// }

//QUERY DATABASE, View all departments
function viewAllDepartment() {
pool.query('SELECT * FROM department;', (err: Error, result: QueryResult) => {
    if(err){
        console.log(err);
    } else if (result) {
        console.table(result.rows);
        startCli();
    }

});
}
//fucntion to view All roles
function viewAllRoles() {
    pool.query('SELECT * FROM roles;', (err: Error, result: QueryResult) => {
        if(err){
            console.log(err);
        } else if (result) {
            console.table(result.rows);
            startCli();
        }
    });
}

//fucntion to view All employee
function viewAllEmployee() {
pool.query('SELECT * FROM employee;', (err: Error, result: QueryResult) => {
    if(err){
        console.log(err);
    } else if (result) {
        console.table(result.rows);
        startCli();
    }
});
}

//function to add department
// function viewAllRoles() {
//     pool.query('SELECT * FROM roles;', (err: Error, result: QueryResult) => {
//         if(err){
//             console.log(err);
//         } else if (result) {
//             console.table(result.rows);
//         }
//     });
// }
// //fucntion to view Employees
// function viewAllEmployee(){
//     pool.query('SELECT * FROM employee;', (err: Error, result: QueryResult) => {
//         if(err){
//             console.log(err);
//         } else if (result) {
//             console.table(result.rows);
//         }
//     });
// }
//function add department
function addDepartment(){
    inquirer
    .prompt([       //need to prompt the user what dep they want to add after they selected it
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What department would you like to add?',
        }
    ])
    .then((answers) => {        //once user input in the "answers" you pass it into ($1) and [answers.addDepart]
        pool.query(`INSERT INTO department (department_name) VALUES ($1);`, [answers.addDepartment],(err: Error, result: QueryResult) => {
            if(err){
                console.log(err);
            } else if (result) {
                console.table(`Department added ${result.rows}`);
                startCli();
            }
        });
        
    })
}


//function add Role
function addRole(){
    inquirer
    .prompt([       //need to prompt the user what Roles they want to add after they selected it
        {
            type: 'input',
            name: 'title',
            message: 'What title is this Role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary?',
        },
        {
            type: 'input',
            name: 'roleToDepartment',
            message: 'Which department ID?',
            
        }
    ])
    .then((answers) => {        //once user input in the "answers" you pass it into ($1) and [answers.addDepart]
        pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ($1,$2,$3);`, [answers.title, answers.salary, answers.roleToDepartment],(err: Error, result: QueryResult) => {
            if(err){
                console.log(err);
            } else if (result) {
                console.table(`Role added ${result.rows}`);
                startCli();     //continue with the questions from the beginning
            }
        });
        
    })
}

// //fucntion add employee
function addEmployee(){
    inquirer
    .prompt([       //need to prompt the user what employee they want to add after they selected it
        {
            type: 'input',
            name: 'addFirstName',
            message: 'Enter first name:',
        },
        {
            type: 'input',
            name: 'addLastName',
            message: 'Enter last name:',
        },
        {
            type: 'input',
            name: 'addRole',
            message: 'What is the Role id?',
        },
        {
            type: 'input',
            name: 'addManagerId',
            message: 'What is your Manager Id?',
        },

    ])
    .then((answers) => {        //once user input in the "answers" you pass it into ($1) and [answers.addDepart]
        pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4);`, [answers.addFirstName, answers.addLastName, answers.addRole, answers.addManagerId],(err: Error, result: QueryResult) => {
            if(err){
                console.log(err);
            } else if (result) {
                console.table(`Employee added ${result.rows}`);
                startCli();
            }
        });
        
    })

}




// const Askquestions = ({todos,add_department,add_role })

//inquirer for question
function startCli(): void {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'todos',
                message: 'Would you like to do?',
                choices: ['View All Department', 'View All Roles', 'View All Employees','Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            }

        ])
        .then((answers) => {
            if(answers.todos === 'View All Department') {
                viewAllDepartment();
            } else if (answers.todos === 'View All Roles') {
                viewAllRoles();
            } else if (answers.todos === 'View All Employees'){
                viewAllEmployee();
            } else if (answers.todos === 'Add a department') {
                addDepartment();
            } else if (answers.todos === 'Add a role') {
                addRole();
            } else if (answers.todos === 'Add an employee') {
                addEmployee();
            } 
        });
}

startCli();
    

    
