import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {
  base64,
  tmpFileNoExt,
  tmpFileWithExt,
  iosFileDownload,
  iosFileDownloadOpenDocument,
  androidMediaScanner,
  androidDownloadManager,
  requestStorageWritePermission,
} from './src/rn-fetch-blob/download';

import TextButton from './src/components/TextButton';

const App = () => {
  const imageLink =
    'https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg';
  const onBase64Download = () => base64(imageLink);
  const onTmpFileNoExtDownload = () => tmpFileNoExt(imageLink);
  const onTmpFileWithExtDownload = () => tmpFileWithExt(imageLink);

  const onIosFileDownload = () => iosFileDownload(imageLink);
  const onIosFileDownloadOpenDocument = () =>
    iosFileDownloadOpenDocument(imageLink);

  const onAndroidMediaScanner = () => androidMediaScanner(imageLink);
  const onAndroidDownloadManager = () => androidDownloadManager(imageLink);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Download</Text>
        <TextButton
          title="- base64 encoded string"
          onPress={onBase64Download}
        />
        <TextButton
          title="- tmp file with no extension"
          onPress={onTmpFileNoExtDownload}
        />
        <TextButton
          title="- tmp file with extension"
          onPress={onTmpFileWithExtDownload}
        />
        <TextButton
          title="- ios openDocument"
          onPress={onIosFileDownloadOpenDocument}
        />
        <TextButton
          title="- ios preview document"
          onPress={onIosFileDownload}
        />
        <TextButton
          title="- android media scanner"
          onPress={onAndroidMediaScanner}
        />
        <TextButton
          title="- android DownloadManager"
          onPress={onAndroidDownloadManager}
        />
        <TextButton
          title="- android storage write permission"
          onPress={requestStorageWritePermission}
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
