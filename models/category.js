'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parent_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    tableName: 'category'
  });

  return Category;
};
