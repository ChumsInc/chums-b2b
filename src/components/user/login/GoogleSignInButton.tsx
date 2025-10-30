import React from 'react';
import {signInWithGoogle} from "@/ducks/user/actions";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {type CredentialResponse, GoogleLogin} from "@react-oauth/google";
import {selectAppNonce} from "@/ducks/app/selectors";

const GoogleSignInButton = () => {
    const dispatch = useAppDispatch();
    const nonce = useAppSelector(selectAppNonce);

    const handleGoogleResponse = (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            dispatch(signInWithGoogle(credentialResponse.credential));
        }
    }

    return (
        <GoogleLogin onSuccess={handleGoogleResponse} use_fedcm_for_prompt={true} nonce={nonce ?? undefined}/>
    )
}

GoogleSignInButton.displayName = 'GoogleSignInButton';
export default GoogleSignInButton;
