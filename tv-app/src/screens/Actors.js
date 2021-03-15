import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";

export default function ActorsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("Smith"); // step 5??????  numbering error in activity   ??????????????????????????
  const [actors, setActors] = useState(); // activity numbering errors - is this in correct place?   ??????????????????????????????

  const searchActors = () => {
    console.log(
      "Make a call to the API using the search query: " + searchQuery
    );
    fetch("http://api.tvmaze.com/search/people?q=" + searchQuery)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setActors(json["results"]); // is this correct positioning?????????????????????
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    searchActors();
  }, [searchQuery]);

  return (
    <View style={styles.ActorsScreen}>
      {actors ? (
        <View style={styles.resultsContainer}>
          <FlatList
            data={actors}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ActorsScreen: {
    /* styles here */
  },
  loadingContainer: {
    /* styles here */
    height: "100%",
    justifyContent: "center",
  },
});