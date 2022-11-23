'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('actividadesDisponibles' ,'permanenciaVisual'  , {type: Sequelize.INTEGER, allowNull: true}),
      queryInterface.addColumn('actividadesDisponibles' ,'estimuloAuditivoId' , {type: Sequelize.INTEGER, allowNull: true}),
      queryInterface.addColumn('productos'              ,'hayAyudaSonora'     , {type: Sequelize.INTEGER, allowNull: true}),
      queryInterface.addColumn('productos'              ,'ayudaSonoraId'      , {type: Sequelize.INTEGER, allowNull: true}),
      queryInterface.addColumn('productos'              ,'permanenciaVisual'  , {type: Sequelize.BOOLEAN, allowNull: true}),
      queryInterface.addColumn('recorridos'             ,'giroInicial'        , {type: Sequelize.INTEGER, allowNull: true}),
      queryInterface.addColumn('resultadosComprarProductos','cuando'          , {type: Sequelize.INTEGER, allowNull: true}),
      queryInterface.addColumn('resultadosComprarProductos','productoId'      , {type: Sequelize.INTEGER, allowNull: true})
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
