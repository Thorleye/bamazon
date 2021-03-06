# bamazon
A node application using my MySQL on the backend to create a virtual storefront and inventory management system.
The Inquirer web package is also used to create a command line interface for interaction.

## Instructions

*node bamazonCustomer* will bring up an inventory list from the SQL database and prompt the user for purchasing information. Following the instructions will allow the user to purchase items if there are enough in inventory, and calculate final costs. The items will be removed from the SQL database. 

##### Example
![customer gif](./images/customer.gif)

*node bamazonManager* will bring up the manager's interface which allows for viewing of the complete inventory in the SQL database as well as adding stock or a new item entirely. Prompted again using the inquirer npm package.

##### Example
![manager gif](./images/manager.gif)