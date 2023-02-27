import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getEnquiryForGenericBillerTypeSix} from '../../state/thunks/genericBill.thunks';
import BillerTypeSixIndex from '../../components/BillerTypeSixJourney/BillerTypeSixIndex.component';
import {reduxForm, destroy, change} from 'redux-form';
import {connect} from 'react-redux';
import {
  validateRequiredFields,
  validateSubscriberNo,
  validatePrefixBiller,
} from '../../utils/validator.util';
import {result, isEmpty, find, filter, clone, forEach, uniq} from 'lodash';
import {
  getFilteredBillerByCode,
  getFilteredBillerData,
  getBillerForMobile,
} from '../../utils/transformer.util';
import {
  deleteBillpayHistory,
  getBillpayHistory,
  clearFromdeeplinkState,
} from '../../state/thunks/common.thunks';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'BillerTypeSixIndexForm',
  validate: (values, {navigation, billerGopay, biller}) => {
    const isGopay = result(navigation, 'state.params.isGopay', false);
    const navBiller = isGopay
      ? billerGopay
      : result(navigation, 'state.params.biller', {});
    const subscriberNoValidation = result(biller, 'validation', '');
    let errors = '';
    if (isEmpty(navBiller) && subscriberNoValidation === '') {
      errors = {
        subscriberNo: 'Enter valid number'
      };
    } else {
      const subscriberNoValidation = result(biller, 'validation', '');
      const subscriberNoText =
        result(biller, 'billerPreferences.paymentSubscriberNoKey') ||
        result(navBiller, 'billerPreferences.purchaseSubscriberNoKey', '');
      const prefix = result(biller, 'prefix', []);
      errors = {
        subscriberNo:
          validateSubscriberNo(
            values.subscriberNo,
            subscriberNoValidation,
            subscriberNoText
          ) || validatePrefixBiller(values.subscriberNo, prefix),
        ...validateRequiredFields(values, ['subscriberNo'])
      };
    }
    return errors;
  },
  onSubmit: (values, dispatch, {navigation, billerGopay, billerConfig}) => {
    dispatch(destroy('BillerTypeSixPayment'));
    dispatch(destroy('BillerTypeSixConfirmationForm'));
    const isGopay = result(navigation, 'state.params.isGopay', false);
    let biller = isGopay
      ? billerGopay
      : result(navigation, 'state.params.biller', {});
    // const code = result(biller, 'billerPreferences.code', '');
    // const billCode = code.concat('-1');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
    if (isEmpty(biller)) {
      const subscriberNo = result(values, 'subscriberNo', '');
      const postPaidBillers = getFilteredBillerData(billerConfig, 'TOPUP');
      biller = getBillerForMobile(postPaidBillers, subscriberNo);
    }
    const favBiller = result(navigation, 'state.params.favBill', {});
    dispatch(getEnquiryForGenericBillerTypeSix(values, biller, favBiller));
  }
};

const BillerTypeSixIndexForm = reduxForm(formConfig)(BillerTypeSixIndex);

const mapStateToProps = (state) => {
  const cif = result(state, 'user.profile.customer.cifCode', '');
  const billerConfig = result(state, 'billerConfig', {});
  const billerGopay = getFilteredBillerByCode(billerConfig, '810128');
  return {
    billerGopay,
    billerConfig,
    cif,
    formValues: result(state, 'form.BillerTypeSixIndexForm.values'),
    billpayHistory: result(state, 'billpayHistory', {}),
    billerCodeLink: result(state, 'deepLinkbillerCode', ''),
    paramsDeeplink: result(state, 'paramsDeeplink', [])
  };
};

class BillerTypeSixIndexPage extends Component {
  static propTypes = {
    billers: PropTypes.array,
    updateRecentTransactions: PropTypes.func,
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    billerConfig: PropTypes.object,
    billerGopay: PropTypes.object,
    selectMobileNo: PropTypes.func,
    deleteBillpayHistory: PropTypes.func,
    selectHistory: PropTypes.func,
    billpayHistory: PropTypes.object,
    billerCodeLink: PropTypes.string,
    paramsDeeplink: PropTypes.array,
    autoSelectionLinkNumberSubscriber: PropTypes.func,
    clearFromdeeplinkStateFunc: PropTypes.func,
    cif: PropTypes.object,
  };

  state = {
    isUsingPhoneNumber: false,
    cif: PropTypes.object,
  };

  getBiller = () => {
    const {navigation = {}, formValues, billerConfig} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    if (isEmpty(biller)) {
      const subscriberNo = result(formValues, 'subscriberNo', '');
      const postPaidBillers = getFilteredBillerData(billerConfig, 'TOPUP');
      const selectedBiller = getBillerForMobile(postPaidBillers, subscriberNo);
      return selectedBiller;
    } else {
      return biller;
    }
  };

  componentWillMount () {
    const {
      navigation = {},
      billerConfig,
      billerCodeLink,
      paramsDeeplink,
      autoSelectionLinkNumberSubscriber,
    } = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    if (isEmpty(biller)) {
      const billers = getFilteredBillerData(billerConfig, 'TOPUP');
      const isUsingPhoneNumber = !isEmpty(
        find(
          billers,
          (biller) => biller.billerPreferences.isUsingPhoneNumber === true
        )
      );
      this.setState({isUsingPhoneNumber});
    } else {
      const isUsingPhoneNumber = result(
        biller,
        'billerPreferences.isUsingPhoneNumber',
        false
      );
      this.setState({isUsingPhoneNumber});
    }
    if (!isEmpty(billerCodeLink) && !isEmpty(paramsDeeplink)) {
      const subscriberNumberLinkRaw = find(paramsDeeplink, function (o) {
        return o.keyId === 'subscriberNo';
      });
      const subscriberNumberLink = result(
        subscriberNumberLinkRaw,
        'valueId',
        ''
      );
      autoSelectionLinkNumberSubscriber(subscriberNumberLink);
    }
  }
  componentWillUnmount () {
    this.props.clearFromdeeplinkStateFunc();
  }

  getHistory = () => {
    const {navigation = {}, billerConfig, billpayHistory} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    const savedBillPaymentList = result(
      billpayHistory,
      'savedBillPaymentList',
      []
    );
    let history = clone(billpayHistory);
    if (isEmpty(biller)) {
      const billers = getFilteredBillerData(billerConfig, 'TOPUP');
      let historyTopup = [];
      forEach(billers, (biller) => {
        const id = result(biller, 'id', 0);
        const billPaymentList = filter(
          savedBillPaymentList,
          (historyItem) => historyItem.billerId === id
        );
        historyTopup = uniq([...historyTopup, ...billPaymentList]);
      });
      history.savedBillPaymentList = historyTopup;
      return history;
    } else {
      const id = result(biller, 'id', 0);
      const newBillPaymentList = filter(
        savedBillPaymentList,
        (historyItem) => historyItem.billerId === id
      );
      history.savedBillPaymentList = newBillPaymentList;
      return history;
    }
  };

  render () {
    const {
      navigation,
      billerGopay,
      billerConfig,
      cif,
      selectMobileNo,
      deleteBillpayHistory,
      selectHistory,
      ...extraProps
    } = this.props;
    const billerList = result(billerConfig, 'billerList', []);
    const isGopay = result(navigation, 'state.params.isGopay', false);
    const biller = isGopay ? billerGopay : this.getBiller();
    const history = this.getHistory();
    return (
      <BillerTypeSixIndexForm
        {...extraProps}
        biller={biller}
        navigation={navigation}
        billerConfig={billerConfig}
        isUsingPhoneNumber={this.state.isUsingPhoneNumber}
        billerList={billerList}
        reloadHistory={getBillpayHistory}
        billpayHistory={history}
        cif={cif}
        selectMobileNo={selectMobileNo}
        deleteBillpayHistory={deleteBillpayHistory}
        selectHistory={selectHistory}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectMobileNo: (subscriberNo) =>
    dispatch(change('BillerTypeSixIndexForm', 'subscriberNo', subscriberNo)),
  deleteBillpayHistory: (history) => () =>
    dispatch(deleteBillpayHistory(history)),
  selectHistory: (subscriberNo) => {
    dispatch(change('BillerTypeSixIndexForm', 'subscriberNo', subscriberNo));
  },
  getBillpayHistory: () => dispatch(getBillpayHistory()),
  autoSelectionLinkNumberSubscriber: (subscriberNo) => {
    dispatch(change('BillerTypeSixIndexForm', 'subscriberNo', subscriberNo));
  },
  clearFromdeeplinkStateFunc: () => dispatch(clearFromdeeplinkState())
});

const ConnectedBillerTypeSixIndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillerTypeSixIndexPage);
export default ConnectedBillerTypeSixIndexPage;
