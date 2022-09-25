'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ingresos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaHora: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      cuentaId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Cuentas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'     
      } 
 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ingresos');
  }
};
