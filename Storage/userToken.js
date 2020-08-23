import { AsyncStorage } from 'react-native';

const getUserToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userToken')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export {
  getUserToken
}