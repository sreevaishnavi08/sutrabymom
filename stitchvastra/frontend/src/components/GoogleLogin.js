import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log('User signed in successfully');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={handleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
