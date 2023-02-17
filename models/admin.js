"use strict";
const { Model } = require("sequelize");

//1. import bcrypt untuk melakukan enkripsi
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    //2. method untuk melakukan enkripsi
    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    //3. method untuk register

    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword });
    };
    //method .compareSync digunakan untuk mecocokkan plaintext dengan hash
    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    //method authenticate untuk login
    static authenticate = async ({ username, password }) => {
      try {
        const admin = await this.findOne({ where: { username } });
        if (!admin) return Promise.reject("User not found");
        const isPasswordValid = admin.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong password");
        return Promise.resolve(admin);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  Admin.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
