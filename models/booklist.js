/*eslint-disable*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  var booklist = sequelize.define('booklist', {
    bookid: DataTypes.STRING,
    author: DataTypes.STRING,
    rating: DataTypes.STRING,
    name: DataTypes.STRING,
    liked: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return booklist;
};
