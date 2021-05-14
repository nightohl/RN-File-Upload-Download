import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {
  base64,
  tmpFileNoExt,
  tmpFileWithExt,
  iosOpenDocument,
  iosPreviewDocument,
  androidMediaScanner,
  androidDownloadManager,
  requestStorageWritePermission,
} from './src/rn-fetch-blob/download';

import TextButton from './src/components/TextButton';

const App = () => {
  const imageLink =
    'https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg';

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Download</Text>
        <TextButton
          title="- base64 encoded string"
          onPress={() => base64(imageLink)}
        />
        <TextButton
          title="- tmp file with no extension"
          onPress={() => tmpFileNoExt(imageLink)}
        />
        <TextButton
          title="- tmp file with extension"
          onPress={() => tmpFileWithExt(imageLink)}
        />
        <TextButton
          title="- ios openDocument"
          onPress={() => iosOpenDocument(imageLink)}
        />
        <TextButton
          title="- ios preview document"
          onPress={() => iosPreviewDocument(imageLink)}
        />
        <TextButton
          title="- android media scanner"
          onPress={() => androidMediaScanner(imageLink)}
        />
        <TextButton
          title="- android DownloadManager"
          onPress={() => androidDownloadManager(imageLink)}
        />
        <TextButton
          title="- android storage write permission"
          onPress={() => requestStorageWritePermission}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 30,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    padding: 10,
  },
});

export default App;
