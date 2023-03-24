const { Model, DataTypes, Sequelize } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model");

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    field: "category_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: "category"
    });
    // this.hasMany(models.OrderProduct, {
    //   as: "productorder",
    //   foreignKey: "productId"
    // });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    }
  }
};

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
