import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BillerTypeOneIndex from '../../components/BillerTypeOneJourney/BillerTypeOneIndex.component';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {getAmountForGenericBillerTypeOne} from '../../state/thunks/genericBill.thunks';
import {
  validateRequiredFields,
  validateSubscriberNo,
} from '../../utils/validator.util';
import {result, isEmpty, filter, find, clone, forEach, uniq} from 'lodash';
import {
  getFilteredBillerData,
  getBillerForMobile,
} from '../../utils/transformer.util';
import {
  deleteBillpayHistory,
  getBillpayHistory,
  clearFromdeeplinkState,
} from '../../state/thunks/common.thunks';

// import {Platform} from 'react-native';

const mapStateToProps = (state) => ({
  billpayHistory: result(state, 'billpayHistory', {}),
  billerConfig: result(state, 'billerConfig', {}),
  formValues: result(state, 'form.BillerTypeOneIndexForm.values'),
  billerCodeLink: result(state, 'deepLinkbillerCode', ''),
  paramsDeeplink: result(state, 'paramsDeeplink', [])
});

const mapDispatchToProps = (dispatch) => ({
  deleteBillpayHistory: (history) => () =>
    dispatch(deleteBillpayHistory(history)),
  selectHistory: (subscriberNo) => {
    dispatch(change('BillerTypeOneIndexForm', 'subscriberNo', subscriberNo));
  },
  getBillpayHistory: () => dispatch(getBillpayHistory()),
  autoSelectionLinkNumberSubscriber: (subscriberNo) => {
    dispatch(change('BillerTypeOneIndexForm', 'subscriberNo', subscriberNo));
  },
  clearFromdeeplinkStateFunc: () => dispatch(clearFromdeeplinkState())
});

const formConfig = {
  form: 'BillerTypeOneIndexForm',
  validate: (values, {biller, navigation}) => {
    const subscriberNoValidation = result(biller, 'validation', '');
    const subscriberNoText = result(
      biller,
      'billerPreferences.paymentSubscriberNoKey',
      ''
    );
    let errors = '';
    const genericBiller = result(navigation, 'state.params.biller', '');
    if (subscriberNoValidation === '' && isEmpty(genericBiller)) {
      errors = {
        subscriberNo: 'Enter valid number'
      };
    } else {
      errors = {
        subscriberNo: validateSubscriberNo(
          values.subscriberNo,
          subscriberNoValidation,
          subscriberNoText
        ),
        ...validateRequiredFields(values, ['subscriberNo'])
      };
    }
    return errors;
  },
  onSubmit: (values, dispatch, {navigation, billerConfig}) => {
    let biller = result(navigation, 'state.params.biller', {});
    if (isEmpty(biller)) {
      const subscriberNo = result(values, 'subscriberNo', '');
      const postPaidBillers = getFilteredBillerData(
        billerConfig,
        'MOBILE POSTPAID'
      );
      biller = getBillerForMobile(postPaidBillers, subscriberNo);
    }
    // const code = result(biller, 'billerPreferences.code', '');
    // const billCode = code.concat('-1');
    // const os = Platform.OS;
    // Analytics.logEvent('BILL_PAYMENT_JOURNEY', {device: os, billerCode: billCode});
    const favBiller = result(navigation, 'state.params.favBill', {});
    dispatch(
      getAmountForGenericBillerTypeOne(values.subscriberNo, biller, favBiller)
    );
  }
};

const BillerTypeOneIndexForm = reduxForm(formConfig)(BillerTypeOneIndex);

class BillerTypeOneIndexPage extends Component {
  static propTypes = {
    billers: PropTypes.array,
    updateRecentTransactions: PropTypes.func,
    formValues: PropTypes.object,
    billerConfig: PropTypes.object,
    navigation: PropTypes.object,
    deleteBillpayHistory: PropTypes.func,
    selectHistory: PropTypes.func,
    billpayHistory: PropTypes.object,
    billerCodeLink: PropTypes.string,
    paramsDeeplink: PropTypes.array,
    autoSelectionLinkNumberSubscriber: PropTypes.func,
    clearFromdeeplinkStateFunc: PropTypes.func
  };

  state = {
    isUsingPhoneNumber: false
  };

  getBiller = () => {
    const {navigation = {}, formValues, billerConfig} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    if (isEmpty(biller)) {
      const subscriberNo = result(formValues, 'subscriberNo', '');
      const postPaidBillers = getFilteredBillerData(
        billerConfig,
        'MOBILE POSTPAID'
      );
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
      const billers = getFilteredBillerData(billerConfig, 'MOBILE POSTPAID');
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
      const billers = getFilteredBillerData(billerConfig, 'MOBILE POSTPAID');
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
      formValues,
      billerConfig,
      navigation,
      deleteBillpayHistory,
      selectHistory,
      ...extraProps
    } = this.props;
    const biller = this.getBiller();
    const billerList = result(billerConfig, 'billerList', []);
    const history = this.getHistory();
    return (
      <BillerTypeOneIndexForm
        {...extraProps}
        formValues={formValues}
        billerConfig={billerConfig}
        biller={biller}
        navigation={navigation}
        isUsingPhoneNumber={this.state.isUsingPhoneNumber}
        deleteBillpayHistory={deleteBillpayHistory}
        selectHistory={selectHistory}
        billerList={billerList}
        reloadHistory={getBillpayHistory}
        billpayHistory={history}
      />
    );
  }
}

const ConnectedBillerTypeOneIndexPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillerTypeOneIndexPage);
export default ConnectedBillerTypeOneIndexPage;
