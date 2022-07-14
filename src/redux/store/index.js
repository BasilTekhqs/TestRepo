import {createStore} from 'redux';
import {allReducers} from '../reducers/index';
import AsyncStorage from '@react-native-community/async-storage';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = AsyncStorage.getItem('state');
    if (serializedState == null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const savedState = loadFromLocalStorage();

const store = createStore(allReducers, savedState);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
