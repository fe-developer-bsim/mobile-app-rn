import React from 'react';
import DetailSplitBillMenuOwe from '../../components/SplitBillJourney/DetailSplitBillMenuOwe.component';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {find, isEmpty, map, startsWith} from 'lodash';
import {setupFundTransfer}  from '../../state/thunks/fundTransfer.thunks';
import {NavigationActions} from 'react-navigation';
import {downloadReceiptBill, goToYouBill, checkReceipt} from '../../state/thunks/splitBill.thunks';
import {getTargetAccount} from '../../state/thunks/common.thunks';
import {formatMobileNumberEmoney} from '../../utils/transformer.util';


const mapStateToProps = (state) => ({
  selectedContacts: result(state, 'selectedContacts', []),
  addContact: result(state, 'addContact', []),
  userMobileNumber: result(state, 'user.profile.mobileNumberMasking', ''),
  payeeList: result(state, 'payees', []),
  getListSender: result(state, 'splitBillBySender', {}),
  currentLanguage: result(state, 'currentLanguage.id', ''),
  checkReceiptInvoice: result(state, 'checkReceipt', {}),
  cif: result(state, 'user.profile.customer.cifCode', ''),
});

const mapDispatchToProps = (dispatch) => ({
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),
  selectExistingPayee: (payee, amount, isSplitBill, dataTransRefNum, invoiceNumber) => {
    dispatch(setupFundTransfer(payee, amount, isSplitBill, dataTransRefNum, invoiceNumber));
  },
  goToAddPayee: (payeeAccNo, amount, isSplitBill, dataTransRefNum, invoiceNumber) => {
    dispatch(NavigationActions.navigate({routeName: 'AddPayee', params: {payeeAccNo, amount, isSplitBill, dataTransRefNum, invoiceNumber}}));
  },
  downloadReceipt: (data) => () => {
    dispatch(downloadReceiptBill(data));
  },
  getTargetAccount: () => dispatch(getTargetAccount()),
  getYouBill: () => dispatch(goToYouBill()),
  goUpgradeEmoney: (isSplitBillNKYC) => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeBenefit', params: {isSplitBillNKYC: isSplitBillNKYC}}));
  },
  checkReceipt: (data) => dispatch(checkReceipt(data)),
});

class DetailSplitBillMenuOwePage extends React.Component {

  static propTypes = {
    getListSender: PropTypes.object,
    navigation: PropTypes.object,
    ownNumber: PropTypes.string,
    userMobileNumber: PropTypes.string,
    goToAddPayee: PropTypes.func,
    selectExistingPayee: PropTypes.func,
    payeeList: PropTypes.array,
    downloadReceipt: PropTypes.func,
    getTargetAccount: PropTypes.func,
    getYouBill: PropTypes.func,
    goUpgradeEmoney: PropTypes.func,
    currentLanguage: PropTypes.string,
    checkReceipt: PropTypes.func,
    checkReceiptInvoice: PropTypes.object,
    cif: PropTypes.string
  }

  findPayee = (selectedData) => {
    const {goToAddPayee, selectExistingPayee, payeeList, navigation} = this.props;
    const accountNumber = result(selectedData, 'accNumber', '');
    const amount = result(selectedData, 'amount', '');
    const dataTransRefNum = result(selectedData, 'dataTransRefNum', '');
    const foundPayee = find(payeeList, {accountNumber});
    const isSplitBill = true;
    const invoiceNumber = result(navigation, 'state.params.invoiceNumber', '');
    foundPayee ? selectExistingPayee(foundPayee, amount, isSplitBill, dataTransRefNum, invoiceNumber) : goToAddPayee((accountNumber), amount, isSplitBill, dataTransRefNum, invoiceNumber);
  }

  selectExistingPayee = (payee, amount) => () => {
    this.props.selectExistingPayee(payee, amount);
    setTimeout(() => {
      this.setState({disabled: false});
    }, 2000);
  }

  onNextNKYC = () => {
    const {goUpgradeEmoney} = this.props;
    const isSplitBillNKYC = true;
    goUpgradeEmoney(isSplitBillNKYC);
  }

  componentDidMount () {
    const {payeeList, getYouBill, navigation} = this.props;
    const data = result(navigation, 'state.params', {});
    getYouBill(); 
    this.props.checkReceipt(data); 
    if (isEmpty(payeeList)) {
      this.props.getTargetAccount();
    }
    
  }

  state = {
    getListSender: {},
  }


  render () {
    const {getListSender, navigation, userMobileNumber, downloadReceipt, getTargetAccount, currentLanguage, checkReceiptInvoice, cif} = this.props;
    const ownNumber = userMobileNumber.substring(userMobileNumber.length, userMobileNumber.length - 4);
    const data = result(navigation, 'state.params', {});
    const dataUser = result(data, 'dataUser.userMobileNumber', '');
    const contactList = result(data, 'Receivers', '');
    const dataUserViaDeepLink = formatMobileNumberEmoney(result(getListSender, 'res.data.uMobileNumber', ''));
    let validatePay;
    let goIsNKYC;
    const isNonKyc = startsWith(cif, 'NK');
    map(contactList, (value) => {
      const status = result(value, 'status', '');
      const mobileNumber = formatMobileNumberEmoney(result(value, 'mobileNumber', ''));
      const isNKYC = result(value, 'isNKYC', '');
      if (mobileNumber === dataUserViaDeepLink && status === 'paid') {
        validatePay = true;
      } else if (mobileNumber === dataUserViaDeepLink && status === 'reject') {
        validatePay = true;
      } else if (mobileNumber === dataUserViaDeepLink) {
        if (isNKYC === 'true' || isNonKyc) {
          goIsNKYC = true;
        } else {
          goIsNKYC = false;
        }  
      }
    });
    return <DetailSplitBillMenuOwe 
      onChangeTab={this._onChangeTab}
      activeTab={this.state.activeTab}
      setCarouselReferenceFor={this._setCarouselReferenceFor}
      getListSender={getListSender}
      navigation={navigation}
      ownNumber={ownNumber}
      onNextClick={this.findPayee}
      downloadReceipt={downloadReceipt}
      getTargetAccount={getTargetAccount}
      validatePay={validatePay}
      dataUser={dataUser}
      dataUserViaDeepLink={dataUserViaDeepLink}
      goIsNKYC={goIsNKYC}
      onNextNKYC={this.onNextNKYC}
      currentLanguage={currentLanguage}
      checkReceiptInvoice={checkReceiptInvoice}
    />;
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailSplitBillMenuOwePage);
