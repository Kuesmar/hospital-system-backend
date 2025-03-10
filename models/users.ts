import { DataTypes } from "sequelize";
import sequelize from "../connection";

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Puede ser null si el usuario usa OAuth
    },
    provider: {
      type: DataTypes.ENUM("local", "google", "facebook", "github"),
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Puede ser null si usa email/password
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    underscored: true,
  }
);

export default Users;
