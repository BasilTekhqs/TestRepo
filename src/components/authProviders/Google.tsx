import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {checkLoginData} from '../../backend/firestore-actions';
import {useLinkTo} from '@react-navigation/native';
import AuthButton from '../ui/auth-button';
import { Alert } from 'react-native';

function Google(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const link = useLinkTo();

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ['profile', 'email'],
        webClientId:
          '1032232973030-2ch9qtfq83md92g9tdk92nbo5n6nfp2u.apps.googleusercontent.com',
        // offlineAccess: true,
      });
    } catch (error) {
      Alert.alert(`Error ${error?.code}`, error?.message);
    }
  }, []);

  async function handleGoogle() {

    if (!loading) {
      setLoading(true);
      try {
        await GoogleSignin.hasPlayServices();
        const {idToken} = await GoogleSignin.signIn();
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const user = await auth().signInWithCredential(googleCredential);
        checkLoginData(user.user.uid, link);
      } catch (e) {
        setLoading(false);
        Alert.alert(`Error ${e?.code}`, e?.message);
      }
    }
  }

  return (
    <AuthButton
      iconName="google"
      title="Continue with Google"
      btnStyle={{backgroundColor: '#5686E9', width: '90%'}}
      onPress={() => handleGoogle()}
    />
  );
}
export default Google;
