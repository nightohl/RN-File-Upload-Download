import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  Text,
  PermissionsAndroid,
} from 'react-native';

import {
  base64,
  tmpFileNoExt,
  tmpFileWithExt,
  iosFileDownload,
  iosFileDownloadOpenDocument,
  androidMediaScanner,
  androidDownloadManager,
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

  const onAndroidMediaScanner = () => androidMediaScanner(imageLink);
  const onAndroidDownloadManager = () => androidDownloadManager(imageLink);

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
        <Button
          title="- android media scanner"
          onPress={onAndroidMediaScanner}
        />
        <Button
          title="- android DownloadManager"
          onPress={onAndroidDownloadManager}
        />
        <Button
          title="- request external storage write permission"
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

const requestStorageWritePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write External Storage Permission!',
        message: 'I need this permission.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can write external storage now.');
    } else {
      console.log('External Write Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default App;
