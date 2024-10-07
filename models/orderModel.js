'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    coupon_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    discount_applied: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    final_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    requested_by_role: { // New field to track the role of the requester
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    higher_role_id: { // New field to store the next superior's user ID
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'orders',
    timestamps: true, // CreatedAt and UpdatedAt
  });

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, { // Define the one-to-many relationship
      foreignKey: 'order_id',
      as: 'OrderItems', // Optional: alias for inclusion
    });
  };

  return Order;
};
