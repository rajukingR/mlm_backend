'use strict';

module.exports = (sequelize, DataTypes) => {
  const NotificationOrder = sequelize.define('NotificationOrder', {
    request_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receive_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'notification_orders',
    timestamps: false, // Disable Sequelize's default timestamps
  });

  // Associations (if needed)
  NotificationOrder.associate = (models) => {
    // Notification belongs to a requester (user who created the order)
    NotificationOrder.belongsTo(models.User, {
      foreignKey: 'request_user_id',
      as: 'Requester',
    });

    // Notification belongs to a receiver (superior)
    NotificationOrder.belongsTo(models.User, {
      foreignKey: 'receive_user_id',
      as: 'Receiver',
    });
  };

  return NotificationOrder;
};
