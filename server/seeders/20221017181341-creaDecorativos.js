'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imagenes', [
      {id: 50, nombreArchivo: 'shoppinera.png'},
      {id: 51, nombreArchivo: 'informatico.png'},
      {id: 52, nombreArchivo: 'graduada.png'},
      {id: 53, nombreArchivo: 'compradora.png'},
      {id: 54, nombreArchivo: 'chicoskate.png'},
      {id: 55, nombreArchivo: 'valijaArgentina.png'}, 
      {id: 56, nombreArchivo: 'valijaBeige.png'},
      {id: 57, nombreArchivo: 'valijaNegra.png'}, 
      {id: 58, nombreArchivo: 'valijaNaranja.png'}, 
      {id: 59, nombreArchivo: 'valijaOvalGris.png'},
      {id: 60, nombreArchivo: 'volanteHonda-400.png'},
      {id: 61, nombreArchivo: 'volanteBMW-400.png'},
      {id: 62, nombreArchivo: 'volanteBarco.png'},
      {id: 63, nombreArchivo: 'volanteBarco2.png'},
      {id: 64, nombreArchivo: 'tableroPrisma.png'},
      {id: 65, nombreArchivo: 'barba.png'}
    ], {});

    await queryInterface.bulkInsert('grupoDecorativos', [
      {id:10, descripcion: 'presonajes'},
      {id:11, descripcion: 'valijas'},
      {id:12, descripcion: 'volante'},
      {id:13, descripcion: 'tablero'}
    ], {});

    await queryInterface.bulkInsert('decorativos', [
      {id:10, valor:10000, baseId: 50, grupoDecorativoId: 10},
      {id:11, valor:200, baseId: 51, grupoDecorativoId: 10},
      {id:12, valor:300, baseId: 52, grupoDecorativoId: 10},
      {id:13, valor:400, baseId: 53, grupoDecorativoId: 10},
      {id:14, valor:500, baseId: 54, grupoDecorativoId: 10},
      {id:15, valor:110, baseId: 55, grupoDecorativoId: 11},
      {id:16, valor:210, baseId: 56, grupoDecorativoId: 11},
      {id:17, valor:310, baseId: 57, grupoDecorativoId: 11},
      {id:18, valor:410, baseId: 58, grupoDecorativoId: 11},
      {id:19, valor:510, baseId: 59, grupoDecorativoId: 11},
      {id:20, valor:1000, baseId: 60, grupoDecorativoId: 12},
      {id:21, valor:1100, baseId: 61, grupoDecorativoId: 12},
      {id:22, valor:1200, baseId: 62, grupoDecorativoId: 12},
      {id:23, valor:1300, baseId: 63, grupoDecorativoId: 12},
      {id:24, valor:800, baseId: 64, grupoDecorativoId: 13},
      {id:25, valor: 50, baseId: 65, grupoDecorativoId: 10}
    ], {});

    await queryInterface.bulkDelete('personajes', null, {});

    await queryInterface.bulkInsert('personajes', [
      {id: 1, nombre: 'cacho'  , puntajeAcumulado: 5000, pacienteId: 1, imagenId:25, valijaId: 15, volanteId:20, tableroId: 24},
      {id: 2, nombre: 'rosalia', puntajeAcumulado: 0   , pacienteId: 2, imagenId:10, valijaId: 19, volanteId:23, tableroId: 24}
    ], {});


  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete('personajes', null, {});
    await queryInterface.bulkDelete('decorativos', {id: {[Op.in]: [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]}}, {});
    await queryInterface.bulkDelete('grupoDecorativos', {id: {[Op.in]: [10,11,12,13]}}, {});
    await queryInterface.bulkDelete('imagenes', {id: {[Op.in]: [50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]}}, {});
    
  }
};
