'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      superior_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      pincode: Sequelize.STRING,
      state: Sequelize.STRING,
      city: Sequelize.STRING,
      street_name: Sequelize.STRING,
      building_no_name: Sequelize.STRING,
      full_name: Sequelize.STRING,
      mobile_number: Sequelize.STRING,
      role_name: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
















// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Users', {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//       },
//       username: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       password: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       email: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       role_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'Roles',
//           key: 'id'
//         },
//         allowNull: false
//       },
//       superior_id: {
//         type: Sequelize.INTEGER,
//         references: {
//           model: 'Users',
//           key: 'id'
//         },
//         allowNull: true
//       },
//       pincode: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       state: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       city: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       street_name: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       building_no_name: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       full_name: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       mobile_number: {
//         type: Sequelize.STRING,
//         allowNull: true
//       },
//       role_name: {
//         type: Sequelize.ENUM('admin', 'user'),
//         allowNull: false
//       },
//       createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       },
//       updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//       }
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Users');
//   }
// };
