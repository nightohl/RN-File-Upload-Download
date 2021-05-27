import React from 'react';
import {Modal, TouchableWithoutFeedback, View, Text} from 'react-native';
import {modalStyles} from './styles';
import {ProgressModalProps} from './types';

import ProgressBar from '../ProgressBar';

export default function ProgressModal({
  visible,
  onRequestClose,
  preventParentEvent,
  percent,
}: ProgressModalProps) {
  return (
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
  );
}
