'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagenes', [
      {id: 70, nombreArchivo: 'mujer1.png'},
      {id: 71, nombreArchivo: 'mujer2.png'},
      {id: 72, nombreArchivo: 'eldeportista.png'},
      {id: 73, nombreArchivo: 'deportista.png'},
      {id: 74, nombreArchivo: 'maestro.png'}
    ], {});

    await queryInterface.bulkInsert('decorativos', [
      {id:30, valor:100, baseId: 70, grupoDecorativoId: 10},
      {id:31, valor:200, baseId: 71, grupoDecorativoId: 10},
      {id:32, valor:300, baseId: 72, grupoDecorativoId: 10},
      {id:33, valor:400, baseId: 73, grupoDecorativoId: 10},
      {id:34, valor:500, baseId: 74, grupoDecorativoId: 10}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('decorativos', {id: {[Op.in]: [30, 31, 32, 33, 34]}}, {});
    await queryInterface.bulkDelete('imagenes', {id: {[Op.in]: [70, 71, 72, 73, 74]}}, {});
  }
};
