const Sequelize = require('sequelize');
const inquirer = require("inquirer");

const sequelize = new Sequelize('icecream_db', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

var Icecream;

sequelize
    .authenticate()
    .then(() => {
        Icecream = sequelize.define('icecream', {
            Name: Sequelize.STRING,
            Flavor: Sequelize.STRING,
            Color: Sequelize.STRING,
            Nuggets: Sequelize.BOOLEAN,
            Score: Sequelize.INTEGER
        });
        Icecream.sync({force: true}).then(() => {
        console.error('\n');
        make();
    })
    .catch(err => {
        console.error('\n');
        console.error('Unable to connect to the database:', err);
        console.error('\n');
    })
});


function make() {
    inquirer
        .prompt([
          {
            type: "list",
            message: "Do You Have A Favorite Ice Cream?",
            choices: ["Yes", "No"],
            name: "question"
          }
        ])
        .then(function(response) {
            if (response.question === "Yes") {
            inquirer.prompt([
              {
                type: "input",
                message: "What Is Your Favorite Ice Cream?",
                name: "kind"
              },
              {
                type: "input",
                message: "What's the Flavor of the Ice Cream?",
                name: "flavor"
              },
              {
                type: "input",
                message: "What's the Color of the Ice Cream?",
                name: "color"
              },
              {
                type: "confirm",
                message: "Does Your Ice Cream Have Nuggets?",
                name: "nuggets"
              },
              {
                type: "input",
                message: "What Would You Rate This Ice Cream Out of 10?",
                name: "score"
              }
            ]).then(function(data) {
                console.log("\nYour Favorite Ice Cream Is: " + data.kind);
                console.log("\nThe Flavor of the Ice Cream Is: " + data.flavor);
                console.log("\nThe Color of the Ice Cream Is: " + data.color);
                console.log("\nThe Nuggets in the Ice Cream Is: " + data.nuggets);
                console.log("\nYou Rated Your Favorite Ice Cream: " + data.score);
                console.log('\n');
                Icecream.create({
                    Name: data.kind,
                    Flavor: data.flavor,
                    Color: data.color,
                    Nuggets: data.nuggets,
                    Score: data.score
                }).then(function() {
                    console.log('\n');
                    make();
                })
            })
          }
          else {
            console.log("\nThat's okay, come again when you are more sure.\n");
          }
        });
}