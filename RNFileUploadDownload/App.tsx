import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import Description from './src/components/Description';

import {
  base64,
  tmpFileNoExt,
  tmpFileWithExt,
  tmpFileUsingPath,
  iosOpenDocument,
  iosPreviewDocument,
  androidMediaScanner,
  androidDownloadManager,
  requestStorageWritePermission,
} from './src/rn-fetch-blob/download';

import {
  DropboxSingleUpload,
  DropboxMultipleUpload,
} from './src/rn-fetch-blob/upload';

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
          title="- tmp file using path"
          onPress={() => tmpFileUsingPath(imageLink)}
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
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>Upload</Text>
        <Description
          text={'- src/config/token 하위에 Dropbox 토큰 설정 후 이용하세요.'}
        />
        <TextButton
          title="- single file upload"
          onPress={() => DropboxSingleUpload()}
        />
        <Description
          text={
            '- multiple file upload는 형식만 참고하세요.\n- 드롭박스는 multipart/form data 업로드 지원 X'
          }
          containerStyle={{marginTop: 10}}
        />
        <TextButton
          title="- muliple file upload"
          onPress={() => DropboxMultipleUpload()}
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
