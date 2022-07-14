import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './auth-navigator';
import App from './tab-navigaor';
import {useDispatch} from 'react-redux';
import {getUserDoc, saveTokenToDatabase} from '../backend/firestore-actions';
import {loggedInUser} from '../redux/actions/userActions';
import auth from '@react-native-firebase/auth';
import {usePushNotifications} from '../backend/notifications-controller';

const MainStack = createStackNavigator();

const MainApp = () => {
  const [listenUser, setListenUser] = useState(false);

  const dispatch = useDispatch();
  const {token} = usePushNotifications();

  useEffect(() => {
    const authListener = auth().onAuthStateChanged(async (user: any) => {
      try {
        setListenUser(true);
        const userId = await getUserDoc(user.uid);

        if (token) {
          await saveTokenToDatabase(token, user.uid);
        }
        if (userId) {
          dispatch(loggedInUser(userId));
        } else {
          dispatch(
            loggedInUser({
              userId: user.uid,
              email: user.email,
              createdAt: user.metadata?.creationTime,
            }),
          );
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      if (authListener) {
        authListener();
      }
    };
  }, [listenUser]);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Auth"
      >
        <MainStack.Screen name={'Auth'} component={Auth} />
        <MainStack.Screen name={'App'} component={App} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default MainApp;
