import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactList from './ContactList';
import AddContact from './AddContact';
import ViewEditContact from './ViewEditContact';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false
        }}>
        <Stack.Screen
          name="ContactList"
          component={ContactList}
          options={{ title: 'CaContatti' }}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContact}
          options={{ title: 'Aggiungi Contatto' }}
        />
        <Stack.Screen
          name="ViewEditContact"
          component={ViewEditContact}
          options={{ title: 'Visualizza Contatto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};