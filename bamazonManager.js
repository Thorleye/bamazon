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
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What item ID would you like to update?",
            validate: checkForNumber
        },{
            name: "amount",
            type: "input",
            message: "How many new items?",
            validate: checkForNumber
        }
    ]).then(function(answers){
        connection.query(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", 
                [
                    answers.amount,
                    answers.id,
                ], 
            function(err, res){
                if (err) throw err;
                console.log('Stock is Updated')
        })
       connection.query(
            "SELECT * from products WHERE product id =",[answers.id],function(err, res){
                for (x in res){
                console.log("Stock quanity for " + res[x].product_name + " is :"+ res[x].stock_quantity);
                }
        })
    })
};

var addNewItem = function(){
    inquirer.prompt([
        {
            name:"product",
            type: "input",
            message: "What is the name of the product?"
        },{
            name: "department",
            type: "input",
            message: "What department does this belong in?"
        },{
            name: "price",
            type: "input",
            message: "What does the product cost",
            validate: checkForNumber
        },{
            name: "qty",
            type: "input",
            message: "How many products to stock?",
            validate: checkForNumber
        }
    ])
    .then(function(answer){
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", 
            [answer.product, answer.department , answer.price, answer.qty],
            function(err, res){
                if (err) throw err;
                console.log('New Item Added')
            }) 
    })
};

var checkForNumber = function(input){
    if (isNaN(input)=== true){
       return "You must enter a number";
   }
   return true;
};

function managerStart(){
    inquirer
        .prompt([
            {
            name: "manager",
            type: "list",
            message: "What would you like to do?",
            choices:[
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
            }
        ])
        .then(answers => {
            switch(answers.manager){
                case "View Products for Sale":
                displayEverything();
                break

                case "View Low Inventory":
                viewLowInventory();
                break

                case "Add to Inventory":
                displayEverything();
                setTimeout(addToInventory, 500);
                break

                case "Add New Product":
                addNewItem();
                break
            }
        })
} 
managerStart();