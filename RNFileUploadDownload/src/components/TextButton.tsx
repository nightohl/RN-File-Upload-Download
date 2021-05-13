import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function TextButton({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={{padding: 5}}>
      <Text style={{color: 'blue', fontSize: 15}}>{title}</Text>
    </TouchableOpacity>
  );
}
