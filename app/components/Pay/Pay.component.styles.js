import * as styles from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default {
  container: [
    styles.contentContainerStyle,
    styles.containerWhiteStyle,
    {
      flex: 1,
      paddingVertical: 0
    }
  ],
  featureTitle: [
    styles.featureTitleStyle,
    styles.fontSizeLargeStyle
  ],
  featureSubTitle: styles.fontSizeNormalStyle,
  serviceContainer: {
    flex: 2,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  serviceItemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  banner: {
    alignSelf: 'flex-end'
  },
  merchantPayContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: theme.grey,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: theme.white,
    padding: 10,
    alignItems: 'center',
    marginVertical: 20
  },
  merchantPayRp: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: theme.lightBlue,
    borderWidth: 1,
    borderColor: theme.white,
    alignItems: 'center',
  },
  rpText: {
    color: theme.white,
    fontWeight: 'bold',
  },
  merchantPayAt: {
    fontWeight: 'bold',
    fontSize: 15
  },
  merchantPayMargin: {
    margin: 10,
    width: 57 * width / 100,
  },
  merchantPayWith: {
    fontSize: 12,
    paddingTop: 5
  },
  merchantPayIcon: {
    alignItems: 'flex-end',
    paddingLeft: 10,
    width: 7 * width / 100,
  },
  arrowIcon: {
    color: theme.grey
  },
  iconRp: {
    color: theme.blueAmount,
    paddingHorizontal: 1
  }
};
