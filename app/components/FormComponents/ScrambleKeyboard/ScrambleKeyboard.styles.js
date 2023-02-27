import {viewportWidth} from '../../../utils/device.util';
import {theme, text as textStyles} from '../../../styles/core.styles';
import * as styles from '../../../styles/common.styles';

export default {
  scrambleKeyboardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    justifyContent: 'space-between'
  },
  pinView: {
    paddingHorizontal: 20
  },
  pinKeyboardContainer: {
    backgroundColor: theme.scrambleKeyboardBackground,
  },
  infoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  infoText: {
    color: theme.primary
  },
  pinKeyboard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  pinKey: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (viewportWidth) / 3,
    height: 50
  },
  pinKeyEmpty: {
    backgroundColor: theme.scrambleKeyboardBackground,
  },
  pinPromptText: {
    marginBottom: 10,
  },
  pinBox: {
    borderBottomWidth: 2,
    borderBottomColor: theme.black,
    height: 50,
    width: (viewportWidth - styles.contentContainerStyle.padding * 4) / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBoxActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.brand,
    height: 50,
    width: (viewportWidth - styles.contentContainerStyle.padding * 4) / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBoxValid: {
    borderBottomWidth: 2,
    borderBottomColor: theme.green,
    height: 50,
    width: (viewportWidth - styles.contentContainerStyle.padding * 4) / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pinSize: {
    ...textStyles.text,
    color: theme.brand,
    fontSize: 26
  },
  dotStyle: {
    fontSize: 30,
    backgroundColor: 'transparent'
  }

};
