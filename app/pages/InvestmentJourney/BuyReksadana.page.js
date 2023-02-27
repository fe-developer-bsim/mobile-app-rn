import React from 'react';
import PropTypes from 'prop-types';
import BuyReksadana from '../../components/InvestmentJourney/BuyReksadana.component';
import {investmentDataView} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {reduxForm} from 'redux-form';
import {validateRequiredFields, validateMinAmount, isInRange, validateMaxSubsMedalion} from '../../utils/validator.util';
import isEmpty from 'lodash/isEmpty';
import {getTransferPossibleAccountsReksadana} from '../../utils/transformer.util';

const formConfig = {
  form: 'buyReksadana',
  destroyOnUnmount: false,
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['amount']),
    };
    return { 
      ...errors
    };
  }
};

const DecoratedReksadana = reduxForm(formConfig)(BuyReksadana);

const mapStateToProps = (state) => ({
  accountList: getTransferPossibleAccountsReksadana(result(state, 'accounts', []), 'bp'),  
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  formValues: result(state, 'form.buyReksadana.values', {}),
  amountInputReksadana: result(state, 'form.buyReksadana.values.amount', ''),
  appConfig: result(state, 'config', {}),
});

class BuyReksadanaform extends React.Component {
  static propTypes = {
    investmentDataView: PropTypes.func,
    goToConfirmation: PropTypes.func,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    appConfig: PropTypes.object,
    navigation: PropTypes.object,
    onNext: PropTypes.func, 
    amountInputReksadana: PropTypes.string
  }

  onNext = () => {
    const {goToConfirmation, formValues, navigation} = this.props;
    const item = result(navigation, 'state.params.item', {});    
    goToConfirmation(formValues, item);
  }

  selectSourceAcc = () => () => {
    const {navigation, getSourceAcc} = this.props;
    const item = result(navigation, 'state.params.item', {});    
    getSourceAcc(item);
  }

  render () {
    const {getSourceAcc, formValues, navigation, amountInputReksadana, appConfig} = this.props;
    const disabled = isEmpty(result(formValues, 'myAccount', {}));
    const item = result(navigation, 'state.params.item', {});
    const tokenConfig = result(appConfig, 'reksadanaConfig', {});
    const transferChargeConfig = result(appConfig, 'reksadanaConfig.1', {});
    const chooseAcc = isEmpty(result(formValues, 'myAccount', {}));
    const maxAmountError = validateMaxSubsMedalion(formValues.amount, transferChargeConfig);    
    const sendAccountAvailableBalance = result(formValues, 'myAccount.balances.availableBalance', '');
    const minTopUp = result(item, 'detailPortfolio.portfolio.0.Subscription_Min_Next', 0);
    const fundCurrency = result(item, 'detailPortfolio.portfolio.0.Fund_Currency', '');
    const isTypeCurrency = fundCurrency === 'IDR' ? 'Rp' : '$';
    const errorMsg = validateMinAmount(amountInputReksadana, minTopUp, sendAccountAvailableBalance, chooseAcc, isTypeCurrency);
    let errors = [];
    errors['ammountLess'] = amountInputReksadana < sendAccountAvailableBalance ? (isInRange(amountInputReksadana, sendAccountAvailableBalance, amountInputReksadana)) : undefined;
    errors['amount'] = errorMsg;
    errors['amountMaxMedal'] = maxAmountError;

    return (
      <DecoratedReksadana formValues={formValues} goToConfirmation={this.onNext} getSourceAcc={getSourceAcc}
        disabled={disabled} item={item} errorMsg={errorMsg} errors={errors} sendAccountAvailableBalance={sendAccountAvailableBalance} selectSourceAcc={this.selectSourceAcc()}
        tokenConfig={tokenConfig}/>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  investmentDataView: (code) => () => dispatch(investmentDataView(code)),
  getSourceAcc: (item) => {
    dispatch(NavigationActions.navigate({
      routeName: 'SourceAccountReksadana',
      params: {formName: 'buyReksadana', fieldName: 'myAccount', sourceType: 'genericBiller', item: item}      
    }));
  },
  goToConfirmation: (formValues, item) => {
    dispatch(NavigationActions.navigate({
      routeName: 'BuyReksadanaConfirmation',
      params: {formValues: formValues, item: item}    
    }));
  }
});

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(BuyReksadanaform);
export default connectedTransfer;
