/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreen';
import AddNoteScreen from './Screens/AddNoteScreen';
import UpdateNoteScreen from './Screens/UpdateNoteScreen';
const Stack = createStackNavigator();

const App = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
