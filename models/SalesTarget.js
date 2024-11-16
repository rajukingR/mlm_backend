'use strict';

module.exports = (sequelize, DataTypes) => {
  const SalesTarget = sequelize.define(
    'SalesTarget',
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_data: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'sales_targets', 
      timestamps: true,
    }
  );

  return SalesTarget;
};
