import { checkingCredentials, login, logout } from "./";
import { doLocalLogin, doLocalRegistration, signInWithGoogle } from "../../firebase/providers";

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

        if(!result.success) return dispatch(logout(result));

        dispatch(login(result));
    };
};

export const startLocalLogin = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await doLocalLogin({email, password});

        if(!result.success) return dispatch(logout(result));

        dispatch(login(result));
    };
};