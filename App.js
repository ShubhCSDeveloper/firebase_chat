import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Platform, View, Text, Alert } from 'react-native';



const App= () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
    messaging()
      .getToken()
      .then(token => {
        console.log( `token:${token}`);
       
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe;
      
  }, []);
  return (
   <View>
     <Text>hi</Text>
     </View>
  );
};



export default App;
