import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import {ButtonProps} from './types';
import {styles} from './styles';

export default function TextButton({onPress, title}: ButtonProps) {
  const test = title.match(/(\bios\b)?(\bandroid\b)?/g);

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        {`${title.replace(/(\bios\b)?(\bandroid\b)?/g, '')}  `}
      </Text>
      {test && test[2] !== '' ? (
        <Text
          style={[
            styles.platform,
            test[2] === 'ios' ? styles.ios : styles.android,
          ]}>
          {test[2]}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}
