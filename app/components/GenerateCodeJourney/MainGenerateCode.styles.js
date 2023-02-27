import {theme} from '../../styles/core.styles';
import {contentContainerStyle} from '../../styles/common.styles';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default {
  container: [contentContainerStyle, {backgroundColor: theme.white}],
  containerContent: [{alignItems: 'stretch'}],
  buttonNext: {
    paddingVertical: 30,
  },
  containerWhite: {
    backgroundColor: theme.white,
    paddingHorizontal: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    backgroundColor: theme.white,
    borderColor: theme.grey,
    borderWidth: 1,
  },
  titleCode: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  codeBorder: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: theme.grey,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.white,
    paddingVertical: 20,
    paddingLeft: 20
  },
  imageLeft: {
    width: width * 75 / 100,
  },
  imageRight: {
    width: width * 5 / 100,
  },
  whiteBottom: {
    backgroundColor: theme.white
  },
  containerMenu: {
    paddingVertical: 20
  },
  arrowIcon: {
    color: theme.grey,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: theme.white,
    justifyContent: 'space-between'
  },


};
