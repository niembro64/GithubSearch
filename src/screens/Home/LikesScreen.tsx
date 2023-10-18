/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../colors';
import {spacing} from '../../styles';

const LikesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Likes Screen</Text>
      {/* ////////////////////////////////// */}
      {/* SEARCH BAR */}
      {/* ////////////////////////////////// */}
      <View
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: colors.palette.gray400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 0,
          padding: spacing.md,
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: spacing.md,
          }}>
          Liked Repositories
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.xl,
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              marginRight: spacing.md,
              backgroundColor: colors.palette.blue200,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: spacing.sm,
              padding: spacing.sm,
            }}
            // @ts-ignore
            onPress={() => navigation.navigate('Home')}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: colors.palette.blue600,
              }}>
              Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LikesScreen;
