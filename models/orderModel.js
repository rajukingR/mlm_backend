module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Allow NULL
    },
    coupon_code: {
      type: DataTypes.STRING(50),
      allowNull: true, // Allow NULL
    },
    discount_applied: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Allow NULL
    },
    final_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true, // Allow NULL
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending', // Default status is 'Pending'
    },
  }, {
    tableName: 'orders',
    timestamps: true, // CreatedAt and UpdatedAt
  });

  return Order;
};
