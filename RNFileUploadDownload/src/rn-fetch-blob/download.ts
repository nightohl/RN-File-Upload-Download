import {Platform, PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

// send http request in a new thread (using native code)
export const base64 = (fileLink: string) => {
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
};

export const tmpFileNoExt = (fileLink: string) => {
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
};

export const tmpFileWithExt = (fileLink: string) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg', // ImageView 컴포넌트에 첨부할 때 확장자가 있어야하므로, 'jpg', 'png' 등 확장자 추가
  })
    .fetch('GET', fileLink, {
      //some headers ..
    })

    .then(res => {
      // the temp file path
      console.log('The file saved to ', res.path());
    });
};

export const tmpFileUsingPath = (fileLink: string) => {
  RNFetchBlob.config({
    path: RNFetchBlob.fs.dirs.DocumentDir + '/test.jpg',
  })
    .fetch('GET', fileLink, {
      //some headers ..
    })

    .then(res => {
      // the temp file path
      console.log('The file saved to ', res.path());
    });
};

// tmp파일로 저장하고, 화면에 보여줌 (공유 눌러서 이미지 저장 가능)
export const iosOpenDocument = (fileLink: string) => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'jpg', // ImageView 컴포넌트에 첨부할 때 확장자가 있어야하므로, 'jpg', 'png' 등 확장자 추가
  })
    .fetch('GET', fileLink, {
      //some headers ..
    })
    .then(resp => {
      console.log(resp.path());
      // RNFetchBlob.ios.openDocument(resp.data);
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

// tmp파일로 저장하고, 미리보기 화면을 띄워서 저장할 것인지 선택하게함.
export const iosPreviewDocument = (fileLink: string) => {
  const {dirs} = RNFetchBlob.fs;

  const dirToSave = Platform.select({
    ios: dirs.DocumentDir,
    android: dirs.DocumentDir,
  });
  const filePath = `${dirToSave}/Test.jpg`;

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

export const androidMediaScanner = (fileLink: string) => {
  RNFetchBlob.config({
    // DCIMDir is in external storage
    path: RNFetchBlob.fs.dirs.DocumentDir + '/test.jpg',
  })
    .fetch('GET', fileLink)
    .then(res => {
      console.log('result path : ', res.path());
      RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'image/jpg'}]);
    })
    .catch(err => {
      // scan file error
      console.log('err : ', err);
    });
};

export const androidDownloadManager = (fileLink: string) => {
  RNFetchBlob.config({
    // android only options, these options be a no-op on IOS
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true, // 다운로드 완료 푸시알림 표시 여부
      path: `${RNFetchBlob.fs.dirs.DownloadDir}/test.jpg`,
      // 아래는 옵셔널이지만, 안적으면 확장자가 없을 때에는 에러나므로 적어주는 것을 추천함.
      mime: 'image/jpg',
      description: 'Your test reports.',
    },
  })
    .fetch('GET', fileLink)
    .then(resp => {
      // the path of downloaded file
      resp.path();
    });
};

export const requestStorageWritePermission = async () => {
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
