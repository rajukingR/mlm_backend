'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    baseprice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    final_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
  }, {
    tableName: 'orderitems',
    timestamps: true,
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id', as: 'OrderItems' });
  };

  return OrderItem;
};
