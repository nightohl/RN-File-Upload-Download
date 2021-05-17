# RN-File-Upload-Download

## 사용된 라이브러리
* [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob)
* [react-native-document-picker](https://github.com/rnmods/react-native-document-picker)

## 추가 설정
다운로드 예시는 추가설정 없이 테스트 가능하지만, 업로드는 API token이 필요함.

업로드 예시로는 [드롭박스](https://www.dropbox.com/home)를 사용하였으므로, 드롭박스 Oauth2 token를 발급받은 후 아래와 같이 설정하면 됨:
> /src/config/token.ts

`export const dropbox =
  'your_dropbox_Oauth_token';
`

![image](https://user-images.githubusercontent.com/48432932/118461906-1ba8d380-b739-11eb-95f1-ef670e034784.png)


