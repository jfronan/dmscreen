const initialState = {
    cambioMailInProgress: false,
    loadingImageInProgress: false,
    avatarUsuario: null
  };
  
const mapaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PERFIL_AVATAR_IN_PROGRESS':
    return {
        ...state,
        loadingImageInProgress: true
    };
    case 'GET_PERFIL_AVATAR_SUCCESS':
    return {
        ...state,
        avatarUsuario: action.payload.perfilAvatar,
        loadingImageInProgress: false
    };
    case 'GET_PERFIL_AVATAR_FAILURE':
    return {
        ...state,
        avatarUsuario: null,
        loadingImageInProgress: false
    };
    case 'FETCH_CAMBIO_MAIL_IN_PROGRESS':
    return {
        ...state,
        cambioMailInProgress: true
    };
    case 'POST_CAMBIO_MAIL_SUCCESS':
    return {
        ...state,
        cambioMailInProgress: false
    };
    case 'POST_CAMBIO_MAIL_FAILURE':
    return {
        ...state,
        cambioMailInProgress: false
    };

    default: return state;
  }
};

export default mapaReducer;
