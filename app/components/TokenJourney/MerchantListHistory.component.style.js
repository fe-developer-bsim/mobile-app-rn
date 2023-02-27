import {theme} from '../../styles/core.styles';
import {Dimensions, Platform} from 'react-native';
const {height} = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import {getModelDevice} from '../../utils/transformer.util';
let model = DeviceInfo.getModel();
const normalIosphone = getModelDevice(model);

export default {
  container: {
    backgroundColor: theme.primary,
    // justifyContent: 'space-between',
    // paddingRight: 0,
    // height: height,
    // marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 5 : 5 : 5,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
  },
  containerContent: [{alignItems: 'stretch', paddingBottom: 10}],
  containerTab: {
    backgroundColor: theme.white,
    paddingRight: 0,
    height: height,
    marginTop: Platform.OS === 'ios' ? normalIosphone === true ? 5 : 5 : 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: 5
  },
  scrollContainer: {
    paddingBottom: 100
  },
  containerRow: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.white,
    borderBottomWidth: 1
  },

  textPending: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 5,
    color: theme.white,
    backgroundColor: theme.primary,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 13,
  },
  textPendingDc: {
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 5,
    color: theme.white,
    backgroundColor: theme.grey,
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 13,
  },
  textEx: {
    paddingHorizontal: 15,
    marginTop: 4,
    color: theme.white,
    backgroundColor: theme.red,
    borderRadius: 28,
    fontWeight: 'bold',
    fontSize: 12
  },

  textSucces: {
    paddingHorizontal: 10,
    marginTop: 4,
    color: theme.white,
    backgroundColor: theme.green,
    borderRadius: 28,
    fontWeight: 'bold',
    fontSize: 12},

  menu: {
    marginVertical: 0,
  },

  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 3
  },

  rowDc: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 3,
    marginTop: 2
  },

  rowTop: {
    flex: 1,
    flexDirection: 'row', 
  },

  rowDate: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flex: 2
  },

  listView: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.grey,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 1,
    marginBottom: 10
  },

  historyTitle: {
    fontSize: 20,
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 20,
    color: theme.black,
    fontWeight: 'bold'
  },

  textInvoiceNumber: {
    marginTop: -5,
    textAlign: 'justify',
    color: theme.black,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },

  textTotalAmount: {
    textAlign: 'justify',
    color: theme.black,
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold'
  },

  textDate: {
    textAlign: 'justify',
    color: theme.black,
    fontSize: 12,
    marginBottom: -5
  },

  activityContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  emptyHeading: {
    fontSize: 25,
    marginTop: 45,
    marginBottom: 10,
    marginLeft: 20,
    color: theme.black,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  emptySubHead: {
    fontSize: 14,
    marginTop: 10,
    color: theme.black,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  imageContainer: {
    alignItems: 'center',
  },
  bottomText1: {
    fontSize: 18,
    marginTop: 50,
    color: theme.black,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  bottomText2: {
    fontSize: 18,
    color: theme.black,
    marginHorizontal: 50,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  containerList: {
    flexDirection: 'row',
    flex: 1
  },
  logo: {
    marginRight: 20,
    paddingTop: 12
  },
  dateConnected1: {
    color: theme.textGrey,
    fontSize: 12,
    fontWeight: 'bold'
  },
  dateConnected2: {
    color: theme.textGrey,
    fontSize: 12,
    fontWeight: 'bold'

  },
  redLine: {
    backgroundColor: theme.red,
    height: 5,
    width: 180,
    color: theme.black,
  },

};
