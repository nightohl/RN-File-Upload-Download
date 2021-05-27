import React, {useState} from 'react';
import {SafeAreaView, GestureResponderEvent} from 'react-native';
import {styles} from './styles';

import Download from '../src/components/Download';
import Upload from '../src/components/Upload';
import ProgressModal from '../src/components/ProgressModal';

const App = () => {
  const [visible, setVisible] = useState(false);
  const onRequestClose = () => setVisible(false);
  const [percent, setPercent] = useState(0);

  const preventParentEvent = (e: GestureResponderEvent) => e.stopPropagation();

  const imageLink =
    'https://thumbs.dreamstime.com/z/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg';

  const fileLink =
    'https://www.dropbox.com/s/au0rorwv2gjl0sm/90mobile-v1.0.0.aab?dl=0';

  // progress 모달 관련 함수
  const onInit = () => {
    setVisible(true);
    setPercent(0);
  };
  const onProgress = (pct: number) => setPercent(pct);
  const onEnd = () => setVisible(false);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <Download link={fileLink} />
      <Upload onInit={onInit} onProgress={onProgress} onEnd={onEnd} />
      <ProgressModal
        visible={visible}
        onRequestClose={onRequestClose}
        preventParentEvent={preventParentEvent}
        percent={percent}
      />
    </SafeAreaView>
  );
};

export default App;
