'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('obrasSociales', [
      {id: 1, nombre: 'Sin obra social'},
      {id: 2, nombre: 'IOMA'},
      {id: 3, nombre: 'Petroleros'},
      {id: 4, nombre: 'Galeno'}
    ], {});    
    
    await queryInterface.bulkInsert('imagenes', [
      {id: 1, nombreArchivo: 'archivo1.png'},
      {id: 2, nombreArchivo: 'archivo2.png'},
      {id: 3, nombreArchivo: 'archivo3.png'}
    ], {});

    await queryInterface.bulkInsert('personas', [
      {id:1, nombre: 'Javier'       , apellido: 'Gimenez'     ,dni: '23569924'},
      {id:2, nombre: 'Silvia'       , apellido: 'Uzagasti'    ,dni: '33333333'},
      {id:3, nombre: 'Vanesa'       , apellido: 'Gonzalez'    ,dni: '33333334'},
      {id:4, nombre: 'Un contacto'  , apellido: 'Un Contacto' ,dni: '13333331'},
      {id:5, nombre: 'Un fono'      , apellido: 'Un Fono'     ,dni: '13333332'},
      {id:6, nombre: 'Un contacto2' , apellido: 'Un Contacto2',dni: '13333333'},
      {id:7, nombre: 'Un contacto3' , apellido: 'Un Contacto3',dni: '13333334'}
    ], {});
    
    await queryInterface.bulkInsert('contactos', [
      {id: 1, personaId: 1, celular: '2214951946', email: 'gimenez@gmail.com'},
      {id: 2, personaId: 2, email: 'silvia@algo.com'},
      {id: 3, personaId: 3, email: 'vanesa@algo.com'},
      {id: 5, personaId: 5, email: 'fono@algo.com'},
      {id: 10, personaId: 4, celular: 'otro'},
      {id: 11, personaId: 6, fijo: '2213344556'}
    ], {});

    await queryInterface.bulkInsert('cuentas', [
      {id:1, personaId: 1, clave: 'javier', usuario: 'javier' , activo: true,imagenId: 1},
      {id:2, personaId: 2, clave: 'sil'   , usuario: 'silvia' , activo: true,imagenId: 2},
      {id:3, personaId: 3, clave: 'vane'  , usuario: 'vanesa' , activo: true,imagenId: 3},
      {id:4, personaId: 5, clave: 'fono'  , usuario: 'fono'   , activo: true}
    ], {});

    await queryInterface.bulkInsert('ingresos', [
      {id: 1, fechaHora: '20220501', cuentaId: 1},
      {id: 2, fechaHora: '20220502', cuentaId: 1},
      {id: 3, fechaHora: '20220601', cuentaId: 2},
      {id: 4, fechaHora: '20220503', cuentaId: 1}
    ], {});
    
    await queryInterface.bulkInsert('familiares', [
      {id:1, personaId:1, familiarId:4, familiar: 'hermano'},
      {id:2, personaId:1, familiarId:6, familiar: 'primo'}
    ]);

    await queryInterface.bulkInsert('fonoaudiologos', [
      {id: 1, matricula: '3333', personaId: 5}
    ], {});

    await queryInterface.bulkInsert('pacientes', [
      {id: 1, nroAfiliado: '1235699249', personaId: 1, obraSocialId:2, fonoaudiologoId: 1},
      {id: 2, personaId: 2, obraSocialId:1, fonoaudiologoId: 1},
      {id: 3, personaId: 3, obraSocialId:1, fonoaudiologoId: 1}
    ], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('pacientes', null, {});
     await queryInterface.bulkDelete('fonoaudiologos', null, {});
     await queryInterface.bulkDelete('familiares', null, {});
     await queryInterface.bulkDelete('ingresos', null, {});
     await queryInterface.bulkDelete('cuentas', null, {});
     await queryInterface.bulkDelete('contactos', null, {});
     await queryInterface.bulkDelete('personas', null, {});
     await queryInterface.bulkDelete('imagenes', null, {});
     await queryInterface.bulkDelete('obrasSociales', null, {});

  }
};
