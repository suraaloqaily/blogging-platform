 
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Blog = require("./Blog"); 
const User = require("./User ");  

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Blog,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Like",
    tableName: "Like",
    timestamps: true,
  }
);

module.exports = Like;
