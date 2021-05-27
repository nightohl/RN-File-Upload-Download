import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {UploadProps} from './types';

import * as upload from '../../rn-fetch-blob/upload';
import TextButton from '../TextButton';
import Description from '../Description';

export default function Download({onInit, onProgress, onEnd}: UploadProps) {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.title}>Upload</Text>
      <Description
        text={'- src/config/token 하위에 Dropbox 토큰 설정 후 이용하세요.'}
      />
      <TextButton
        title="- single file upload"
        onPress={() => upload.DropboxSingleUpload(onInit, onProgress, onEnd)}
      />
      <Description
        text={
          '- multiple file upload는 형식만 참고하세요.\n- 드롭박스는 multipart/form data 업로드 지원 X'
        }
        containerStyle={styles.gap}
      />
      <TextButton
        title="- muliple file upload"
        onPress={() => upload.MultiFormUpload()}
      />
    </View>
  );
}
