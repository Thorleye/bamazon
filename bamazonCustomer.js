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
            "Department: " + res[i].department_name + " | ",
            "Price: " + res[i].price + " | ",
            "Stock: " + res[i].stock_quantity + " | ",
            "\n-------------------------------------------------------------------------------------------------"
        )
    })
    connection.end();
};
displayEverything();