'use strict';
const bcrypt = require('../helper/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  },{
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  User.addHook('beforeCreate',(user,option)=>{
    user.password = bcrypt.hassingPassword(user.password)
  })
  return User;
};