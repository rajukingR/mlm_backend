'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  
    },
    product_name: {  
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true, 
    },
    model_name: {  
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_type: {  
      type: DataTypes.ENUM('B2B', 'B2C'), 
      allowNull: false,
    },
    file_details: {  
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_active: {  
      type: DataTypes.TINYINT(1),
      defaultValue: 0, 
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    category: {  
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    sub_category: { 
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    sub_product_type: { // New column
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {  
      type: DataTypes.DATE,  
      defaultValue: DataTypes.NOW, 
      field: 'created_at',
    },
    updated_at: {  
      type: DataTypes.DATE,  
      defaultValue: DataTypes.NOW,  
      onUpdate: DataTypes.NOW,
      field: 'updated_at',
    },
  }, {
    tableName: 'products', 
    timestamps: true,  
    createdAt: 'created_at',  
    updatedAt: 'updated_at',  
  });

  return Product;
};
