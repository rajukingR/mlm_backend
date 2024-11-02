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
    quantity_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'INR' 
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
    category_id: { 
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    }
  }, {
    tableName: 'products',
    timestamps: true, 
  });

  return Product;
};


