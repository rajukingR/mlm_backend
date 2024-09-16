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
        model: 'Roles', // Ensure this matches the table name
        key: 'id'
      },
      allowNull: false
    },
    superior_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null for admins
      references: {
        model: 'Users',
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
    }
  }, {
    timestamps: true // Ensure timestamps are managed by Sequelize
  });

  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'role_id' });
    User.belongsTo(models.User, { foreignKey: 'superior_id', as: 'Parent' });
  };

  return User;
};





























// 'use strict';

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     role_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Roles',
//         key: 'id'
//       },
//       allowNull: false
//     },

//     superior_id: {
//       type: DataTypes.INTEGER,
//       allowNull: function() {
//         return this.role_name !== 'admin';
//       },
//       references: {
//         model: 'Users',
//         key: 'id'
//       }
//     },

//     pincode: DataTypes.STRING,
//     state: DataTypes.STRING,
//     city: DataTypes.STRING,
//     street_name: DataTypes.STRING,
//     building_no_name: DataTypes.STRING,
//     // full_name: DataTypes.STRING,
//     full_name: {
//       type: DataTypes.STRING,
//       allowNull: true 
//     },
//     mobile_number: DataTypes.STRING,
//     role_name: {
//       type: DataTypes.ENUM('admin', 'user'),
//       allowNull: false
//     }
//   }, {
//     timestamps: true // Ensure timestamps are managed by Sequelize
//   });

//   User.associate = (models) => {
//     User.belongsTo(models.Role, { foreignKey: 'role_id' });
//     User.belongsTo(models.User, { foreignKey: 'superior_id', as: 'Parent' });
//   };

//   return User;
// };
