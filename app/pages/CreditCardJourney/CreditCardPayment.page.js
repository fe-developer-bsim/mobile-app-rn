import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import CreditCardPayment from '../../components/CreditCardJourney/CreditCardPayment.component';
import result from 'lodash/result';
import {validateRequiredFields, isInRange, validateMaxTransactionAmount, isInRangeRTGS} from '../../utils/validator.util';
import {getAccountAmount, getTransferPossibleAccountsNoEmoney, formatCreditCardPaymentMode, checkBillAmountCc, getOptimalCCMethods, isInBin} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import moment from 'moment';
import {confirmTransfer} from '../../state/thunks/fundTransfer.thunks';
import {getallAccbeforelogin} from '../../state/thunks/common.thunks';
import isEmpty from 'lodash/isEmpty';

const formConfig = {
  form: 'CreditCardPayment',
  destroyOnUnmount: false,
  initialValues: {
    myAccount: {},
    amount: '',
    paymentMode: '',
    transferType: '',
    focus: false
  },
  validate: (values, props) => {
    let errors = {
      ...validateRequiredFields(values, ['myAccount', 'amount'])
    };
    const accountBalance = getAccountAmount(values.myAccount);
    return {
      amount: isInRange(1000, accountBalance, values.amount)
      || validateMaxTransactionAmount(values.amount, result(props, 'tokenConfig', []), result(props, 'payee.transferType', ''))
      || isInRangeRTGS(values.amount, result(props, 'transferChargeConfig', []), result(values, 'transferType', '')),
      ...errors
    };
  },
  onSubmit: (values, dispatch, props) => {
    const transferType = result(values, 'transferType', '');
    const formValues = {amount: result(props, 'formValues.amount', 0), myAccount: result(props, 'formValues.myAccount')};
    const payee = {accNo: result(props, 'accNo', ''), name: result(props, 'name', ''), transferType: transferType, bank: result(props, 'bank', {}), accountType: result(props, 'formValues.myAccount.accountType', 'NIL'), id: result(props, 'id', '')};
    dispatch(confirmTransfer(formValues, payee, 'creditCard'));
  }
};

const DecoratedCreditCardPayment = reduxForm(formConfig)(CreditCardPayment);

class CreditCardPaymentPage extends Component {
  static propTypes = {
    setPaymentMode: PropTypes.func,
    setTransferType: PropTypes.func,
    setup: PropTypes.func,
    accountList: PropTypes.array,
    navigation: PropTypes.object.isRequired,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    setAmount: PropTypes.func,
    focus: PropTypes.bool,
    bankList: PropTypes.array,
    gapTimeServer: PropTypes.number,
    timeConfig: PropTypes.object,
    getDefaultAccountbeforeLogin: PropTypes.func,
    isLogin: PropTypes.bool,
    chargeList: PropTypes.array
  };

  state = {
    paymentMethods: [],
  }

  getPaymentMethods = () => {
    const {navigation, bankList} = this.props;
    const bank = result(navigation, 'state.params.bank', {});
    const navParams = navigation.state.params;
    const accountNumber = result(navParams, 'accNo', {});
    const binSupported = isInBin(accountNumber, bankList);
    if (result(bank, 'isSinarmas')) {
      return [{
        type: 'inbank',
        when: 'instantly'
      }];
    } else {
      const appTime = new Date();
      const gapTime = result(this, 'props.gapTimeServer', 0);
      const serverTimeNew = String(moment(appTime).add(gapTime, 'seconds').format('HH:mm'));
      let isNetworkSupport = false;
      let isSknSupport = false;
      let isRtgsSupport = false;
      if (binSupported) {
        isNetworkSupport = result(navParams, 'bank.networkCC', false);
        isSknSupport = result(navParams, 'bank.sknCC', false);
        isRtgsSupport = result(navParams, 'bank.rtgsCC', false);
      } else {
        isNetworkSupport = (String(result(navParams, 'bank.networkEnabled', '')).toLowerCase() === 'yes');
        isSknSupport = (String(result(navParams, 'bank.sknEnabled', '')).toLowerCase() === 'yes');
        isRtgsSupport = (String(result(navParams, 'bank.rtgsEnabled', '')).toLowerCase() === 'yes');
      }
      return getOptimalCCMethods(
        moment(result(this, 'props.timeConfig.cutOffTimeSkn'), 'HH:mm'),
        moment(result(this, 'props.timeConfig.cutOffTimeRtgs'), 'HH:mm'),
        moment(serverTimeNew, 'HH:mm'), // TODO get currentTime from server
        moment(result(this, 'props.timeConfig.coreBusinessDate')),
        moment('00:00', 'HH:mm'), isNetworkSupport, isSknSupport, isRtgsSupport
      );
    }
  }

  componentWillMount () {
    const {setTransferType} = this.props;
    const paymentMethods = this.getPaymentMethods();
    this.setState({paymentMethods},
      () => setTransferType(result(this, 'state.paymentMethods[0].type'))
    );
  }

  componentDidMount () {
    const {setPaymentMode = noop, navigation, getDefaultAccountbeforeLogin, isLogin} = this.props;
    const navParams = navigation.state.params;
    const billAmount = result(navParams, 'billDetails.billAmount', 0);
    const billAmountCC = result(navParams, 'billDetails.billAmountCC', 0);
    const outstandingBalance = checkBillAmountCc(billAmount, billAmountCC);
    if (result(navParams, 'bank.isSinarmas', false)) {
      setPaymentMode('outstanding', outstandingBalance);
    } else {
      setPaymentMode('other', '');
    }
    if (!isLogin) {
      getDefaultAccountbeforeLogin();
    }
  }

  render () {
    const {navigation, accountList = [], formValues = {}, setAmount = noop, appConfig, bankList, chargeList} = this.props;
    const navParams = navigation.state.params;
    const payee = {name: result(navParams, 'name', ''), accountNumber: result(navParams, 'accNo', ''), bank: result(navParams, 'bank', {}), payee: result(navParams, 'payee', {})};
    const billAmount = result(navParams, 'billDetails.billAmount', 0);
    const billAmountCC = result(navParams, 'billDetails.billAmountCC', '');
    const outstandingBalance = checkBillAmountCc(billAmount, billAmountCC);
    const paymentMode = formatCreditCardPaymentMode(outstandingBalance);
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const transferArray = result(chargeList, 'transfer', []);
    const transferChargeConfig = result(chargeList, 'transfer', []);
    const paymentMethods = result(formValues, 'myAccount.accountType', '')  === 'emoneyAccount' ?
      [{type: 'network', when: 'instantly'}] :
      this.state.paymentMethods;
    return (
      <DecoratedCreditCardPayment
        setAmount={setAmount(outstandingBalance)} {...navParams} outstandingBalance={outstandingBalance}
        accountList={accountList} paymentMode={paymentMode} paymentMethods={paymentMethods} formValues={formValues} payee={payee}
        tokenConfig={tokenConfig} bankList={bankList} transferArray={transferArray} transferChargeConfig={transferChargeConfig}/>
    );
  }
}

const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccountsNoEmoney(result(state, 'accounts', []), 'ft'),
  formValues: result(state, 'form.CreditCardPayment.values', {}),
  appConfig: result(state, 'config', {}),
  bankList: result(state, 'valueBankList.bankList', []),
  gapTimeServer: result(state, 'gapTimeServer', 0),
  timeConfig: result(state, 'timeConfig', {}),
  isLogin: !isEmpty(result(state, 'user', {})),
  chargeList: result(state, 'chargeList', [])
});

const mapDispatchToProps = (dispatch) => ({
  setPaymentMode: (mode, amount) => {
    dispatch(change('CreditCardPayment', 'paymentMode', mode));
    dispatch(change('CreditCardPayment', 'amount', amount));
  },
  setAmount: (amount) => () => {
    dispatch(change('CreditCardPayment', 'amount', amount));
  },
  setTransferType: (mode) => {
    dispatch(change('CreditCardPayment', 'transferType', mode));
  },
  getDefaultAccountbeforeLogin: () => {
    dispatch(getallAccbeforelogin());
  }
});

const connectedCreditCard = connect(mapStateToProps, mapDispatchToProps)(CreditCardPaymentPage);
export default connectedCreditCard;
