import { 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup, 
    updateProfile
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            success: true,
            displayName, email, photoURL, uid
        };
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            success: false,
            errorMessage
        };
    }
};

export const doLocalRegistration = async ({email, password, displayName}) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = result.user;

        await updateProfile(FirebaseAuth.currentUser, { displayName, photoURL });

        return {
            success: true,
            uid, photoURL, email, displayName
        };
    } catch(error) {
        return {
            success: false,
            errorMessage: error.message
        };
    }
};

export const doLocalLogin = async ({email, password}) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = result.user;

        return {
            success: true,
            uid, photoURL, email, displayName
        };
    } catch(error) {
        return {
            success: false,
            errorMessage: error.message
        };
    }
};