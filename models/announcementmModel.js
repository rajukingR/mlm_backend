// models/Announcement.js

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define('Announcement', {
    documentID: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      type: DataTypes.STRING,
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
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Store the file name or URL
    },
    fromDate: {  // New field for From Date
      type: DataTypes.DATE,
      allowNull: true,
    },
    toDate: {    // New field for To Date
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'announcements',
    timestamps: true,
  });

  return Announcement;
};
