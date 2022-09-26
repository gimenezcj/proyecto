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
    await queryInterface.bulkInsert('imagenes', [
      {id: 1, nombreArchivo: 'archivo1.png'},
      {id: 2, nombreArchivo: 'archivo2.png'},
      {id: 3, nombreArchivo: 'archivo3.png'},
    ], {});
    await queryInterface.bulkInsert('cuentas', [
      {id:1, clave: 'javier', email: 'gimenez@gmail.com',usuario: 'javier',activo: true},
      {id:2, clave: 'sil', email: 'silvia@algo.com',usuario: 'silvia',activo: true},
      {id:3, clave: 'vane', email: 'vanesa@algo.com',usuario: 'vanesa',activo: true},
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
      {id:4, nombre: 'Un contacto', apellido: 'Un Contacto',dni: '1333333330'},
      {id:5, nombre: 'Un fono', apellido: 'Un Fono',dni: '1333333331',cuentaID: '4'}
    ], {});
    await queryInterface.bulkInsert('contactos', [
      {id: 1, celular: '2214951946', personaId: 1, familiarId: 4, tipofamiliarId: 1}
    ], {});
    await queryInterface.bulkInsert('fonoaudiologos', [
      {id: 1, matricula: '3333', personaId: 5}
    ], {});
    await queryInterface.bulkInsert('pacientes', [
      {id: 1, nroAfiliado: '1235699249', personaId: 1, fonoaudiologoId: 1},
      {id: 2, personaId: 2, fonoaudiologoId: 1},
      {id: 3, personaId: 3, fonoaudiologoId: 1}
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('tipofamiliar', null, {});
  }
};
