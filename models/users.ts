import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import { UserAttributes } from "../types/UserAttributes";

// Definir los atributos opcionales en la creación (id, createdAt y updatedAt se generan automáticamente)
interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

// Definir la instancia del modelo (para tipado en TypeScript)
interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const Users = sequelize.define<UserInstance>(
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
    tableName: "users",
    underscored: true,
    timestamps: true
  }
);

export default Users;
