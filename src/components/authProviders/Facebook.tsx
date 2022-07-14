/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {FirebaseError} from '@firebase/util';
import {useLinkTo} from '@react-navigation/native';

import AuthButton from '../ui/auth-button';
import {checkLoginData} from '../../backend/firestore-actions';

function Facebook({}): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const link = useLinkTo();

  async function handleFacebook() {
    if (!loading) {
      setLoading(true);

      try {
        const {isCancelled} = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);
        if (isCancelled) {
          console.log('is canceled ');
        } else {
          const result = await AccessToken.getCurrentAccessToken();
          if (!result) {
            throw new Error();
          }
          const {accessToken} = result;
          const credential = auth.FacebookAuthProvider.credential(accessToken);
          const user = await auth().signInWithCredential(credential);
          checkLoginData(user.user.uid, link);
        }
      } catch (error) {
        setLoading(false);
        return console.log(error);
      }
    }
  }

  return (
    <AuthButton
      iconName="facebook-square"
      title="Continue with Facebook"
      btnStyle={{backgroundColor: '#D1D1D6', width: '90%'}}
      onPress={() => handleFacebook()}
    />
  );
}

export default Facebook;
