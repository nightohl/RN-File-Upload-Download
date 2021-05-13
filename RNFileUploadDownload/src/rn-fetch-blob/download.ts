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
