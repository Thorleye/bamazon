var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'guestuser',
        password: 'GuestSQL',
        database: 'bamazon'
    }
)

connection.connect(function(err, res){
    if (err) throw err;
    console.log('\n Welcome! \n')
    }
)

function displayEverything(){
    connection.query(
    "SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (i=0; i < res.length; i++)
        console.log(
            "---------------------------------------------------------------------------------------------------\n",
            "Item ID: " + res[i].item_id + " | ",
            "Product: " + res[i].product_name + " | ",
            "Department: " + res[i].department_name + " | ",
            "Price: " + (res[i].price).toFixed(2) + " | ",
            "Stock: " + res[i].stock_quantity + " | ",
            "\n---------------------------------------------------------------------------------------------------"
        )
    });
};

var viewLowInventory = function(){
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 6", function(err, res){
            if (err) throw err;
            for (i=0; i < res.length; i++)
            console.log(
                "---------------------------------------------------------------------------------------------------\n",
                "Item ID: " + res[i].item_id + " | ",
                "Product: " + res[i].product_name + " | ",
                "Department: " + res[i].department_name + " | ",
                "Price: " + (res[i].price).toFixed(2) + " | ",
                "Stock: " + res[i].stock_quantity + " | ",
                "\n---------------------------------------------------------------------------------------------------"
            )
        }
    )
}

var addToInventory = function(){
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?", 
            [
                answers.addStock,
                answers.idPrompt
            ], 
        function(err, res){
            if (err) throw err;
            console.log('Stock is Updated')
        }
    )
    connection.query(
        "SELECT * from products WHERE product id =",[answers.idPrompt],function(err, res){
            for (x in res){
            console.log("Stock quanity for " + res[x].product_name + " is :"+ res[x].stock_quantity);
            }
        }
    )
}

var addNewItem = function(){
    connection.query(
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", 
        [answer.product, answer.department , answer.price, answer.qty],
        function(err, res){
            if (err) throw err;
            console.log('New Item Added')
        } 
    )
}

function managerStart(){
    inquirer
        .prompt([
            {
            name: manager,
            type: list,
            Message: "What would you like to do?",
            choices:[
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
            }
        ])
        .then(answers => {
            switch(answers){
                case choice === "View all inventory"
                viewLowInventory();
                break

            }
            
          });
}