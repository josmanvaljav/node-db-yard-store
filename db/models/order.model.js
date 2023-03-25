const { Model, DataTypes, Sequelize } = require("sequelize");
const { CUSTOMER_TABLE } = require("./customer.model");

const ORDER_TABLE = "orders";

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
  customerId: {
    field: "customer_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  // Calculated field, just recomende for short amount of records. Instead use a Database query
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.products) {
        if (this.products.length > 0) {
          return this.products.reduce((total, item) => {
            return total + (item.price * item.OrderProduct.amount);
          }, 0);
        }
      } else {
        return null;
      }
    }
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: "customer"
    });
    this.belongsToMany(models.Product, {
      as: "products",
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId"
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    }
  }
};

module.exports = { ORDER_TABLE, OrderSchema, Order };

