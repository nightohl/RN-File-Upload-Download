import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

// send http request in a new thread (using native code)
export const base64 = (fileLink: string) =>
  RNFetchBlob.fetch('GET', fileLink)
    .then(res => {
      let status = res.info().status;
      console.log('status : ', status);

      if (status === 200) {
        // the conversion is done in native code
        console.log('base64Str : ', res.base64());

        // the conversion is done in native code
        // the following conversions are done in js, it's SYNC
        console.log('text : ', res.text());
        console.log('json : ', res.json());
      } else {
        // handle other status codes
      }
    })
    // Something went wrong:
    .catch((errorMessage, statusCode) => {
      // error handling
    });

export const tmpFileNoExt = (fileLink: string) =>
  RNFetchBlob.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
  })
    .fetch('GET', fileLink, {
      //some headers ..
    })
    .then(res => {
      // the temp file path
      console.log('The file saved to ', res.path());
    });

export const tmpFileWithExt = (fileLink: string) =>
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png', // ImageView 컴포넌트에 첨부할 때 확장자가 있어야하므로, 'jpg', 'png' 등 확장자 추가
  })
    .fetch('GET', fileLink, {
      //some headers ..
    })
    .then(res => {
      // the temp file path
      console.log('The file saved to ', res.path());
    });

// tmp파일로 저장하고, 화면에 보여줌 (공유 눌러서 이미지 저장 가능)
export const iosFileDownloadOpenDocument = (fileLink: string) =>
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png', // ImageView 컴포넌트에 첨부할 때 확장자가 있어야하므로, 'jpg', 'png' 등 확장자 추가
  })
    .fetch('GET', fileLink, {
      //some headers ..
    })
    .then(resp => {
      RNFetchBlob.ios.openDocument(resp.data);
    })
    .catch((errorMessage, statusCode): void => {
      console.log(
        'statusCode : ',
        statusCode,
        ' errorMessage : ',
        errorMessage,
      );
    });

// tmp파일로 저장하고, 미리보기 화면을 띄워서 저장할 것인지 선택하게함.
export const iosFileDownload = (fileLink: string) => {
  const {dirs} = RNFetchBlob.fs;

  const dirToSave = Platform.select({
    ios: dirs.DocumentDir,
    android: dirs.DocumentDir,
  });
  const filePath = `${dirToSave}/Test.png`;

  RNFetchBlob.config({
    path: filePath,
  })
    .fetch('GET', fileLink)
    .then((res): void => {
      RNFetchBlob.ios.previewDocument(filePath);
    })
    .catch((errorMessage, statusCode): void => {
      console.log(
        'statusCode : ',
        statusCode,
        ' errorMessage : ',
        errorMessage,
      );
    });
};
