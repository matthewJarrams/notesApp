import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

const uiConfig = {
	callbacks: {
	  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
		// User successfully signed in.
		// Return type determines whether we continue the redirect automatically
		// or whether we leave that to developer to handle.
		return true;
	  },
	  uiShown: function() {
		// The widget is rendered.
		// Hide the loader.
		//document.getElementById('loader').style.display = 'none';
	  }
	},
	// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
	signInFlow: 'popup',
	signInSuccessUrl: '/',
	signInOptions: [
	  // Leave the lines as is for the providers you want to offer your users.
	  GoogleAuthProvider.PROVIDER_ID,
	  EmailAuthProvider.PROVIDER_ID,
	],
	// Terms of service url.
	tosUrl: '<your-tos-url>',
	// Privacy policy url.
	privacyPolicyUrl: '<your-privacy-policy-url>'
};

const ui = new firebaseui.auth.AuthUI(auth);

export const FirebaseSignIn = () => {

	useEffect(() => {
		ui.start('#firebaseui-auth-container', uiConfig);
	}, []);

	return(
		<div id='firebaseui-auth-container'></div>
	)
}

