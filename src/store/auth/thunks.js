import { checkingCredentials, login, logout } from "./";
import { signInWithGoogle } from "../../firebase/providers";

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