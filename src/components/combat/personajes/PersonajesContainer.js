import Personajes from './Personajes';
import { connect } from 'react-redux';
import * as combatActions from '../../../actions/CombatScreenAction';

const mapStateToProps = state => {
  return {
    pcs: state.combat.listaPersonajes,
    bestiario: state.combat.bestiario
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarPersonajes: () => dispatch(combatActions.cargarPersonajes()),
    agregarAListaDeTurnos: ()=> {},
    mostrarDetalles: (nombre)=> {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Personajes);
