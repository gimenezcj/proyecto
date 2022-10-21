'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('decorativos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      x: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      y: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      grupoDecorativoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'grupoDecorativos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
      },
      nroPieza: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      valor: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      baseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'imagenes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
      },
      auxiliarId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'imagenes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('decorativos');
  }
};