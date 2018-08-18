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
//          "Department: " + res[i].department_name + " | ",
            "Price: " + (res[i].price).toFixed(2) + " | ",
//           "Stock: " + res[i].stock_quantity + " | ",
            "\n---------------------------------------------------------------------------------------------------"
        )
    inquirerStart();
    });
};

var checkForNumber = function(input){
    if (isNaN(input)=== true){
       return "You must enter a number";
   }
   return true;
};

function inquirerStart(){
    inquirer
    .prompt([
        {
            name: "idPrompt",
            type: "input",
            message: "What is the ID of the item you would like to buy?",
            validate: checkForNumber
            
        },
        {
            name: "quantityPrompt",
            type: "input",
            message:"How many would you like to buy?",
            validate: checkForNumber
        }
    ])
    .then(function(answers){
        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?",[answers.idPrompt], function(err, res){
            if (err) throw err;
            if (res.length === 0)
                console.log("Please select valid Item ID");
            
            let remainingStock = res[0].stock_quantity
            let demand = answers.quantityPrompt
            if ((remainingStock < demand)===true){
                console.log("Insufficient stock to fulfill order! Only "+ remainingStock + " left");
                return;
                
                } else {
        
                connection.query(
                    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
                    [              
                        answers.quantityPrompt, 
                        answers.idPrompt  
                    ],
                    function(err, res) {
                    if (err) throw err;
                });
                connection.query("SELECT * FROM products WHERE item_id =?", [answers.idPrompt], function (err, res) {
                    if (err) throw err;
                    for (x in res){
                    console.log("\nThe cost of your purchase is: " + ((answers.quantityPrompt) * (res[x].price)).toFixed(2) + "\n");
                    console.log("Thank you for shopping! You're our favourite customer!" + "\n\n"+
                    "-----------------------------------------------------------------------------------------------------"+"\n\n");
                    setTimeout(displayEverything, 2000);
                    }
                });
            }
        });
    });
}

displayEverything();