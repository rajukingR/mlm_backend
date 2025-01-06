'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,  
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,  
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false,  
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    branch: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    email_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false,  
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: false,  
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
      },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,  
    },
    landmark: {
      type: DataTypes.STRING(255),
      allowNull: true,  
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: true,  
    },
    team_head_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  
    },
    is_team_head: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0, // Default to false
    },
    role_based: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1, // Default to true
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
    tableName: 'customers', // Name of the table
    timestamps: true,  
    createdAt: 'created_at',  
    updatedAt: 'updated_at',  
  });

  // Associations
  Customer.associate = function(models) {
    // Define relationships here if needed
  };

  return Customer;
};
