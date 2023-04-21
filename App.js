import React from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Button, SectionList, Text, Pressable } from 'react-native';

export default function App() {
  const [text, onChangeText] = React.useState('');

  return (
    <SafeAreaView style={styles.globalView}>
      <Text style={styles.appTitle}>CaContacs</Text>
      <Text style={styles.appSubtitle}>Sono memorizzati 69 contatti</Text>
      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          onChangeText={onChangeText}
          placeholder='Ricerca contatti...'
          value={text}
        />
        <Button
          title='Cerca'
          style={styles.searchButton}
          onPress={() => {alert(`premuto tasto ricerca con ${text}`)}}
        />
      </View>

      <View style={styles.contactsView}>
        <SectionList
          sections={[
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
          ]}
          renderItem={
            ({ item }) => (
              <Pressable onPress={() => {alert(`hai cliccato su ${item}`)}}>
                <Text style={styles.sectionItem}>{item}</Text>
              </Pressable>
            )
          }
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={item => `le-${item}`}
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
  searchButton: {
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

});
