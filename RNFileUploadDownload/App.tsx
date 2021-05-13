import React from 'react';
import {SafeAreaView, StyleSheet, Button, View, Text} from 'react-native';

import {
  base64,
  tmpFileNoExt,
  tmpFileWithExt,
  iosFileDownload,
  iosFileDownloadOpenDocument,
} from './src/rn-fetch-blob/download';

const App = () => {
  const imageLink =
    'https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg';
  const onBase64Download = () => base64(imageLink);
  const onTmpFileNoExtDownload = () => tmpFileNoExt(imageLink);
  const onTmpFileWithExtDownload = () => tmpFileWithExt(imageLink);

  const onIosFileDownload = () => iosFileDownload(imageLink);
  const onIosFileDownloadOpenDocument = () =>
    iosFileDownloadOpenDocument(imageLink);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Download</Text>
        <Button title="- base64 encoded string" onPress={onBase64Download} />
        <Button
          title="- tmp file with no extension"
          onPress={onTmpFileNoExtDownload}
        />
        <Button
          title="- tmp file with extension"
          onPress={onTmpFileWithExtDownload}
        />
        <Button
          title="- ios openDocument"
          onPress={onIosFileDownloadOpenDocument}
        />
        <Button title="- ios preview document" onPress={onIosFileDownload} />
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
