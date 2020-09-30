//State inicial
const stateInicial = {
  user: null,
};

//Types
const INICIO_SESION_EXITO = "INICIO_SESION_EXITO";
const INICIO_SESION_ERROR = "INICIO_SESION_ERROR";
const REGISTRAR_USUARIO_EXITO = "REGISTRAR_USUARIO_EXITO";
const REGISTRAR_USUARIO_ERROR = "REGISTRAR_USUARIO_ERROR";

//Reducer
export default function reducer(state = stateInicial, action) {
  switch (action.type) {
    case INICIO_SESION_ERROR:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}

//Actions

export const iniciarSesionAction = () => async (dispatch, getState) => {
  try {
    console.log("HOla");
  } catch (error) {
    console.log(error);
  }
};
