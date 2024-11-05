'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderLimit = sequelize.define('OrderLimit', {
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure this field is required
    }
  }, {
    tableName: 'order_limits', // The actual table name in the database
    timestamps: true // If you want Sequelize to manage createdAt and updatedAt
  });

  // Define associations (if needed)
  OrderLimit.associate = (models) => {
    // Example of association (if needed)
    // OrderLimit.hasMany(models.OtherModel, { foreignKey: 'order_limit_id' });
  };

  return OrderLimit;
};
