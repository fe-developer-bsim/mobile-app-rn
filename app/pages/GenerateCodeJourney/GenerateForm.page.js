import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {result, isEmpty} from 'lodash';
import {yearToDate, addZero, getEmoneyAccount, formatFieldAmount} from '../../utils/transformer.util';
import GenerateForm from '../../components/GenerateCodeJourney/GenerateForm.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {checkHSMandNavigate, populateBillerData} from '../../state/thunks/common.thunks';
// import {silentLoginBillpay}  from '../../state/thunks/fundTransfer.thunks';
import {randomGenerateCode} from '../../utils/storage.util';
import {NavigationActions} from 'react-navigation';
import {language} from '../../config/language';


let errorMsg = null;

const formConfig = {
  form: 'GenerateForm',
  destroyOnUnmount: false,
  validate: (values, {isLogin, errorData, emoneyAccounts, config}) => {
    const maxLimit = result(config, 'LKDConfig.maxLimitCashOutLKD', {});
    const minLimit = result(config, 'LKDConfig.minLimitCashOutLKD', {});
    const balance = result(emoneyAccounts, 'balances.availableBalance', 0);
    const maxAmount = result(values, 'amount', 0);
    let errors = {};
    if (isLogin) {
      errors = {...validateRequiredFields(values, ['amount', 'accountNo'])};
      errors = balance === null ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_1)} : {...errors};
      errors = parseInt(balance) < parseInt(maxAmount) ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_1)} : {...errors};
      errors = parseInt(maxAmount) < minLimit ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_2 + formatFieldAmount(minLimit))} : {...errors};
      errors = parseInt(maxAmount) > maxLimit ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_3 + formatFieldAmount(maxLimit))} : {...errors};
    } else {
      errors = {...validateRequiredFields(values, ['amount'])};
      errors = parseInt(maxAmount) < 50000 ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_2 + formatFieldAmount(minLimit))} : {...errors};
      errors = parseInt(maxAmount) > 1000000 ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_3 + formatFieldAmount(maxLimit))} : {...errors};
    }
    errorData(errors);
    errorMsg = errors;
    
    return {
      ...errors
    };
  },

  initialValues: {
    amount: '',
    accountNo: '',
    merchantCode: ''
  },
};

const mapStateToProps = (state) => ({
  user: result(state, 'user', {}),
  nav: result(state, 'nav', {}),
  form: result(state, 'form', {}),
  emoneyAccounts: getEmoneyAccount(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.GenerateForm.values', {}),
  trxType: result(state, 'generateCode.trxType', ''),
  transRefNum: result(state, 'transRefNum', ''),
  generateCode: result(state, 'generateCode', {}),
  config: result(state, 'config', {}),
  billerConfig: result(state, 'billerConfig', {}),
  billerLKD: result(state, 'billerConfig.billerLKD', {}),
});

const mapDispatchToProps = (dispatch) => ({
  login: (tipe) => dispatch(checkHSMandNavigate(tipe)),
  getSourceMerc: (payee, isTopup) => {
    dispatch(NavigationActions.navigate({
      routeName: 'SourceMerchant',
      params: {formName: 'GenerateForm', fieldName: 'merchantCode', sourceType: 'fundTransfer', payee: payee, isTopup: isTopup}      
    }));
  },
  populateBillerData: () => dispatch(populateBillerData()),
  generateConfirmation: (name, code, payload, trxType, merchName) => {
    dispatch(NavigationActions.navigate({routeName: 'GenerateConfirmation', params: {name, code, payload, trxType, merchName}}));
  },
  changeForm: (code) => dispatch(change('GenerateForm', 'merchantCode', code)),
  dispatch
});

const DecoratedForm = reduxForm(formConfig)(GenerateForm);

class GenerateFormOnboarPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    login: PropTypes.func,
    user: PropTypes.object,
    nav: PropTypes.object,
    genCode: PropTypes.func,
    form: PropTypes.object,
    emoneyAccounts: PropTypes.array,
    formValues: PropTypes.object,
    trxType: PropTypes.string,
    transRefNum: PropTypes.string,
    generateCode: PropTypes.object,
    goToSelectAcc: PropTypes.func,
    goToConfirmation: PropTypes.func,
    generateConfirmation: PropTypes.func,
    getSourceMerc: PropTypes.func,
    config: PropTypes.object,
    billerConfig: PropTypes.object,
    billerLKD: PropTypes.object,
    populateBillerData: PropTypes.func,
    isLogin: PropTypes.bool,
    dispatch: PropTypes.func
  };

  state = {
    error: {},
    visible: false
  }

  errorData = (error) => {
    this.setState({error});
  }
  componentWillMount = () => {
  }

  selectSourceMerc = () => {
    const {getSourceMerc, navigation} = this.props;
    const payee = result(navigation, 'state.params.payee', {});
    const isTopup = result(payee, 'accountType', '') === 'emoneyAccount' && result(payee, 'transferType', '') === 'own';
    getSourceMerc(payee, isTopup);
  }
  tickOverlay = () => {
    this.setState({visible: !this.state.visible});
  }
  tickOnclose = () => {
    this.setState({visible: false});
  }
  goToConfirmation = () => {
    const {navigation, formValues, transRefNum, generateConfirmation, billerLKD, emoneyAccounts} = this.props;
    const trxType = result(navigation, 'state.params.param', '');

    const accId = result(emoneyAccounts, 'id', '');
    const maxAmt = result(formValues, 'amount', 0);
    const ytd = yearToDate();

    const selectMerchant = isEmpty(result(formValues, 'merchantCode.code', ''));
    const merchCode = result(formValues, 'merchantCode.code', '');
    const merchName = result(formValues, 'merchantCode.name', '');
    const merchFee = result(formValues, 'merchantCode.fee', '');
    const merchCodeDefault = result(billerLKD, '[0].code', '');
    const merchNameDefault = result(billerLKD, '[0].name', '');
    const merchFeeDefault = result(billerLKD, '[0].fee', '');

    randomGenerateCode().then((res) => {
      const lastGenerate = result(res, 'lastGenerate', '');
      const dateNow = new Date().getDate();
      const codeNow = result(res, 'code', 0);
      const newCode = lastGenerate !== dateNow ? 1 : codeNow ? parseInt(codeNow) + 1 : 1;
      const randomCode = addZero(newCode, 3);
      const code = accId + trxType + merchCode + maxAmt + ytd + randomCode;
      const payload = {
        accountId: String(accId),
        merchantCode: String(selectMerchant ? merchCodeDefault : merchCode),
        merchantName: String(selectMerchant ? merchNameDefault : merchName),
        merchantFee: String(selectMerchant ? merchFeeDefault : merchFee),
        transactionType: String(trxType),
        maxAmount: String(maxAmt),
        transRefNum: String(transRefNum),
      };
      const name = result(navigation, 'state.params.name', ''); 
      generateConfirmation(name, code, payload, trxType);
    });
  }

  render () {

    const {navigation = {}, login, user, nav, genCode, emoneyAccounts, formValues, transRefNum, generateCode, goToSelectAcc, generateConfirmation, getSourceMerc, config, billerConfig, populateBillerData, billerLKD} = this.props;
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const dataMerchant = result(navigation, 'state.params');
    const trxType = result(navigation, 'state.params.param', '');
    return <DecoratedForm
      login={login}
      navigation={navigation}
      isLogin={isLogin}
      genCode={genCode}
      dataMerchant={dataMerchant}
      emoneyAccounts={emoneyAccounts}
      formValues={formValues}
      trxType={trxType}
      transRefNum={transRefNum}
      generateCode={generateCode}
      goToSelectAcc={goToSelectAcc}
      goToConfirmation={this.goToConfirmation}
      generateConfirmation={generateConfirmation}
      errorData={this.errorData}
      thisState={this.state}
      errorMsg={errorMsg}
      getSourceMerc={getSourceMerc}
      getSourceAcc={this.selectSourceMerc}
      config={config}
      billerConfig={billerConfig}
      billerLKD={billerLKD}
      populateBillerData={populateBillerData}
      visible={this.state.visible}
      tickOverlay={this.tickOverlay}
      tickOnclose={this.tickOnclose}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateFormOnboarPage);