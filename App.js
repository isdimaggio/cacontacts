import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactList from './ContactList';
import AddContact from './AddContact';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ContactList"
          component={ContactList}
          options={{title: 'Lista Contatti'}}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContact}
          options={{title: 'Aggiungi Contatto'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};