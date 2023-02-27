import {bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: {
    paddingBottom: theme.padding,
    paddingHorizontal: theme.padding,
  },
  greyLine: {
    backgroundColor: theme.greyLine,
    height: 1,
  },
  rightItemHeader: [bold, {
    marginBottom: 2,
    fontFamily: 'Roboto',
    color: theme.black
  }],
  robotoLight: {
    fontFamily: theme.robotoLight,
    color: theme.black
  },
  mv5: {
    marginVertical: 5
  },
  labelSpacing: {
    paddingVertical: 10
  },
  notesCore: {
    color: '#FF6300',
    marginBottom: 5,
  },
  notes: {
    fontFamily: theme.robotoLight,
  },
  subNotes: {
    fontFamily: theme.roboto,
    fontSize: theme.fontSizeSmall,
  },
  disclaimer: {
    fontSize: theme.fontSizeXS,
    fontFamily: theme.robotoLight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonRight: {paddingLeft: width / 8},
  buttonLeft: {paddingRight: width / 8},
};