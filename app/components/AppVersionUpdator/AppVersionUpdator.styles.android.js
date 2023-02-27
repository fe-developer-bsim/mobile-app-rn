import {theme} from '../../styles/core.styles.js';
import {Dimensions, Platform} from 'react-native';
import {fontSizeXLStyle, bold} from '../../styles/common.styles.js';
const {width, height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  innerContainerStyles: {
    flex: 1,
    backgroundColor: theme.white,
    // padding: 20,
    justifyContent: 'space-between'
  },
  crossButtonWrapper: {
    marginRight: -10,
    padding: 10,
    justifyContent: 'center'
  },
  mainContent: {
    flex: 1
  },
  versionDetails: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconStyle: {
    color: theme.brand,
    backgroundColor: theme.transparent
  },
  heading: [fontSizeXLStyle, {
    textAlign: 'center',
  }],
  footer: {
    paddingBottom: 30,
    padding: 20
  },
  body: {
    flex: 1,
    paddingVertical: 50,
  },
  ignoreButton: {marginTop: 20},
  background: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // zIndex: -1,
    width: width,
    height: Platform.OS === 'ios' ? normalIosphone === true ? height / 1.8 : height / 2.1 : height / 1.75,
    // resizeMode: 'contain'
  },
  contentText: {
    padding: 20
  },
  upperText: [fontSizeXLStyle, bold, {
    textAlign: 'center',
    paddingBottom: 10
  }],
  textAdd: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  }

};
