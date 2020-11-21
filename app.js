const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");



const render = require("./lib/htmlRenderer");

let employees = []



const addEmployee = () => {

  inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Employee role:',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: 'Employee name:'
    },
    {
      type: 'input',
      name: 'id',
      message: 'Employee ID:',
      validate: function (value) {
        var pass = value.match(
          /^[0-9]\d*$/
        );
        if (pass) {
          return true;
        }
        return 'Please enter a valid ID';
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'Employee email',
      validate: function (value) {
        var pass = value.match(
          /\S+@\S+\.\S+/
        );
        if (pass) {
          return true;
        }

        return 'Please enter a valid email address';
      }
    }
  ])
    .then(employee => {
      switch (employee.role) {
        case 'Manager':
          addManager(employee)
          break
        case 'Engineer':
          addEngineer(employee)
          break
        case 'Intern':
          addIntern(employee)
          break
      }
    })
    .catch(err => console.log(err))
}

const addManager = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Office number:'
    }
  ])
    .then(({ officeNumber }) => {
      employees.push(new Manager(name, id, email, officeNumber))
      next()
    })
    .catch(err => console.log(err))
}

const addEngineer = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'github',
      message: 'GitHub name:'
    }
  ])
    .then(({ github }) => {
      employees.push(new Engineer(name, id, email, github))
      next()
    })
    .catch(err => console.log(err))
}

const addIntern = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'school',
      message: 'School name:'
    }
  ])
    .then(({ school }) => {
      employees.push(new Intern(name, id, email, school))
      next()
    })
    .catch(err => console.log(err))
}

const next = () => {
  inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do now?',
    choices: ['Add another employee', 'Finish']
  })
    .then(({ choice }) => {
      switch (choice) {
        case 'Add another employee':
          addEmployee()
          break
        case 'Finish':
          fs.writeFile(path.join(__dirname, 'output', 'index.html'), render(employees), err => {
            if (err) { console.log(err) }
          })
          break
      }
    })
    .catch(err => console.log(err))
}

addEmployee()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
