export type OnInit = () => void;
export type OnProgress = (percent: number) => void;
export type OnEnd = () => void;

export type ProgressProps = {
  onInit: OnInit;
  onProgress: OnProgress;
  onEnd: OnEnd;
};

export type DownloadProps = {link: string};
export type UploadProps = ProgressProps;
