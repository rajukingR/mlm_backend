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
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    image: {
      type: DataTypes.STRING,
      allowNull: true, // Store the file name or URL
    },
    
  }, {
    tableName: 'announcements',
    timestamps: true,
  });

  return Announcement;
};
