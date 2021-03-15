import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';

//target API endpoint - from where we need to pull the data from
const API_ENDPOINT = `https://randomuser.me/api/?seed=1&page=1&results=20`;

export default function App() {
  //state variables
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  //call the api API_ENDPOINT

  useEffect(() => {
    setIsLoading(true);
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(results => {
        setData(results);
        setIsLoading(false); // call is successful
      })
      .catch(err => {
        setIsLoading(false);
        setError(err); //call failed coz of an error
      });
  }, []);

  //loader icon functionality with "ActivityIndicator"

  if (isLoading) {
    //SCENARIO-2 LOADING - YET TO GET RESPONSE
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  //error handling on UI

  if (error) {
    //SCENARIO -3 ERROR
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Error fetching data.. check your connection or with backend engineer.
        </Text>
      </View>
    );
  }

  //UI components to get rendered
  return (
    //SCENARIO-1 SUCCESS RESPONSE AND DISPLAY DATA ON UI
    <View style={styles.container}>
      <Text style={styles.text}> Flat list example </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.first}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image source={{uri: item.picture.thumbnail}} />
            <View style={styles.metaInfo}>
              <Text style={styles.title}>
                {`${item.name.first} ${item.name.last} `}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

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
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
});