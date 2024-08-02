/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import AddNoteScreen from './Screens/AddNoteScreen';
import UpdateNoteScreen from './Screens/UpdateNoteScreen';
import ToDoListScreen from './Screens/ToDoListScreen';
import PushNotification from 'react-native-push-notification';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Request notification permissions
    PushNotification.requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          title: 'NOTE APP',
          headerStyle: {
          backgroundColor: '#90ee90',
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
         }} />

        <Stack.Screen
        name="Add Note"
        component={AddNoteScreen}
        options={{
          title: 'Add Note',
          headerStyle: {
          backgroundColor: '#90ee90',
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
         }}
        />

        { <Stack.Screen
          name="Update Note"
          component={UpdateNoteScreen}
          options={{
            title: 'Update Note',
            headerStyle: {
              backgroundColor: '#90ee90',
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        /> }

          { <Stack.Screen
          name="ToDo List"
          component={ToDoListScreen}
          options={{
            title: 'ToDo List',
            headerStyle: {
              backgroundColor: '#90ee90',
            },
            headerTintColor: 'black',
            headerTitleAlign: 'center',
          }}
        /> }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
