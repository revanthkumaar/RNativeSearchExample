import {StyleSheet, Text, View, FlatList} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Flat list example </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const data = [
  {id: '1', title: 'first item'},
  {id: '2', title: 'second item'},
  {id: '3', title: 'third item'},
  {id: '4', title: 'four item'},
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  listItemText: {
    fontSize: 18
  }
});

