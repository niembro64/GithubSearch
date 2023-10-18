import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';

const insetCalc = (insets: EdgeInsets) => ({
  paddingTop: Math.max(insets.top, 16),
  paddingBottom: Math.max(insets.bottom, 16),
  paddingLeft: Math.max(insets.left, 16),
  paddingRight: Math.max(insets.right, 16),
});

export const Home = () => {
  const insets = useSafeAreaInsets();

  const style = useMemo(() => insetCalc(insets), [insets]);

  const [inputValue, setInputValue] = useState<string>('');

  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    console.log('inputValue', inputValue);
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    console.log('debouncedValue', debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={style}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search GitHub repositories..."
        onChangeText={text => setInputValue(text)}
        value={inputValue}
      />
      <Text style={styles.paragraph}>{inputValue}</Text>
      <Text style={styles.paragraph}>{debouncedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
  },
  paragraph: {
    marginBottom: 16,
  },
});
