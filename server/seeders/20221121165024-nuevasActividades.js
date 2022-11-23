'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('imagenes', [
      {id: 200, nombreArchivo: 'aceitef30.png'},
      {id: 201, nombreArchivo: 'aceitef50.png'},
      {id: 202, nombreArchivo: 'aceitef50e.png'},
      {id: 203, nombreArchivo: 'aceitef50plus.png'},
      {id: 204, nombreArchivo: 'martillo1.png'},
      {id: 205, nombreArchivo: 'martillo2.png'}, 
      {id: 206, nombreArchivo: 'martillo3.png'},
      {id: 207, nombreArchivo: 'ramo1.png'}, 
      {id: 208, nombreArchivo: 'ramo2.png'}, 
      {id: 209, nombreArchivo: 'ramo3.png'},
      {id: 210, nombreArchivo: 'harina1.png'},
      {id: 211, nombreArchivo: 'harina2.png'},
      {id: 212, nombreArchivo: 'harina3.png'},
      {id: 213, nombreArchivo: 'suelo1.png'},
      {id: 214, nombreArchivo: 'colision1.png'},
      {id: 215, nombreArchivo: 'ciudadBsAs.jpg'},
      {id: 216, nombreArchivo: '100.mp3'},
      {id: 217, nombreArchivo: '120.mp3'},
      {id: 218, nombreArchivo: '320.mp3'},
      {id: 219, nombreArchivo: 'ayudaSonora.mp3'},
      {id: 220, nombreArchivo: 'textoMenorPrecioMartillo.mp3'},
      {id: 221, nombreArchivo: 'textoMenorPrecioRamillete.mp3'},
      {id: 222, nombreArchivo: 'textoMenorPrecioHarina.mp3'}
    ], {});

    await queryInterface.bulkInsert('escenarios', [
      {id: 10, nombre: 'CABA',sueloPlanoId: 213, sueloColisionId: 214, fondoId: 215, descripcion: 'Paseamos por la ciudad Autonoma de Buenos Aires'}
    ], {});    

    await queryInterface.bulkInsert('recorridos', [
      {id: 10, xInicial:  18 , yInicial: 10, xAFinal:160, yAFinal:252, xBFinal:170, yBFinal:257, puntaje: 400, giroInicial: 180},
      {id: 11, xInicial: 256 , yInicial:144, xAFinal:335, yAFinal:27 , xBFinal:342, yBFinal: 34, puntaje: 400, giroInicial: 180},
      {id: 12, xInicial: 340 , yInicial: 42, xAFinal: 50, yAFinal:261, xBFinal: 60, yBFinal:287, puntaje: 400, giroInicial:  90},
      {id: 13, xInicial: 227 , yInicial:288, xAFinal: 68, yAFinal: 93, xBFinal: 70, yBFinal: 98, puntaje: 400, giroInicial:  90}
    ], {}); 
    
    await queryInterface.bulkInsert('actividadesDisponibles', [
      {id: 10, nombre: 'Menor precio LUBRICANTE YPF', estimuloVisual: 'En esta actividad debe seleccionar el ACEITE de menor precio',
        estimuloAuditivoId: 219, puntosAOtorgar: 200, timpoMaximoResolucion: 120, dificultad:'bajo', permanenciaVisual: 5,
        detalle:'', recorridoId: 10, escenarioId: 10, detalle: 'Tendras que llegar a la estacion de servicio y adquirir el lubricante de menor precio'},
      {id: 11, nombre: 'Menor precio MARTILLO', estimuloVisual: 'En esta actividad debe seleccionar el MARTILLO de menor precio',
        estimuloAuditivoId: 220, puntosAOtorgar: 300, timpoMaximoResolucion: 120, dificultad:'bajo', permanenciaVisual: 5,
        detalle:'', recorridoId: 11, escenarioId: 10, detalle: 'A comprar un martillo economico para reparar la mesa'},
      {id: 12, nombre: 'Menor precio FLORES', estimuloVisual: 'En esta actividad debe seleccionar el RAMILLETE FLORAL de menor precio',
        estimuloAuditivoId: 221, puntosAOtorgar: 400, timpoMaximoResolucion: 120, dificultad:'bajo', permanenciaVisual: 5,
        detalle:'', recorridoId: 12, escenarioId: 10, detalle: 'Una fecha especial, compra el ramillete de menor precio'},
      {id: 13, nombre: 'Menor precio HARINA', estimuloVisual: 'En esta actividad debe seleccionar el PAQUETE DE HARINA de menor precio',
        estimuloAuditivoId: 222, puntosAOtorgar: 500, timpoMaximoResolucion: 120, dificultad:'bajo', permanenciaVisual: 5,
        detalle:'', recorridoId: 13, escenarioId: 10, detalle: 'Para preparar unas tortas fritas, necesitas harina. Consigue la mas barata!'}
    
    ], {}); 

    await queryInterface.bulkInsert('comprarProductos', [
      {id:10, actividadId: 10, cantidadItems:3,estimuloAuditivo:true,estimuloVisual:true},
      {id:11, actividadId: 11, cantidadItems:3,estimuloAuditivo:true,estimuloVisual:true},
      {id:12, actividadId: 12, cantidadItems:3,estimuloAuditivo:true,estimuloVisual:true},
      {id:13, actividadId: 13, cantidadItems:3,estimuloAuditivo:true,estimuloVisual:true}
    ], {}); 

    await queryInterface.bulkInsert('productos', [
      {id:10, comprarProductoId:10, nombre:'aceite F30',     precio:100.00, imagenId: 200, ayudaSonoraId: 216, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:11, comprarProductoId:10, nombre:'aceite F50plus', precio:120.00, imagenId: 203, ayudaSonoraId: 217, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:12, comprarProductoId:10, nombre:'aceite F50',     precio:320.00, imagenId: 201, ayudaSonoraId: 218, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:13, comprarProductoId:11, nombre:'martillo1',      precio:100.00, imagenId: 204, ayudaSonoraId: 216, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:14, comprarProductoId:11, nombre:'martillo2',      precio:120.00, imagenId: 205, ayudaSonoraId: 217, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:15, comprarProductoId:11, nombre:'martillo3',      precio:320.00, imagenId: 206, ayudaSonoraId: 218, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:16, comprarProductoId:12, nombre:'ramillete1',     precio:100.00, imagenId: 207, ayudaSonoraId: 216, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:17, comprarProductoId:12, nombre:'ramillete2',     precio:120.00, imagenId: 208, ayudaSonoraId: 217, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:18, comprarProductoId:12, nombre:'ramillete3',     precio:320.00, imagenId: 209, ayudaSonoraId: 218, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:19, comprarProductoId:13, nombre:'paq.harina1',    precio:100.00, imagenId: 210, ayudaSonoraId: 216, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:20, comprarProductoId:13, nombre:'paq.harina2',    precio:120.00, imagenId: 211, ayudaSonoraId: 217, hayAyudaSonora: true, permanenciaVisual: 5},
      {id:21, comprarProductoId:13, nombre:'paq.harina3',    precio:320.00, imagenId: 212, ayudaSonoraId: 218, hayAyudaSonora: true, permanenciaVisual: 5}
    ], {}); 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
