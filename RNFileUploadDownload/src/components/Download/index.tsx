import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {DownloadProps} from './types';
import * as download from '../../rn-fetch-blob/download';
import TextButton from '../TextButton';

export default function Download({link}: DownloadProps) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.title}>Download</Text>
      <TextButton
        title="- base64 encoded string"
        onPress={() => download.base64(link)}
      />
      <TextButton
        title="- tmp file with no extension"
        onPress={() => download.tmpFileNoExt(link)}
      />
      <TextButton
        title="- tmp file with extension"
        onPress={() => download.tmpFileWithExt(link)}
      />
      <TextButton
        title="- tmp file using path"
        onPress={() => download.tmpFileUsingPath(link)}
      />
      <TextButton
        title="- ios openDocument"
        onPress={() => download.iosOpenDocument(link)}
      />
      <TextButton
        title="- ios preview document"
        onPress={() => download.iosPreviewDocument(link)}
      />
      <TextButton
        title="- android media scanner"
        onPress={() => download.androidMediaScanner(link)}
      />
      <TextButton
        title="- android DownloadManager"
        onPress={() => download.androidDownloadManager(link)}
      />
      <TextButton
        title="- android storage write permission"
        onPress={() => download.requestStorageWritePermission}
      />
    </View>
  );
}
