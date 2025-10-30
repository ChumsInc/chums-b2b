import React from 'react';
import {signInWithGoogle} from "@/ducks/user/actions";
import {useAppDispatch} from "@/app/configureStore";
import {type CredentialResponse, useGoogleOneTapLogin,} from "@react-oauth/google";

export default function GoogleSignInOneTap({onDone}: { onDone?: () => void }) {
    const dispatch = useAppDispatch();

    const successHandler = (credentialResponse: CredentialResponse) => {
        if (credentialResponse?.credential) {
            dispatch(signInWithGoogle(credentialResponse.credential));
        }
        if (onDone) {
            onDone();
        }
    }

    const errorHandler = () => {
        if (onDone) {
            onDone();
        }
    }

    // if (loggedIn) {
    //     return null;
    // }

    useGoogleOneTapLogin({
        onSuccess: successHandler,
        onError: errorHandler,
        use_fedcm_for_prompt: true,
    })

    return (
        <span data-logged-in={false}/>
    )
}
