import {fontSizeSmallStyle, bold} from '../../styles/common.styles';
import {theme} from '../../styles/core.styles';


export default {
  headerContainer: {
    paddingBottom: 20
  },
  heading: [{
    paddingBottom: 5
  },
  fontSizeSmallStyle, bold
  ],
  subHeading: [fontSizeSmallStyle],
  container: [{
    // footer height
    backgroundColor: theme.brand,
  }],
  background: {
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'transparent',
    backgroundColor: theme.white,
    marginBottom: 100
  },
  textBillPayStyleBL: {
    textstyle: bold,
    marginBottom: 20,
    marginTop: 10,
    fontSize: theme.fontSizeMedium,
    paddingLeft: -20
  },
  styleMessage: [
    bold,
    {
      fontSize: 16,
      color: theme.darkBlue}
  ],
  containerRowServiceBillpay: {
    borderColor: theme.disabledGrey,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  filterIcon: {
    paddingLeft: 10,
    color: theme.darkBlue,
    marginRight: 5
  },
  exportIcon: {
    paddingLeft: 10,
    color: theme.darkBlue
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingRight: 10
  },
};
