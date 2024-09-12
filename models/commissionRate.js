'use strict';

module.exports = (sequelize, DataTypes) => {
  const CommissionRate = sequelize.define('CommissionRate', {
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
      allowNull: false
    },
    commission_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  });

  CommissionRate.associate = (models) => {
    // Associate with Role
    CommissionRate.belongsTo(models.Role, { foreignKey: 'role_id' });
  };

  return CommissionRate;
};
