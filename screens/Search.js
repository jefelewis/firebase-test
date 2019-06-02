// Imports: Dependencies
import React, { Component } from 'react';
import { Button, Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { database } from '../App';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// Screen: Search
class Search extends Component {
  constructor (props) {
    super(props);

    this.state = {
      location: null,
      errorMessage: null,
      isLocationModalVisible: false,
      nearbyLocations: null,
    };
  }

  // Get Data
  getData = async () => {
    try {
      // Cloud Firestore Collection: Users
      database.collection('users')
        .where('occupation', '==', 'Teacher')
        .limit(2)
        .get()
        .then((querySnapshot) => {
          // Iterate Through Query Data
            querySnapshot.docs.forEach((document) => {
              // Display Retrieved Data To Console
              console.log(document.data());
              // Entire Query Snapshot. Uncomment The Next Line To View
              console.log(querySnapshot);
            });
        })
        .catch((error) => {
          console.log(`Error getting documents: ${error}`);
        });
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button title="Search" onPress={this.getData} />
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Exports
export default Search;