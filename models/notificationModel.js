module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define(
      'Notification',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        is_read: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default value
        },
        detail: {
          type: DataTypes.JSON,
          allowNull: true, // Set to false if it must always have a value
        },
        photo: {
          type: DataTypes.STRING, // Use STRING for storing image paths/URLs
          allowNull: true, // Allow NULL if the photo is optional
        },
        status: {
          type: DataTypes.STRING,
          defaultValue: 'Active', 
        },
      },
      {
        tableName: 'notifications', // Matches the name of your table
        timestamps: false, // Disable Sequelize's default timestamps
      }
    );
  
    // Add associations if required
    Notification.associate = (models) => {
      Notification.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    };
  
    return Notification;
  };
  