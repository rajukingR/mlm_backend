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
  }, {
    tableName: 'announcements', // The table name in the database
    timestamps: true, // Enable createdAt and updatedAt fields
  });

  // Associations (if any) can be added here
  Announcement.associate = (models) => {
    // Example association if needed:
    // Announcement.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Announcement;
};
