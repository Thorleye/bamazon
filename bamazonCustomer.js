var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'MysqlPackers17',
        database: 'bamazon'
    }
)

connection.connect(function(err, res){
    if (err) throw err;
    console.log('Welcome!')
    }
)

function displayEverything(){
    connection.query(
    "SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (i=0; i < res.length; i++)
        console.log(
            "Item ID: " + res[i].item_id + " | ",
            "Product: " + res[i].product_name + " | ",
//            "Department: " + res[i].department_name + " | ",
            "Price: " + res[i].price + " | ",
//            "Stock: " + res[i].stock_quantity + " | ",
            "\n-------------------------------------------------------------------------------------------------"
        )
    })
   
};

function inquirerStart(){
    inquirer
    .prompt([
        {
            name: "idPrompt",
            type: "input",
            message: "What is the ID of the item you would like to buy?"
        },
        {
            name: "quantityPrompt",
            type: "input",
            message:"How many would you like to buy?"
        }
    ])
    .then(function(answers){
        console.log("ID Prompt: " + answers.idPrompt ,"Quantity Prompt: " + answers.quantityPrompt);
        connection.query(
            "UPDATE products SET stock_quanity=? WHERE ?",
            [
              {
                stock_quantity: stock_quantity - answers.quantityPrompt 
              },
              {
                item_id: answers.idPrompt
              }
            ],
            function(err, res) {
              console.log(res.affectedRows);
        })
        connection.query("SELECT * FROM products WHERE item_id =?", [answers.idPrompt], function (err, res) {
            if (err) throw err;
            for (x in res){
            console.log('The cost of your purchase is: ' + (answers.quantityPrompt) * (res[x].price));
            }
        });
        startUp();
    });
}

function startUp(){
    displayEverything();
    inquirerStart();
}

startUp();
