'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagenes', [
      {id: 100, nombreArchivo: 'generico.png'},
    ], {});

    await queryInterface.bulkInsert('decorativos', [
      {id:50, valor:0, baseId: 100, grupoDecorativoId: 10},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    
    await queryInterface.bulkDelete('decorativos', {id: {[Op.in]: [50]}}, {});
    await queryInterface.bulkDelete('imagenes', {id: {[Op.in]: [100]}}, {});
  }
};
