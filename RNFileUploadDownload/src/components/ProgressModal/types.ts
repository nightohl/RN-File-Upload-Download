import {GestureResponderEvent} from 'react-native';

export type ProgressModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  preventParentEvent: (event: GestureResponderEvent) => void;
  percent: number;
};
