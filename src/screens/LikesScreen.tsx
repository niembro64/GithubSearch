// src/screens/LikesScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LikesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Likes Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LikesScreen;
