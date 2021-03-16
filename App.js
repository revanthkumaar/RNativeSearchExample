import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_ENDPOINT = 'https://randomuser.me/api/?seed=1&page=1&results=20';

export default function App() {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [textInput, setTextInput] = useState('');

  // calling the API endpoint
  useEffect(() => {
    setIsLoading(true);
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => {
        setData(json.results);
        setIsLoading(false); // call is successful
      })
      .catch(err => {
        setIsLoading(false);
        setError(err); //call failed coz of an error
      });
  }, []);
  console.log(data);

  // loader icon functionality with ActivityIndicator
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#65d3a5" />
      </View>
    );
  }

  // error handling on UI
  if (error) {
    return (
      <View>
        <Text>
          Error fetching data. Check your data connection or with your backend
          engineer.
        </Text>
      </View>
    );
  }

  //UI component to render as a header of flatlist (search bar)

  function renderHeader(){
    return(
      <View>
        <Text>Search Bar Here!</Text>
      </View>
    )
  }


  // Entire UI components to be rendered
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Flat list example </Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={data}
        keyExtractor={(item, _index) => _index.toString()}
        ListHeaderComponent = {renderHeader}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              style={{borderRadius: 100}}
              source={{uri: item.picture.thumbnail, height: 60, width: 60}}
            />
            <Text
              style={{
                padding: 15,
                color: '#5b9477',
                fontSize: 15.6,
                letterSpacing: 1,
              }}>{`${item.name.first} ${item.name.last}`}</Text>
          </View>
        )}
      />
    </View>
  );
}

// mock data
/* const data = [
  {id: '1', title: 'first item'},
  {id: '2', title: 'second item'},
  {id: '3', title: 'third item'},
  {id: '4', title: 'four item'},
]; */

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    width: '100%',
    elevation: 2.2,
  },
  listItemText: {
    fontSize: 18,
  },
});
