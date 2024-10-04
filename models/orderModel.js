'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
      defaultValue: 'Pending',
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' }); // Associating orders with users
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id' }); // Associating orders with order items
  };

  return Order;
};
