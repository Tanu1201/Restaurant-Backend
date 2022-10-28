'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
require('dotenv').config()
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize("postgres://vqdiqwopeqvxjs:0901e1223263b7d6e7ef834b96ff30283668f01257b951038b6f5cc28ac6c6c5@ec2-44-199-9-102.compute-1.amazonaws.com:5432/dah7aajl1rusu?sslmode=no-verify",{
    
  host: 'ec2-44-199-9-102.compute-1.amazonaws.com',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
  });
} else {
  console.log(process.env.DB_PORT);
  sequelize = new Sequelize({database:process.env.DB_DATABASE, username:process.env.DB_USERNAME,password: process.env.DB_PASSWORD, 
    host:process.env.DB_HOST,
    port:process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions:{
      ssl: {
        require: true,
        rejectUnauthorized: false
    }
    }
  });
}

try {
   sequelize.authenticate().then(res=>{
  console.log('Connection has been established successfully.');

   });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
