'use strict';

module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    documentID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true, // Set this as the primary key
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiver: {
      type: DataTypes.ENUM('All Users', 'ADO', 'MD', 'SD', 'Distributor', 'Customers'),
      allowNull: false,
    },
    autoUpdate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    activateStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'documents',
    timestamps: true, 
  });

  return Document;
};
