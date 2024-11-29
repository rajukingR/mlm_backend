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
        receive_user_id: {
          type: DataTypes.INTEGER,
          allowNull: true, // Required field
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
  