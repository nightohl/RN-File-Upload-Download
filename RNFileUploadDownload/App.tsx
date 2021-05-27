import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

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

import {DropboxSingleUpload, MultiFormUpload} from './src/rn-fetch-blob/upload';

import TextButton from './src/components/TextButton';
import ProgressBar from './ProgressBar';

const App = () => {
  const [visible, setVisible] = useState(false);
  const onRequestClose = () => setVisible(false);
  const [percent, setPercent] = useState(0);

  const preventParentEvent = (e: any) => e.stopPropagation();

  const imageLink =
    'https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg';

  const onInit = () => {
    setVisible(true);
    setPercent(0);
  };
  const onProgress = (pct: number) => setPercent(pct);
  const onEnd = () => setVisible(false);

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
          onPress={() =>
            DropboxSingleUpload({
              onInit,
              onProgress,
              onEnd,
            })
          }
        />
        <Description
          text={
            '- multiple file upload는 형식만 참고하세요.\n- 드롭박스는 multipart/form data 업로드 지원 X'
          }
          containerStyle={{marginTop: 10}}
        />
        <TextButton
          title="- muliple file upload"
          onPress={() => MultiFormUpload()}
        />
      </View>
      <Modal
        transparent
        visible={visible}
        onRequestClose={onRequestClose}
        animationType="slide">
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={modalStyles.modalContainer}>
            <TouchableWithoutFeedback onPress={preventParentEvent}>
              <View style={modalStyles.modalWrapper}>
                <Text style={modalStyles.modalTitle}>Download Video</Text>
                <Text style={modalStyles.modalSubTitle}>
                  please wait until download finish, don't close the app
                </Text>
                <ProgressBar progress={percent} backgroundColor="#fafafa" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

const modalStyles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modalSubTitle: {
    color: '#333',
    fontSize: 13,
    marginBottom: 16,
  },
  modalHint: {
    color: '#333',
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },

  modalWrapper: {
    paddingHorizontal: 16 * 2,
    paddingVertical: 20,
    width: Dimensions.get('window').width - 2 * 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
});

export default App;
