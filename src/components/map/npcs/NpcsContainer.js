import Npcs from './Npcs';
import { connect } from 'react-redux';
import * as mapActions from '../../../actions/MapScreenAction';

const mapStateToProps = state => {
  return {
    actualTreePath: state.map.actualTreePath,
    urlDetallesNPC: state.map.detalleNPC,
    mostrandoDatos: state.map.mostrandoDatosNPC,
    nombreDetalleNPC: state.map.nombreDetalleNPC,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mostrarDetallesNPC: (npcName) => dispatch(mapActions.mostrarDetallesNPC(npcName)),
    ocultarDetallesNPC: () => dispatch(mapActions.ocultarDetallesNPC())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Npcs);
