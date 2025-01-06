'use strict';

module.exports = (sequelize, DataTypes) => {
  const ConsumerProduct = sequelize.define('ConsumerProduct', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  
    },
    consumer_id: {  
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    product_id: {  
      type: DataTypes.INTEGER,
      allowNull: false,  
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
    tableName: 'ConsumerProduct', // Name of the table
    timestamps: true,  
    createdAt: 'created_at',  
    updatedAt: 'updated_at',  
  });

  ConsumerProduct.associate = function(models) {
    // Update the alias to match the one used in Consumer
    ConsumerProduct.belongsTo(models.Consumer, { foreignKey: 'consumer_id', as: 'consumerProducts' }); // Use 'consumerProducts'
    ConsumerProduct.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return ConsumerProduct;
};
