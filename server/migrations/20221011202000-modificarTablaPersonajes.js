'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('personajes','volanteId',{
        type: Sequelize.INTEGER,        
        references: {
          model: 'decorativos',
          key: 'id'},
        onUpdate: 'cascade',
        onDelete: 'cascade' }),
      queryInterface.addColumn('personajes','tableroId',{
        type: Sequelize.INTEGER,
        references: {
          model: 'decorativos',
          key: 'id'},
      onUpdate: 'cascade',
      onDelete: 'cascade' }),
      queryInterface.addColumn('personajes','valijaId',{
        type: Sequelize.INTEGER,
        references: {
          model: 'decorativos',
          key: 'id'},
        onUpdate: 'cascade',
        onDelete: 'cascade' }),
        queryInterface.changeColumn('personajes','imagenId',{
          type: Sequelize.INTEGER,
          references: {
            model: 'decorativos',
            key: 'id'},
          onUpdate: 'cascade',
          onDelete: 'cascade' })
    ]);

  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('personajes', 'valijaId'),
      queryInterface.removeColumn('personajes', 'tableroId'),
      queryInterface.removeColumn('personajes', 'volanteId')
    ]);
  }
};