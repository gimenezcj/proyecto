'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('decorativosAvatares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      x: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      y: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      tipo: {
        allowNull: false,
        type: Sequelize.ENUM('sticker', 'vestimenta'),
        defaultValue: 'vestimenta'
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
      },
      imagenId:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'imagenes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('decorativosAvatares');
  }
};