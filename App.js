import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, SectionList, Text, Pressable } from 'react-native';

export default function App() {
  const [searchText, onChangeSearchText] = React.useState('');

  // dati falsi "pre-fetch"
  const DATA = [
    {
      title: 'A',
      data: ['Antonia', 'Ada', 'Alessio']
    },
    {
      title: 'C',
      data: ['Carlo', 'Cacone']
    },
    {
      title: 'P',
      data: [
        'Prof. Chiumento',
        'Prof. De Bonis',
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.globalView}>
      <Text style={styles.appTitle}>CaContacs</Text>
      <Text style={styles.appSubtitle}>Sono memorizzati 69 contatti</Text>
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
          onPress={() => { alert(`premuto tasto ricerca con ${text}`) }}
        />
      </View>

      <View style={styles.contactsView}>
        <SectionList
          sections={DATA}
          renderItem={
            ({ item }) => {
              if (item.toLowerCase().includes(searchText.toLowerCase())) {
                return (
                  <Pressable onPress={() => { alert(`hai cliccato su ${item}`) }}>
                    <Text style={styles.sectionItem}>{item}</Text>
                  </Pressable>
                )
              }
            }
          }
          renderSectionHeader={({ section }) => {
            let found = false;
            section.data.forEach((item) => {
              if (item.toLowerCase().includes(searchText.toLowerCase())) found = true;
            })
            if (found) return (<Text style={styles.sectionHeader}>{section.title}</Text>)
          }}
          keyExtractor={item => `le-${item}`}
          ListHeaderComponent={() => {
            if (searchText != "") {
              let found = false;
              DATA.forEach((subsection) => {
                  subsection.data.forEach((item) => {
                    if (item.toLowerCase().includes(searchText.toLowerCase())) found = true;
                  })
              })
              if(!found) return (<Text style={styles.noResultFound}>Nessun risultato trovato</Text>)
            }
          }}
        />
      </View>
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
