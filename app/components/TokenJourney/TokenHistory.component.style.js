import {theme} from '../../styles/core.styles';
export default {
  container: {
    backgroundColor: theme.white,
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 0
  },
  containerContent: [{alignItems: 'stretch', paddingBottom: 10}],
  containerTab: {
    backgroundColor: theme.containerWhite
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
    paddingHorizontal: 10,
    marginTop: 0,
    color: theme.white,
    backgroundColor: theme.orange,
    borderRadius: 28,
    fontWeight: 'bold',
    fontSize: 12,
  },

  textEx: {
    paddingHorizontal: 10,
    marginTop: 4,
    color: theme.white,
    backgroundColor: theme.red,
    borderRadius: 28,
    fontWeight: 'bold',
    fontSize: 12
  },

  textSucces: {
    paddingHorizontal: 10,
    marginTop: 0,
    color: theme.white,
    backgroundColor: theme.green,
    borderRadius: 28,
    fontWeight: 'bold',
    fontSize: 12
  },

  textRefund: {
    paddingHorizontal: 10,
    marginTop: 4,
    color: theme.white,
    backgroundColor: theme.blueAmount,
    borderRadius: 28,
    fontWeight: 'bold',
    fontSize: 12
  },

  menu: {
    marginVertical: 0,
  },

  rowCenter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 2
  },

  listView: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: theme.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.grey,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 1,
  },

  historyTitle: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    color: theme.black,
  },

  textInvoiceNumber: {
    marginTop: -5,
    textAlign: 'justify',
    color: theme.black,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  pendingTopTextContainer: {
    flex: 3,
    marginRight: 50,
  },

  textInvoiceNumberPending: {
    marginTop: -5,
    color: theme.black,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },

  textTotalAmount: {
    textAlign: 'justify',
    color: theme.black,
    fontSize: 14,
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
  errorText: {
    fontFamily: 'roboto',
    fontSize: theme.fontSizeNormal,
    fontWeight: theme.fontWeightLight,
    color: theme.softGrey
  },


};
