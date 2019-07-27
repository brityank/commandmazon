module.exports = function() {
  const mysql = require("mysql");

  const seedDB = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "commandmazonDB"
  });

  seedDB.connect(err => {
    if (err) throw new Error(`Error: ${err.message}`);
    console.log(`Connected to database. Status: ${seedDB.state}`);
  });

  seedDB.query("DROP TABLE IF EXISTS items", (err, data) => {
    if (err) throw new Error(`Error: ${err.message}`);
    console.log("TABLE DROPPED.");
  });

  seedDB.query(
    "CREATE TABLE items(item_id INT NOT NULL AUTO_INCREMENT, product_name VARCHAR(50), department_name VARCHAR(50), product_price DECIMAL(10,2) NOT NULL, stock_quantity INT DEFAULT(10), product_sales INT DEFAULT(0), PRIMARY KEY (item_id))",
    (err, data) => {
      if (err) throw new Error(`Error: ${err.message}`);
      console.log("TABLE CREATED.");
    }
  );

  const seedData = [
    ["iPhone XS", "electronics", 800.0],
    ["Macbook Pro 13-inch", "electronics", 1500.0],
    ["Samsung Tablet", "electronics", 500.0],
    ["Sofa", "furniture", 450.0],
    ["Dresser", "furniture", 150.0],
    ["Bed", "furniture", 700.0],
    ["Hue Lightbulb", "household", 60.0],
    ["Nest Thermostat", "household", 220.0],
    ["Nest Camera", "household", 135.0],
    ["Coffee Grounds", "groceries", 35.0]
  ];

  seedDB.query(
    "INSERT INTO items(product_name, department_name, product_price) VALUES ?",
    [seedData],
    (err, data) => {
      if (err) throw new Error(`Error: ${err.message}`);
      console.log(`DATA INSERTED: ${data.affectedRows} rows`);
      seedDB.end();
    }
  );
};
