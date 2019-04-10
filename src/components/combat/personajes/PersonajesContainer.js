import Personajes from './Personajes';
import { connect } from 'react-redux';
import * as combatActions from '../../../actions/CombatScreenAction';

const mapStateToProps = state => {
  return {
    pcs: state.combat.listaPersonajes,
    bestiario: state.combat.bestiario,
    mostrarSeleccion: state.combat.mostrandoFichaPJ,
    datosSeleccion: state.combat.fichaPJStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarPersonajes: () => dispatch(combatActions.cargarPersonajes()),
    agregarAListaDeTurnos: ()=> {},
    mostrarDetalles: (entidad, color)=> dispatch(combatActions.seleccionarPersonaje(entidad, color)),
    ocultarDetalles: ()=> dispatch(combatActions.ocultarDetallesPersonaje())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Personajes);
