import Turnos from './Turnos';
import { connect } from 'react-redux';
import * as combatActions from '../../../actions/CombatScreenAction';

const mapStateToProps = state => {
  return {
    listaTurnos: state.combat.listaTurnosParticipantes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modifyEntityValue: (realIndex, statKey, value) => dispatch(combatActions.modifyEntityValue(realIndex, statKey, value)),
    removeFromList: (realIndex) => dispatch(combatActions.removeFromTurnList(realIndex)),
    mostrarDetalles: (entidad, color)=> dispatch(combatActions.seleccionarPersonaje(entidad, color))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Turnos);
