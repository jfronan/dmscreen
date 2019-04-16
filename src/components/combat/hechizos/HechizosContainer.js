import Hechizos from './Hechizos';
import { connect } from 'react-redux';
import * as combatActions from '../../../actions/CombatScreenAction';

const mapStateToProps = state => {
  return {
    hechizos: state.combat.hechizos,
    mostrarSeleccion: state.combat.mostrandoFichaHechizo,
    datosSeleccion: state.combat.fichaHechizoStats,
    pjDeListaActual: state.combat.fichaPJStats.entidad,
    listaDeTurnos: state.combat.listaTurnosParticipantes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarHechizos: () => dispatch(combatActions.cargarHechizos()),
    mostrarDetalles: (hechizo, color)=> dispatch(combatActions.seleccionarHechizo(hechizo, color)),
    ocultarDetalles: ()=> dispatch(combatActions.ocultarDetallesHechizo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hechizos);
