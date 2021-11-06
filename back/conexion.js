const Sequelize = require("sequelize");
const path = "mysql://root:admin@localhost:3306/data_warehouse";
const sequelize = new Sequelize(path, { operatorsAliases: 0 });

sequelize
	.authenticate()
	.then(() => {
		console.log("DB connected");
	})
	.catch((err) => {
		console.log("Error ", err);
	});

module.exports = sequelize;
