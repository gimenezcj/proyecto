'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('imagenes', [
      {id: 10, nombreArchivo: 'ciudadBsAs.jpg'},
      {id: 11, nombreArchivo: 'arbolado.jpg'},
      {id: 12, nombreArchivo: 'montanas.jpg'},
      {id: 13, nombreArchivo: 'suelo1.png'},
      {id: 14, nombreArchivo: 'colision1.png'},
      {id: 20, nombreArchivo: 'aceite1.png'},
      {id: 21, nombreArchivo: 'aceite2.png'},
      {id: 22, nombreArchivo: 'aceite3.png'},
      {id: 30, nombreArchivo: 'tarzan.mp3'}
    ], {});

    await queryInterface.bulkInsert('escenarios', [
      {id: 1, nombre: 'buenos aires',sueloPlanoId: 13, sueloColisionId: 14, fondoId: 10},
      {id: 2, nombre: 'cordoba',sueloPlanoId: 13, sueloColisionId: 14, fondoId: 12}
    ], {});    

    await queryInterface.bulkInsert('rehabilitaciones', [
      {id: 1, fonoaudiologoId: 1, pacienteId: 1, escenarioId: 1, dificultad: 'bajo'},
      {id: 2, fonoaudiologoId: 1, pacienteId: 2, escenarioId: 2, dificultad: 'medio'}
    ], {}); 

    await queryInterface.bulkInsert('recorridos', [
      {id: 1, xInicial: 6, yInicial:3,xAFinal:-40,yAFinal:-70,xBFinal:-45,yBFinal:-80, puntaje: 400}
    ], {}); 

    await queryInterface.bulkInsert('actividadesDisponibles', [
      {id: 1, nombre: 'actividad1', estimuloVisual: 'Seleccionar el menor precio', estimuloAuditivo: 'audio1.mp4', puntosAOtorgar: 200,timpoMaximoResolucion: 120, dificultad:'bajo', detalle:'actividad uno con distractor del grito de tarzan 3 segundos despues de iniciar', recorridoId: 1},
      {id: 2, nombre: 'actividad2', estimuloVisual: 'Seleccionar el menor precio2', estimuloAuditivo: 'audio1.mp4', puntosAOtorgar: 200,timpoMaximoResolucion: 120, dificultad:'bajo', detalle:'algo que lo describa2', recorridoId: 1},
      {id: 3, nombre: 'actividad3', estimuloVisual: 'Seleccionar el menor precio3', estimuloAuditivo: 'audio2.mp4', puntosAOtorgar: 200,timpoMaximoResolucion: 120, dificultad:'bajo', detalle:'algo que lo describa3', recorridoId: 1},
    ], {}); 

    await queryInterface.bulkInsert('actividades', [
      {id: 1, rehabilitacionId: 1, actividadDisponibleId: 1, orden: 1},
      {id: 2, rehabilitacionId: 1, actividadDisponibleId: 2, orden: 2},
      {id: 3, rehabilitacionId: 1, actividadDisponibleId: 3, orden: 3}
    ], {}); 

    await queryInterface.bulkInsert('comprarProductos', [
      {id:1, actividadId: 1, cantidadItems:3,estimuloAuditivo:true,estimuloAuditivo:true}
    ], {}); 

    await queryInterface.bulkInsert('productos', [
      {id:1,comprarProductoId:1, nombre:'aceite 1', precio:105.20, imagenId: 20},
      {id:2,comprarProductoId:1, nombre:'aceite 2', precio:87.60, imagenId: 21},
      {id:3,comprarProductoId:1, nombre:'aceite 3', precio:125.70, imagenId: 22},
    ], {}); 

    await queryInterface.bulkInsert('distractoresDisponibles', [
      {id:1, nombre: 'grito de tarzan', imagenId: 30, tiempoInicial: 3}
    ], {}); 

    await queryInterface.bulkInsert('distractores', [
      {id:1, orden:1, recorridoId: 1, distractorDisponibleId: 1}
    ], {}); 

    await queryInterface.bulkInsert('resultadosActividades', [
      {id:1, inicio: '2022-09-20', finalizo: '2022-09-21'}
    ], {}); 
    await queryInterface.bulkInsert('resultadosRecorridos', [
      {id:1, actividadId: 1, completo:true, recorrioDistancia:240, recorrioTiempo:15, chocoCasa:true, completo:true}
    ], {}); 
    await queryInterface.bulkInsert('resultadosComprarProductos', [
      {id:1, resultadoActividadId: 1, equivocoSeleccion:true, ordenQueSelecciono: '1-2-x'}
    ], {}); 
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('resultadosComprarProductos', null, {});
    await queryInterface.bulkDelete('resultadosRecorridos', null, {});
    await queryInterface.bulkDelete('resultadosActividades', null, {});


    await queryInterface.bulkDelete('distractores', null, {});
    await queryInterface.bulkDelete('distractoresDisponibles', null, {});

    await queryInterface.bulkDelete('productos', null, {});
    await queryInterface.bulkDelete('comprarProductos', null, {});

    await queryInterface.bulkDelete('actividades', null, {});
    await queryInterface.bulkDelete('actividadesDisponibles', null, {});
    await queryInterface.bulkDelete('recorridos', null, {});
    await queryInterface.bulkDelete('rehabilitaciones', null, {});
     await queryInterface.bulkDelete('escenarios', null, {});
     await queryInterface.bulkDelete('imagenes', {id: {[Op.in]: [10,11,12,13,14,20,21,22, 30]}}, {});

  }
};
