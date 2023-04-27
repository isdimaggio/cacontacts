import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, SectionList, Text, Pressable } from 'react-native';
import { getContactsList } from './Datastore';
import { useIsFocused } from '@react-navigation/native'
import CaAvatar from './CaAvatar';

const ContactList = ({ navigation }) => {
  // variabili di stato
  const [searchText, onChangeSearchText] = React.useState('');
  let [listData, onChangeListData] = React.useState([]);
  const [contactNumber, onChangeContactNumber] = React.useState(0);
  const isFocused = useIsFocused()

  // con useEffect (al load della pagina)
  React.useEffect(() => {
    // fai chiamata async al datastore
    getContactsList().then((value) => {
      // a dati ottenuti passali alla variabile di stato
      // e aggiorna il conteggio dei contatti
      onChangeListData(value);
      let count = 0;
      value.forEach((sub) => {
        sub.data.forEach(() => count++);
      })
      onChangeContactNumber(count);
    });
  }, [isFocused]);

  // rendering condizionale del conteggio (se non esistono contatti non renderizzarlo)
  const BottomMessage = (props) => {
    if (props.render) {
      return (<Text style={styles.appSubtitle}>Sono memorizzati {contactNumber} contatti</Text>)
    }
  }

  return (
    <SafeAreaView style={styles.globalView}>
      <View style={styles.searchView}>
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
            navigation.navigate('AddContact') // cambia pagina
          }}
        />
      </View>

      <View style={styles.contactsView}>
        <SectionList
          sections={listData}
          renderItem={
            ({ item }) => {
              // rendering condizionale sulla ricerca, se il testo include il
              // testo cercato (case insensitive)
              if (item.value.toLowerCase().includes(searchText.toLowerCase())) {
                return (
                  <Pressable style={styles.contactPressable} onPress={() => {
                    // quando viene cliccato item in lista cambia pagina
                    navigation.navigate('ViewEditContact', { uid: item.key })
                  }}>
                    <View style={styles.avatar}>
                      <CaAvatar
                        size={30}
                        uid={item.key}
                        name={item.value}
                      />
                    </View>
                    <Text style={styles.sectionItem}>{item.value}</Text>
                  </Pressable>
                )
              }
            }
          }
          renderSectionHeader={({ section }) => {
            // controlla se nella sezione c'è almeno un elemento da renderizzare
            let found = false;
            section.data.forEach((item) => {
              if (item.value.toLowerCase().includes(searchText.toLowerCase())) found = true;
            })
            // se c'è renderizza anche l'header di quella sezione (alfabetica)
            if (found) return (<Text style={styles.sectionHeader}>{section.title}</Text>)
          }}
          keyExtractor={item => item.key /* la key è item.key */ }
          ListHeaderComponent={() => {
            // se la lista di dati presa dal datastore è vuota
            if (listData.length == 0) {
              return (<Text style={styles.noResultFound}>Nessun contatto memorizzato</Text>)
            }
            // se effettivamente viene cercato qualcosa
            if (searchText != "") {
              let found = false;
              // controlla se ci sono elementi per quella ricerca nella lista del datastore
              listData.forEach((subsection) => {
                subsection.data.forEach((item) => {
                  if (item.value.toLowerCase().includes(searchText.toLowerCase())) found = true;
                })
              })
              // se non ce ne sono renderizza header con messaggio di not found
              if (!found) return (<Text style={styles.noResultFound}>Nessun risultato trovato</Text>)
            }
          }}
        />
      </View>
      <BottomMessage render={listData.length != 0}></BottomMessage>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 35,
  },
  contactPressable: {
    flexDirection: 'row',
    marginLeft: 8
  },
  avatar: {
    paddingTop: 6
  },
  appSubtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#bdbdbd'
  },
  globalView: {
    margin: 17,
    flexDirection: 'column',
  },
  searchInput: {
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    padding: 5,
    marginRight: 8,
    marginLeft: 8,
    flex: 2
  },
  createButton: {
    flex: 1,
  },
  searchView: {
    flexDirection: 'row',
  },
  contactsView: {
    paddingTop: 10,
    height: '91%'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    marginBottom: 7,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(235,235,235,1.0)',
  },
  sectionItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  noResultFound: {
    textAlign: 'center',
    marginTop: 7,
    color: 'gray'
  }

});

export default ContactList;
