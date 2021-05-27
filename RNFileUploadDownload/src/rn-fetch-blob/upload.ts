import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {dropbox} from './../config/token';
import DocumentPicker from 'react-native-document-picker';

async function SingleFileSelector() {
  // Pick a single file
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(
      '선택된 파일 : ',
      res.uri,
      res.type, // mime type
      res.name,
      res.size,
    );
    return res;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      console.log('취소하였습니다.');
    } else {
      throw err;
    }
  }
}

async function MultiFileSelector() {
  // Pick multiple files
  try {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.allFiles],
    });
    for (const res of results) {
      console.log(
        '선택된 파일 : ',
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    }
    return results;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      console.log('취소하였습니다.');
    } else {
      throw err;
    }
  }
}

export async function DropboxSingleUpload({
  onInit,
  onProgress,
  onEnd,
}: {
  onInit: () => void;
  onProgress: (percent: number) => void;
  onEnd: () => void;
}): Promise<void> {
  const result = await SingleFileSelector(); // cancel 했으면 undefined가 반환됨.
  console.log('uri 마지막 확인 : ', result?.uri);
  // 정상 업로드됨  RNFetchBlob.wrap('/Users/night-ohl/Library/Developer/CoreSimulator/Devices/876161EC-19AE-4CFB-8B00-9298D3D3D9BC/data/Containers/Data/Application/C754BFAD-F9F7-4531-A7FD-0D66AADA76AB/Documents/RNFetchBlob_tmp/RNFetchBlobTmp_pyo5s724nuh0j6mn9dyqlz7.jpg')

  if (result) {
    onInit();

    RNFetchBlob.fetch(
      'POST',
      'https://content.dropboxapi.com/2/files/upload',
      {
        Authorization: `Bearer ${dropbox}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: `/${result.name}`,
          mode: 'add',
          autorename: true,
          mute: false,
        }),
        'Content-Type': 'application/octet-stream',
      },
      RNFetchBlob.wrap(
        Platform.OS === 'ios'
          ? `${result.uri.replace('file:', '')}`
          : result.uri,
      ),
    )
      .uploadProgress({interval: 250}, (written, total) => {
        const percent = Math.round((written / total) * 100);
        console.log('업로드 퍼센트 : ', percent);
        onProgress(percent);
      })
      .then(res => {
        console.log('업로드 성공 : ', res.text());
      })
      .catch(err => {
        // error handling ..
        console.log('파일 업로드 에러 : ', err);
      })
      .finally(() => {
        onEnd();
      });
  }
}

/**
 * 형식만 참고하세요.
 * 드롭박스는 multipart/form data 형식의 업로드를 지원하지 않습니다.
 */
export const MultiFormUpload = async (): Promise<void> => {
  const selectedFiles = await MultiFileSelector();
  // console.log(selectedFiles);

  // const accessToken = (await CookieManager.get(baseUrl)).atk.value;
  // console.log('accessToken : ', accessToken);

  // RNFetchBlob.fetch(
  //   'POST',
  //   assignFileUploadApi,
  //   {
  //     Authorization: `Bearer ${accessToken}`,
  //     'Content-Type': 'multipart/form-data',
  //   },
  //   selectedFiles.map(e => ({
  //     name: 'file',
  //     filename: e.name,
  //     type: e.type,
  //     data: RNFetchBlob.wrap(
  //       decodeURIComponent(
  //         Platform.OS === 'ios' ? `${e.uri.replace('file:', '')}` : e.uri,
  //       ),
  //     ),
  //   })),
  // )
  //   // listen to upload progress event
  //   .uploadProgress((written, total) => {
  //     console.log('uploaded', Math.round((written / total) * 100));
  //     getPercent(Math.round((written / total) * 100));
  //   })
  //   .then(res => {
  //     console.log('멀티폼 데이터 업로드 완료 : ', res);
  //     onComplete();
  //   })
  //   .catch(err => {
  //     console.log('멀티폼 데이터 업로드 에러 : ', err);
  //   });
};
