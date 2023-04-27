import React from 'react';
import { StyleSheet, Text, TextInput, SafeAreaView, View, Button } from 'react-native';
import { editContact, getContactData, deleteContact } from './Datastore';
import { DatePicker } from 'react-native-woodpicker'
import CaAvatar from './CaAvatar';


const ViewEditContact = ({ navigation, route }) => {

  const [name, onChangeName] = React.useState('');
  const [birthday, onChangeBirthday] = React.useState();
  const [address, onChangeAddress] = React.useState('');
  const [phone, onChangePhone] = React.useState('');

  const handleBdText = () => birthday
    ? birthday.toDateString()
    : "Data di Nascita";

  // al load della pagina (useEffect) fa richiesta async al datastore per quella key
  // e riempie tutti i campi con le variabili di stato
  React.useEffect(() => {
    getContactData(route.params.uid).then((value) => {
      onChangeName(value.name);
      onChangeBirthday(value.birthday ? new Date(value.birthday) : "");
      onChangeAddress(value.address);
      onChangePhone(value.phone);
    });
  }, []);

  const handleContactEdit = () => {
    // controllo validità dati
    if (name == ""){
      alert("Per favore, inserisci un nome");
      return;
    }

    if (phone == ""){
      alert("Per favore, inserisci un numero di telefono");
      return;
    }

    // registra dati in rubrica
    if(
      !editContact(route.params.uid, name, birthday, address, phone)
    ){
      alert("Impossibile modificare il contatto");
    }else{
      navigation.navigate('ContactList')
    }

  }

  const handleContactDeletion = () => {
    if(
      !deleteContact(route.params.uid)
    ){
      alert("Impossibile eliminare il contatto");
    }else{
      navigation.navigate('ContactList')
    }
  }

  return (
    <SafeAreaView style={styles.globalView}>

      <View style={styles.avatarView}>   
        <CaAvatar size={100} name={name} uid={route.params.uid}/>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.fieldDescription}>Nome:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeName}
          placeholder='Nome e cognome'
          value={name}
        />

        <Text style={styles.fieldDescription}>Data di nascita:</Text>
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

        <Text style={styles.fieldDescription}>Indirizzo:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeAddress}
          placeholder='Indirizzo'
          value={address}
        />

        <Text style={styles.fieldDescription}>Numero di telefono:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePhone}
          placeholder='Numero di telefono'
          value={phone}
          keyboardType='number-pad'
        />

        <View style={styles.spacer}></View>
        <View style={styles.buttonRow}>
          <Button
            title="Salva"
            onPress={() => handleContactEdit()}
          />
          <Button
            title="Elimina"
            color="#ff0000"
            onPress={() => handleContactDeletion()}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.bottomIdentifier}>{route.params.uid}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  globalView: {
    margin: 17,
    flexDirection: 'column',
    flex: 1
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },
  textInput: {
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 0,
  },
  spacer: {
    marginTop: 25
  },
  fieldDescription: {
    marginLeft: 12,
    marginTop: 20
  },
  bottomIdentifier: {
    textAlign: 'center',
    color: '#bdbdbd'
  },
  contentContainer: {
    flex: 1  // footer a fine schermo
  },
  footer: {
      height: 20
  },
  avatarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  }
});

export default ViewEditContact;
