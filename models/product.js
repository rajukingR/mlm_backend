'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    product_code: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productVolume: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    adoPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    mdPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    sdPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    distributorPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    autoUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'admins',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Updated to DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Updated to DataTypes.NOW
    }
  }, {
    timestamps: true, // This is the default, explicitly stating it for clarity
  });

  return Product;
};


