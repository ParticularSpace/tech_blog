const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../config/connection'); 
const bcrypt = require('bcrypt'); 
const { tr } = require('faker/lib/locales');

class User extends Model {
  async checkPassword(loginPw) {
    console.log("loginPw: ", loginPw.password);
    console.log("hashed password: ", this.password);
    return await bcrypt.compare(loginPw.password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, 
        validate: {
            isEmail: true, //  email in correct format
        },
    },
    date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true, 
        },
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [10],
        },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], 
      },
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User; 
