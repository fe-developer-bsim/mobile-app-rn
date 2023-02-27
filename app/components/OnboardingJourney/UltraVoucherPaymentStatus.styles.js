
import {theme} from '../../styles/core.styles';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default {
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.white,
  },
  topContainer: {
    backgroundColor: theme.whiteGrey,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    height: height * 0.25,
    justifyContent: 'space-between',
    backgroundColor: theme.pinkBrand
  },
  flex1: {
    flex: 1
  },
  detailRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  footerContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
    backgroundColor: theme.whiteGrey,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  refnumContainer: {
    paddingVertical: 15,
    backgroundColor: theme.cardGrey,
    width: '95%',
    alignItems: 'center',
    borderRadius: 10
  },
  status: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    fontWeight: 'bold',
    color: theme.white,
    textAlign: 'center',
    height: 60,
    textAlignVertical: 'center'
  },
  statusIOS: {
    fontSize: theme.fontSizeLarge,
    fontFamily: 'roboto',
    fontWeight: 'bold',
    color: theme.white,
    textAlign: 'center',
    height: 60,
    textAlignVertical: 'center',
    marginTop: 40,
  },
  transRefNum: {
    fontSize: theme.fontSizeSmall,
    fontFamily: 'roboto',
    color: theme.darkBlue
  },
  detailText: {
    fontSize: theme.fontSizeNormal,
    color: theme.darkBlue,
    fontFamily: 'roboto',
    marginLeft: 10,
  },
  detailValueText: {
    color: theme.darkBlue,
    textAlign: 'right',
    marginRight: 10,
    flexShrink: 1
  },
  totalText: {
    color: theme.darkBlue,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    marginLeft: 10,
    paddingTop: 10,
  },
  totalValueText: {
    fontWeight: 'bold',
    color: theme.darkBlue,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    paddingTop: 10,
    marginRight: 10
  },
  footerTextGrey: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: 'roboto',
    paddingHorizontal: 20,
  },
  footerTextRed: {
    color: theme.brand,
    fontFamily: 'roboto',
  },
  logoSuccess: {
    color: theme.green
  },
  logoPending: {
    color: theme.orange
  },
  logoFail: {
    color: theme.grey,
    marginRight: 40,
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  greyLine: {
    backgroundColor: theme.containerGrey,
    height: 1,
  },
  whiteBoxContainer: {
    marginHorizontal: 20,
    backgroundColor: theme.white,
    marginTop: -height * 0.15,
    borderRadius: 15,
  },
  contentHeader: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 30,
  },
  contentHeaderStatus: {
    fontSize: theme.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.darkBlue,
    marginVertical: 10
  },
  detailHeader: {
    fontSize: theme.fontSizeMedium,
    fontWeight: 'bold',
    color: theme.darkBlue,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  detailContainer: {
    backgroundColor: theme.cardGrey,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    paddingVertical: 10,
  },
  detailFooterTextGrey: {
    fontSize: theme.fontSizeSmall,
    color: theme.textGrey,
    fontFamily: 'roboto',
    padding: 20
  },
  noteText: {
    color: theme.darkBlue,
    fontFamily: 'roboto',
    fontSize: theme.fontSizeMedium,
    marginLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  noteValueText: {
    color: theme.darkBlue,
    fontFamily: 'roboto',
    marginLeft: 20,
    paddingBottom: 10,
  },
  shareButton: {
    backgroundColor: theme.white,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 10
  },
  shareButtonText: {
    color: theme.darkBlue,
    fontWeight: 'bold',
  },
  doneButton: {
    backgroundColor: theme.darkBlue,
    marginVertical: 10
  },
  doneButtonText: {
    color: theme.white,
    fontWeight: 'bold',
  },
  logoAndDateContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  simobiLogo: {
    width: 70,
  },
  failContainer: {
    padding: 20,
  },
  logoAndDateContainerFail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleContainerFail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  titleFail: {
    fontSize: theme.fontSizeXL,
    color: theme.black
  },
  textBlack: {
    color: theme.black
  },
  dashedLine: {
    borderWidth: 1,
    borderColor: theme.grey,
    marginHorizontal: -20,
    borderStyle: 'dashed',
    borderRadius: 1,
    marginTop: 20,
    marginBottom: 10
  },
  noteTextFail: {
    marginVertical: 20,
  },
  shareIcon: {
    width: 18,
    height: 18,
    tintColor: theme.darkBlue,
  },
  additionalInfo: {
    color: theme.black,
    fontFamily: 'roboto',
    marginLeft: 20,
    paddingBottom: 10,
    marginRight: 20,
  }
};