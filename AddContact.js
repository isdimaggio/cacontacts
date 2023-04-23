import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button } from 'react-native';
import { addContactToList } from './Datastore';
import { DatePicker } from 'react-native-woodpicker'
import CaAvatar from './CaAvatar';

const AddContact = ({ navigation }) => {

  const [name, onChangeName] = React.useState('');
  const [birthday, onChangeBirthday] = React.useState();
  const [address, onChangeAddress] = React.useState('');
  const [phone, onChangePhone] = React.useState('');

  const handleBdText = () => birthday
    ? birthday.toDateString()
    : "Data di Nascita";

  const handleContactCreation = () => {
    // controllo validità dati
    if (name == "") {
      alert("Per favore, inserisci un nome");
      return;
    }

    if (phone == "") {
      alert("Per favore, inserisci un numero di telefono");
      return;
    }

    // registra dati in rubrica
    if (
      !addContactToList(name, birthday, address, phone)
    ) {
      alert("Impossibile creare il contatto, " + route.params.auid);
    } else {
      navigation.navigate('ContactList')
    }
  }

  return (
    <SafeAreaView style={styles.globalView}>

      <View style={styles.avatarView}>
        <CaAvatar size={100} name={name} uid={""} />
      </View>

      <TextInput
        style={styles.textInput}
        onChangeText={onChangeName}
        placeholder='Nome e cognome'
        value={name}
      />
      <DatePicker
        style={styles.textInput}
        value={birthday}
        onDateChange={onChangeBirthday}
        title="Data di nascita"
        text={handleBdText()}
        isNullable={false}
        iosDisplay="spinner"
        androidDisplay="spinner"
      />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeAddress}
        placeholder='Indirizzo'
        value={address}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangePhone}
        placeholder='Numero di telefono'
        value={phone}
        keyboardType='number-pad'
      />
      <View style={styles.spacer}></View>
      <Button
        title='Salva'
        style={styles.createButton}
        onPress={() => handleContactCreation()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalView: {
    margin: 17,
    flexDirection: 'column',
  },
  textInput: {
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 20,
  },
  spacer: {
    marginTop: 20
  },
  avatarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  }
});

export default AddContact;
