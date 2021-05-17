import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

type Props = {
  text: string;
  containerStyle?: ViewStyle;
};

export default function Description({text, containerStyle}: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'lightgray',
    width: '100%',
  },
});
