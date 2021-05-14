import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    padding: 5,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'blue',
    fontSize: 15,
  },
  platform: {
    padding: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    color: 'white',
    fontWeight: 'bold',
  },
  ios: {
    backgroundColor: 'red',
  },
  android: {
    backgroundColor: 'green',
  },
});
