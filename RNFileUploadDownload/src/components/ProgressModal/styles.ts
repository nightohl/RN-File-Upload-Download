import {StyleSheet, Dimensions} from 'react-native';

export const modalStyles = StyleSheet.create({
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
