/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Platform} from 'react-native';
import {FirebaseError} from '@firebase/util';
import auth from '@react-native-firebase/auth';
import appleAuth, {
  AppleRequestOperation,
  AppleRequestScope,
} from '@invertase/react-native-apple-authentication';
import AuthButton from '../ui/auth-button';

function Apple(): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  if (Platform.OS !== 'ios') {
    return null;
  }

  async function handleApple() {
    if (!loading) {
      setLoading(true);
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleRequestOperation.LOGIN,
          requestedScopes: [
            AppleRequestScope.EMAIL,
            AppleRequestScope.FULL_NAME,
          ],
        });
        const {identityToken, nonce} = appleAuthRequestResponse;
        if (identityToken) {
          const credential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce,
          );
          await auth().signInWithCredential(credential);
        }
      } catch (e) {
        setLoading(false);
        const error = e as FirebaseError;
      }
    }
  }
  return (
    <AuthButton
      iconName="apple-alt"
      title="Continue with Apple"
      btnStyle={{backgroundColor: '#5890FF', width: '90%'}}
      onPress={() => handleApple()}
    />
  );
}

export default Apple;
