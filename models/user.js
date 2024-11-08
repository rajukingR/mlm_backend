'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      },
      allowNull: false
    },
    superior_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    superior_ado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    superior_md: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    superior_sd: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    superior_d: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    pincode: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street_name: DataTypes.STRING,
    building_no_name: DataTypes.STRING,
    full_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mobile_number: DataTypes.STRING,
    role_name: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false
    },
    country: { // New column
      type: DataTypes.STRING,
      allowNull: true
    },
    image: { // Ensure image column exists
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'role_id' });
    User.belongsTo(models.User, { foreignKey: 'superior_id', as: 'Parent' });

    // Self-referencing associations for superiors
    User.belongsTo(models.User, { foreignKey: 'superior_ado', as: 'AdoSuperior' });
    User.belongsTo(models.User, { foreignKey: 'superior_md', as: 'MdSuperior' });
    User.belongsTo(models.User, { foreignKey: 'superior_sd', as: 'SdSuperior' });
    User.belongsTo(models.User, { foreignKey: 'superior_d', as: 'DSuperior' });
  };

  return User;
};
