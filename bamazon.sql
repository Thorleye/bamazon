CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
item_id INTEGER(100) NOT NULL auto_increment,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50),
price DECIMAL (6, 2) NOT NULL,
stock_quantity INTEGER(255) NOT NULL,
PRIMARY KEY(item_id) 
);

INSERT into products(product_name, department_name, price, stock_quantity)
values("Stories of True Crime", "Books", 15.99, 32),
("AA Batteries", "Electronics", 7.99, 86),
("Bamazon Becho", "Electronics", 44.50, 65),
("Autographed Hockey Jersey", "Apparel", 287.99, 1),
("Bamazon Bindle", "Electronics", 29.99, 79),
("Childrens Picture Book", "Books", 23.68, 11),
("Toaster", "Appliances", 34.50, 22),
("Refridgerator", "Appliances", 680.00, 4),
("Blue Jeans", "Apparel", 79.99, 66),
("Tube Socks", "Apparel", 3.99, 99),
("Bamazon Gift Card: $25", "Gift Cards", 25.00, 100);
 
 SELECT * FROM products;