'use strict';

module.exports = (sequelize, DataTypes) => {
  const SalesTarget = sequelize.define('SalesTarget', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Automatically increments for each new record
      primaryKey: true, // Set as primary key
    },
    role: {
      type: DataTypes.ENUM('Area Development Officer (ADO)', 'Master Distributor (MD)', 'Super Distributor (SD)', 'Distributor'),
      allowNull: false,
    },
    productType: {
      type: DataTypes.ENUM('Virgin Coconut Oil', 'Virgin Coconut Hair Oil'),
      allowNull: false,
    },
    target: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    duration: {
      type: DataTypes.ENUM('1 month', '3 months', '6 months'),
      allowNull: false,
    },
  }, {
    tableName: 'sales_target',
    timestamps: true, // Handles createdAt and updatedAt fields
  });

  return SalesTarget;
};
