'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('evaluacionesPresenciales', [
      {id:1, fecha: '20220901', pacienteId: 1, observacion:'primer paciente, entrevista1', dificultad: 1},
      {id:2, fecha: '20221001', pacienteId: 2, observacion:'segundo paciente, entrevista2', dificultad: 2}
    ], {});

    await queryInterface.bulkInsert('decorativosAvatares', [
      {id: 1, nombre: 'buenos aires',x:1,y:1,tipo:'sticker', imagenId:1},
      {id: 2, nombre: 'cordoba',x:1,y:2,tipo:'sticker', imagenId:2},
      {id: 3, nombre: 'corbata',x:3,y:3,tipo:'vestimenta', imagenId:3},
      {id: 4, nombre: 'pantalon',x:6,y:1,tipo:'vestimenta', imagenId:1},
      {id: 5, nombre: 'camisa',x:4,y:1,tipo:'vestimenta', imagenId:2}
    ], {});    

    await queryInterface.bulkInsert('personajes', [
      {id: 1, nombre: 'cacho', puntajeAcumulado: 0, pacienteId: 1, imagenId:1},
      {id: 2, nombre: 'rosalia', puntajeAcumulado: 0, pacienteId: 2, imagenId:2}
    ], {}); 

    await queryInterface.bulkInsert('personajesDecorativos', [
      {id: 1, personajeId: 1, decoId: 3},
      {id: 2, personajeId: 1, decoId: 4},
      {id: 3, personajeId: 1, decoId: 5}
    ], {}); 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('personajesDecorativos', null, {});
     await queryInterface.bulkDelete('personajes', null, {});
     await queryInterface.bulkDelete('decorativosAvatares', null, {});
     await queryInterface.bulkDelete('evaluacionesPresenciales', null, {});

  }
};
