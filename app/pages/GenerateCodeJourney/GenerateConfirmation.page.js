import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {result, isEmpty} from 'lodash';
import {yearToDate, addZero, getEmoneyAccount} from '../../utils/transformer.util';
import GenerateConfirmation from '../../components/GenerateCodeJourney/GenerateConfirmation.component';
import {validateRequiredFields} from '../../utils/validator.util';
import {updateStorageRandom, generateCodeConfirmation} from '../../state/thunks/generateCode.thunks';
import {checkHSMandNavigate, triggerAuthNavigate} from '../../state/thunks/common.thunks';
import {randomGenerateCode} from '../../utils/storage.util';
import {language} from '../../config/language';

const formConfig = {
  form: 'GenerateConfirmation',
  destroyOnUnmount: false,
  validate: (values, {isLogin, errorData}) => {
    const availabeBalance = result(values, 'accountNo.balances.availableBalance', 0);
    const maxAmount = result(values, 'amount', 0);
    let errors = {};
    if (isLogin) {
      errors = {...validateRequiredFields(values, ['amount', 'accountNo'])};
      errors = parseInt(availabeBalance) < parseInt(maxAmount) ? {...errors, accountNo: (language.GENERATE_FORM__ERROR_MESSAGE_1)} : {...errors};
      errors = parseInt(maxAmount) < 50000 ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_2)} : {...errors};
      errors = parseInt(maxAmount) > 1000000 ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_3)} : {...errors};
    } else {
      errors = {...validateRequiredFields(values, ['amount'])};
      errors = parseInt(maxAmount) < 50000 ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_2)} : {...errors};
      errors = parseInt(maxAmount) > 1000000 ? {...errors, amount: (language.GENERATE_FORM__ERROR_MESSAGE_3)} : {...errors};
    }
    errorData(errors);
    return {
      ...errors
    };
  },
  initialValues: {
    amount: '',
    accountNo: ''
  },
  onSubmit: (formValues, dispatch, {genCode, navigation}) => {
    const accId = String(addZero(result(formValues, 'accountNo.id', '')));
    const lengMerch = 3;
    const merCode = addZero(('1'), lengMerch);
    const maxAmt = result(formValues, 'amount', 0);
    const ytd = yearToDate();
    const trxType = result(navigation, 'state.params.param', '');
    randomGenerateCode().then((res) => {
      const lastGenerate = result(res, 'lastGenerate', '');
      const dateNow = new Date().getDate();
      const codeNow = result(res, 'code', 0);
      const newCode = lastGenerate !== dateNow ? 1 : codeNow ? parseInt(codeNow) + 1 : 1;
      updateStorageRandom(newCode);
      const randomCode = addZero(newCode, 3);
      const code = accId + trxType + merCode + maxAmt + ytd + randomCode;
      const payload = result(navigation, 'state.params.payload', {});
      const name = result(navigation, 'state.params.name', '');
      const params = {
        onSubmit: genCode(name, code, null, payload),
        amount: maxAmt,
        isOtp: false,
      };
      dispatch(triggerAuthNavigate('lkd', 0, true, 'AuthTransfer', params));


    });
  }
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
  billerLKD: result(state, 'billerConfig.billerLKD', {}),

});

const mapDispatchToProps = (dispatch) => ({
  login: (tipe) => dispatch(checkHSMandNavigate(tipe)),
  triggerAuth: (params, amount) => dispatch(triggerAuthNavigate('lkd', amount, true, 'AuthTransfer', params)),
  genCode: (name, code, isLogin, payload) => () => dispatch(generateCodeConfirmation(name, code, isLogin, payload)),
});

const DecoratedForm = reduxForm(formConfig)(GenerateConfirmation);

class GenerateFormOnboarPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    login: PropTypes.func,
    user: PropTypes.object,
    nav: PropTypes.object,
    triggerAuth: PropTypes.func,
    genCode: PropTypes.func,
    form: PropTypes.object,
    emoneyAccounts: PropTypes.array,
    formValues: PropTypes.object,
    trxType: PropTypes.string,
    transRefNum: PropTypes.string,
    generateCode: PropTypes.object,
    goToSelectAcc: PropTypes.func,
    goToGenerate: PropTypes.func,
    billerLKD: PropTypes.object,

  };

  state = {
    error: {}
  }

  errorData = (error) => {
    this.setState({error});
  }

  render () {
    const {navigation = {}, login, user, nav, triggerAuth, genCode, emoneyAccounts, formValues, transRefNum, generateCode, goToSelectAcc, goToGenerate, billerLKD} = this.props;
    const loginRoute = result(nav, 'routes.0.routeName', 'Onboarding');
    const isLogin = !isEmpty(user) && (result(nav, 'index', 0) > 0 || loginRoute === 'Main');
    const dataMerchant = result(navigation, 'state.params');
    const trxType = result(navigation, 'state.params.trxType', '');
    return <DecoratedForm
      login={login}
      navigation={navigation}
      isLogin={isLogin}
      triggerAuth={triggerAuth}
      genCode={genCode}
      dataMerchant={dataMerchant}
      emoneyAccounts={emoneyAccounts}
      formValues={formValues}
      trxType={trxType}
      transRefNum={transRefNum}
      generateCode={generateCode}
      goToSelectAcc={goToSelectAcc}
      goToGenerate={goToGenerate}
      errorData={this.errorData}
      thisState={this.state}
      billerLKD={billerLKD}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateFormOnboarPage);
