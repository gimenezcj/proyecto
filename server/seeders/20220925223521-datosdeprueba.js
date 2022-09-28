'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipofamiliars', [
      {id:1, descripcion: 'Hermano'},
      {id:2, descripcion: 'Padre'},
      {id:3, descripcion: 'Tio'},
      {id:4, descripcion: 'Primo'},
      {id:5, descripcion: 'Hijo'},
    ], {});
    await queryInterface.bulkInsert('obrasSociales', [
      {id: 1, nombre: 'Sin obra social'},
      {id: 2, nombre: 'IOMA'},
      {id: 3, nombre: 'Petroleros'},
      {id: 4, nombre: 'Galeno'},
    ], {});    
    await queryInterface.bulkInsert('imagenes', [
      {id: 1, nombreArchivo: 'archivo1.png'},
      {id: 2, nombreArchivo: 'archivo2.png'},
      {id: 3, nombreArchivo: 'archivo3.png'},
    ], {});
    await queryInterface.bulkInsert('cuentas', [
      {id:1, clave: 'javier', email: 'gimenez@gmail.com',usuario: 'javier',activo: true,imagenId:1},
      {id:2, clave: 'sil', email: 'silvia@algo.com',usuario: 'silvia',activo: true,imagenId:2},
      {id:3, clave: 'vane', email: 'vanesa@algo.com',usuario: 'vanesa',activo: true,imagenId:3},
      {id:4, clave: 'fono', email: 'fono@algo.com',usuario: 'fono',activo: true}
    ], {});
    await queryInterface.bulkInsert('ingresos', [
      {id: 1, fechaHora: '20220501', cuentaId: 1},
      {id: 2, fechaHora: '20220502', cuentaId: 1},
      {id: 3, fechaHora: '20220601', cuentaId: 2},
      {id: 4, fechaHora: '20220503', cuentaId: 1}
    ], {});
    await queryInterface.bulkInsert('personas', [
      {id:1, nombre: 'Javier', apellido: 'Gimenez',dni: '23569924',cuentaID: '1'},
      {id:2, nombre: 'Silvia', apellido: 'Uzagasti',dni: '3333333333',cuentaID: '2'},
      {id:3, nombre: 'Vanesa', apellido: 'Gonzalez',dni: '3333333334',cuentaID: '3'},
      {id:4, nombre: 'Un contacto', apellido: 'Un Contacto',dni: '1333333331'},
      {id:5, nombre: 'Un fono', apellido: 'Un Fono',dni: '1333333331',cuentaID: '4'},
      {id:6, nombre: 'Un contacto2', apellido: 'Un Contacto2',dni: '1333333332'},
      {id:7, nombre: 'Un contacto3', apellido: 'Un Contacto3',dni: '1333333333'}
    ], {});
    await queryInterface.bulkInsert('contactos', [
      {id: 1, celular: '2214951946', personaId: 1, familiarId: 4, tipofamiliarId: 1},
      {id: 2, celular: 'otro', personaId: 1, familiarId: 6, tipofamiliarId: 4},
    ], {});
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('pacientes', null, {});
     await queryInterface.bulkDelete('fonoaudiologos', null, {});
     await queryInterface.bulkDelete('contactos', null, {});
     await queryInterface.bulkDelete('personas', null, {});
     await queryInterface.bulkDelete('ingresos', null, {});
     await queryInterface.bulkDelete('cuentas', null, {});
     await queryInterface.bulkDelete('imagenes', null, {});
     await queryInterface.bulkDelete('tipofamiliars', null, {});

  }
};
