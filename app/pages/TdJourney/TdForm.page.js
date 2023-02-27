import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import TdForm from '../../components/TdJourney/TdForm.component';
import {validateRequiredFields, isInRangeTd, validateMaxTransactionAmountTd} from '../../utils/validator.util';
import {getUnformattedAccountAmount, getTdTypeOptions, getTransferPossibleAccountsTd, checkShariaAccount, generateMinTD} from '../../utils/transformer.util';
import {faqTd} from '../../state/thunks/dashboard.thunks';
import {language} from '../../config/language';
import map from 'lodash/map';
import split from 'lodash/split';

const formConfig = {
  form: 'TdForm',
  destroyOnUnmount: false,
  validate: (values, props) => {
    props.setIsDisabled();
    let errors = {
      ...validateRequiredFields(values, ['accountNo', 'amount', 'maturityType', 'termAndCondition', 'periodeList']),
    };
    // const minimum = props.currency === 'IDR' ? props.minimumDeposit : props.currency === 'USD' ? props.minCurrency.USD : props.currency === 'AUD' ? props.minCurrency.AUD : props.minimumDeposit;
    const minimum = generateMinTD(props.minCurrency, props.currency);
    return {
      amount: isInRangeTd(parseInt(minimum), props.availableBalance, values.amount, props.currency) || validateMaxTransactionAmountTd(values.amount, result(props, 'tokenConfig', []), 'own', props.currency),
      ...errors
    };
  },
  initialValues: {
    accountNo: {},
    amount: '',
    maturityType: '',
    termAndCondition: '',
    periodeList: []
  },

  onSubmit: (values, dispatch, props) => dispatch(faqTd(values, props.isShariaAccount))
};

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
  formValues: result(state, 'form.TdForm.values', {}),
  maturityInstructionListConv: result(state, 'tdConfig.conventionalConfig.maturityInstructionList', []),
  maturityInstructionListSharia: result(state, 'tdConfig.shariaConfig.maturityInstructionList', []),
  appConfig: result(state, 'config', {}),
  depositPeriodListConv: result(state, 'tdConfig.conventionalConfig.depositPeriodList', []),
  tenorRate: result(state, 'tdConfig.conventionalConfig.tenorRate', []),
  depositPeriodListSharia: result(state, 'tdConfig.shariaConfig.depositPeriodList', []),
  minimumDepositSha: result(state, 'tdConfig.shariaConfig.minimumDeposit', ''),
  minimumDepositConv: result(state, 'tdConfig.conventionalConfig.minimumDeposit', ''),
  rateConv: result(state, 'tdConfig.conventionalConfig.rate', ''),
  rateSha: result(state, 'tdConfig.shariaConfig.rate', ''),
  minimumDepositVal: result(state, 'tdConfig.conventionalConfig.minimumDepositValas', []),
  rateValas: result(state, 'tdConfig.conventionalConfig.rateValas', ''),
  tenorRateAUD: result(state, 'tdConfig.conventionalConfig.tenorRateAUD', {}),
  tenorRateCNY: result(state, 'tdConfig.conventionalConfig.tenorRateCNY', {}),
  tenorRateEUR: result(state, 'tdConfig.conventionalConfig.tenorRateEUR', {}),
  tenorRateJPY: result(state, 'tdConfig.conventionalConfig.tenorRateJPY', {}),
  tenorRateSGD: result(state, 'tdConfig.conventionalConfig.tenorRateSGD', {}),
  tenorRateUSD: result(state, 'tdConfig.conventionalConfig.tenorRateUSD', {}),  
  tenorRateSyariah: result(state, 'tdConfig.shariaConfig.ecrRate', []),
  nisbahBank: result(state, 'tdConfig.shariaConfig.nisbahBank', []),
  nisbahCust: result(state, 'tdConfig.shariaConfig.nisbahCust', []),
});


const mapDispatchToProps = (dispatch) => ({
  termAndConditionPage: () => dispatch(faqTd()),
  changeTdPeriodList: () => () => {
    dispatch(change('TdForm', 'periodeList', {}));
    dispatch(change('TdForm', 'maturityType', {}));
    dispatch(change('TdForm', 'amount', ''));
    dispatch(change('TdForm', 'termAndCondition', {}));
  }
});

const DecoratedTdForm = reduxForm(formConfig)(TdForm);

class TdFormPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    maturityInstructionListConv: PropTypes.array,
    maturityInstructionListSharia: PropTypes.array,
    depositPeriodListSharia: PropTypes.array,
    depositPeriodListConv: PropTypes.array,
    termAndConditionPage: PropTypes.func,
    appConfig: PropTypes.object,
    minimumDepositSha: PropTypes.number,
    minimumDepositConv: PropTypes.number,
    minimumDeposit: PropTypes.number,
    rateConv: PropTypes.number,
    rateSha: PropTypes.number,
    changeTdPeriodList: PropTypes.func,
    tenorRate: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]),
    rateValas: PropTypes.string,
    minimumDepositVal: PropTypes.array,
    minCurrency: PropTypes.object,
    tenorRateAUD: PropTypes.object,
    tenorRateCNY: PropTypes.object,
    tenorRateEUR: PropTypes.object,
    tenorRateJPY: PropTypes.object,
    tenorRateSGD: PropTypes.object,
    tenorRateUSD: PropTypes.object,  
    tenorRateSyariah: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]),
    nisbahBank: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]),
    nisbahCust: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.array]),
  
  };

  state = {
    isDisabled: true
  }

  setIsDisabled = () => () => {
    const accountNo = result(this.props, 'formValues.accountNo', {});
    if (!isEmpty(accountNo)) {
      this.setState({isDisabled: false});
    } else {
      this.setState({isDisabled: true});
    }
  }

  render () {
    const {accounts = {}, formValues = {}, maturityInstructionListConv = [],
      maturityInstructionListSharia = [], navigation, termAndConditionPage, changeTdPeriodList, appConfig, rateConv, rateSha, minimumDepositSha, minimumDepositConv, depositPeriodListSharia = [], depositPeriodListConv = [],
      tenorRate = {}, rateValas, minimumDepositVal, tenorRateAUD, tenorRateUSD, tenorRateSGD, tenorRateJPY, tenorRateEUR, tenorRateCNY, tenorRateSyariah = {}, nisbahBank = {}, nisbahCust = {}} = this.props;
    const savingAccounts = getTransferPossibleAccountsTd(accounts, 'td'); // foo now only allowed for IDR and only from savings
    const availableBalance = getUnformattedAccountAmount(formValues['accountNo']);
    const isShariaAccount = checkShariaAccount(formValues['accountNo']);
    const currency = result(formValues, 'accountNo.currency', '');
    const tokenConfig = result(appConfig, 'tokenConfig', {});
    const tdAccountType = isShariaAccount ? maturityInstructionListSharia : maturityInstructionListConv;
    const tdPeriod = isShariaAccount ? depositPeriodListSharia : depositPeriodListConv;
    const minimumDeposit = isShariaAccount ? minimumDepositSha : minimumDepositConv;
    const ValasRate = rateValas.substr(1, rateValas.length - 1);
    const rateVal = split(ValasRate, ';');
    const newRateSha = rateVal;
    const newRate = currency === 'IDR' ? tenorRate : currency === 'AUD' ? tenorRateAUD : currency === 'USD' ? tenorRateUSD : currency === 'SGD' ? tenorRateSGD : currency === 'JPY' ? tenorRateJPY : currency === 'EUR' ? tenorRateEUR : currency === 'CNY' ? tenorRateCNY : rateVal;
    const rate = isShariaAccount ? rateSha : !isShariaAccount && currency === 'IDR' ? rateConv : rateValas;
    const termAndCondition = [{
      label: language.TIME_DEPOSIT__TERMS_AND_CONDITIONS,
      value: true
    }];
    const isOBMPassword = result(navigation, 'state.params.isOBMPassword', false);
    let minCurrency = {};
    map(minimumDepositVal, (obj) => {
      const currency = obj.currency;
      const minimum = obj.minimum;
      minCurrency = {...minCurrency, [`${currency}`]: minimum};
    });
    const openTdHolidayWarning = result(navigation, 'state.params.openTdHolidayWarning', '');
    return <DecoratedTdForm
      formValues={formValues}
      availableBalance={availableBalance}
      savingAccounts={savingAccounts}
      tdTypeOptions={getTdTypeOptions(tdAccountType)}
      tdPeriodList={tdPeriod}
      isShariaAccount={isShariaAccount}
      termAndCondition={termAndCondition}
      openTdHolidayWarning={openTdHolidayWarning}
      termAndConditionPage={termAndConditionPage}
      changeTdPeriodList={changeTdPeriodList}
      tokenConfig={tokenConfig}
      minimumDeposit={minimumDeposit}
      rate={rate}
      isDisabled={this.state.isDisabled}
      setIsDisabled={this.setIsDisabled()}
      tenorRate= {tenorRate}
      currency={currency}
      minimumDepositVal={minimumDepositVal}
      minCurrency={minCurrency}
      rateValas={rateValas}
      newRate={newRate}
      isOBMPassword={isOBMPassword}      
      tenorRateSyariah={tenorRateSyariah}
      tenorNisbahBank={nisbahBank}
      tenorNisbahCust={nisbahCust}
      newRateSha={newRateSha}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TdFormPage);
