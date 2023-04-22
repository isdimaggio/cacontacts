import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, SectionList, Text, Pressable } from 'react-native';
import { addContactToList, clearAllData, getContactData, getContactsList } from './Datastore';

const AddContact = ({ navigation }) => {

  const [searchText, onChangeSearchText] = React.useState('');

  return (
    <SafeAreaView style={styles.globalView}>
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeSearchText}
        placeholder='Ricerca contatti...'
        value={searchText}
      />
      <Button
        title='Nuovo'
        style={styles.createButton}
        onPress={() => {
          alert("questo pulsante è appena stato cliccato")
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalView: {
    margin: 17,
    flexDirection: 'column',
  },
});

export default AddContact;
