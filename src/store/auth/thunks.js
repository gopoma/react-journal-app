import { checkingCredentials, login, logout } from "./";
import { doLocalRegistration, signInWithGoogle } from "../../firebase/providers";

export const startLocalSignIn = (email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if(!result.success) return dispatch(logout(result));

        dispatch(login(result));
    };
};

export const startLocalRegistration = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await doLocalRegistration({email, password, displayName});

        console.log(result);
        if(!result.success) return dispatch(logout(result));

        dispatch(login(result));
    };
};