import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, SectionList, Text, Pressable } from 'react-native';
import { addContactToList, clearAllData, getContactData, getContactsList } from './Datastore';

const ContactList = ({ navigation }) => {
  const [searchText, onChangeSearchText] = React.useState('');
  let [listData, onChangeListData] = React.useState([]);

  getContactsList().then((value) => {
    onChangeListData(value)
  });

  const BottomMessage = (props) => {
    if(props.render){
      return(<Text style={styles.appSubtitle}>Sono memorizzati {listData.length} contatti</Text>)
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
            navigation.navigate('AddContact')
          }}
        />
      </View>

      <View style={styles.contactsView}>
        <SectionList
          sections={listData}
          renderItem={
            ({ item }) => {
              if (item.value.toLowerCase().includes(searchText.toLowerCase())) {
                return (
                  <Pressable onPress={() => { alert(`hai cliccato su ${item.key}`) }}>
                    <Text style={styles.sectionItem}>{item.value}</Text>
                  </Pressable>
                )
              }
            }
          }
          renderSectionHeader={({ section }) => {
            let found = false;
            section.data.forEach((item) => {
              if (item.value.toLowerCase().includes(searchText.toLowerCase())) found = true;
            })
            if (found) return (<Text style={styles.sectionHeader}>{section.title}</Text>)
          }}
          keyExtractor={item => item.key}
          ListHeaderComponent={() => {
            if (listData.length == 0) {
              return(<Text style={styles.noResultFound}>Nessun contatto memorizzato</Text>)
            }
            if (searchText != "") {
              let found = false;
              listData.forEach((subsection) => {
                subsection.data.forEach((item) => {
                  if (item.value.toLowerCase().includes(searchText.toLowerCase())) found = true;
                })
              })
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
  appSubtitle: {
    textAlign: 'center',
    marginBottom: 30,
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
    height: '90%'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
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
