module.exports = (sequelize, DataTypes) => {
    const DeleteRequest = sequelize.define('DeleteRequest', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id',
        },
        onDelete: 'CASCADE', 
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Deleted', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending', 
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'created_at',
      },
    }, {
      tableName: 'delete_requests',
      timestamps: false, 
      underscored: true,
    });

    DeleteRequest.associate = function(models) {
        DeleteRequest.belongsTo(models.User, { foreignKey: 'user_id' });
      };
  
    return DeleteRequest;
  };
  