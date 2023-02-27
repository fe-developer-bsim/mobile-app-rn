import React from 'react';
import PropTypes from 'prop-types';
import SellReksadana from '../../components/InvestmentJourney/SellReksadana.component';
import {investmentDataView, getRedemptionFee} from '../../state/thunks/dashboard.thunks';
import result from 'lodash/result';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import {validateRequiredFields, validateMinRedemp} from '../../utils/validator.util';
import find from 'lodash/find';

const formConfig = {
  form: 'sellReksadana',
  destroyOnUnmount: false,
  validate: (values, {formValues, redempMinUnit, redempMinAmount, totalUnit, editableInput, NABPerUnit, numberOfUnit, redemptMinBalanceUnit}) => {
    const amountInput = result(formValues, 'amount', '');
    let errors = {
      ...validateRequiredFields(values, ['amount']),
    }; 
    return {
      amount: validateMinRedemp(amountInput, redempMinUnit, redempMinAmount, totalUnit, editableInput, NABPerUnit, numberOfUnit, redemptMinBalanceUnit),
      ...errors
    };
  }
};

const DecoratedReksadana = reduxForm(formConfig)(SellReksadana);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(DecoratedReksadana);

const mapStateToProps = (state) => ({
  accountList: result(state, 'accounts', []),
  currentLanguage: result(state, 'currentLanguage.id', 'id'),
  formValues: result(state, 'form.sellReksadana.values', {}),
});


const mapDispatchToProps = (dispatch) => ({
  investmentDataView: (code) => () => dispatch(investmentDataView(code)),
  goToConfirmation: (formValues, item, editableInput) => {
    dispatch(getRedemptionFee(formValues, item, editableInput));
  },
  prefilledUnit: (CustomerUnitPenyertaan) => {
    dispatch(change('sellReksadana', 'amount', CustomerUnitPenyertaan));
  },
  clearUnit: () => {
    dispatch(change('sellReksadana', 'amount', ''));
  },
  prefilledAccount: (data) => {
    dispatch(change('sellReksadana', 'accountNumber', result(data, 'accountNumber', '')));
    dispatch(change('sellReksadana', 'name', result(data, 'name', '')));
    dispatch(change('sellReksadana', 'productType', result(data, 'productType', '')));
  }
});

class SellReksadanaform extends React.Component {
  static propTypes = {
    investmentDataView: PropTypes.func,
    goToConfirmation: PropTypes.func,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    onNext: PropTypes.func,
    prefilledUnit: PropTypes.func,
    clearUnit: PropTypes.func,
    accountList: PropTypes.array,
    prefilledAccount: PropTypes.func
  }

  state = {
    editableInput: false,
    summaryCollapsed: true
  }

  onNext = () => {
    const {goToConfirmation, formValues, navigation} = this.props;
    const item = result(navigation, 'state.params.item', {});
    const flag = this.state.editableInput;
    goToConfirmation(formValues, item, flag);
  }

  unitAll = (CustomerUnitPenyertaan) => () => {
    const {prefilledUnit} = this.props;
    const customerUnit = CustomerUnitPenyertaan.toString();
    if (customerUnit === '0') {
      return '';
    }
    this.setState({editableInput: true, summaryCollapsed: true});
    prefilledUnit(customerUnit);
  }

  unitInput = () => {
    const {clearUnit} = this.props;
    clearUnit();
    this.setState({editableInput: false, summaryCollapsed: true});
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: false});
  }

  componentWillMount () {
    const {navigation, accountList, prefilledAccount} = this.props;
    const item = result(navigation, 'state.params.item', {});
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const sendAccountNumber = result(detailPortfolio, 'portfolio.0.Bank_Account', '');
    prefilledAccount(find(accountList, {accountNumber: sendAccountNumber}));
  }


  render () {
    const {formValues, navigation, accountList} = this.props;
    const item = result(navigation, 'state.params.item', {});
    const redempMinAmount = result(item, 'detailPortfolio.portfolio.0.Redemption_Min_Amt', 0);
    const errorMsg = '';
    const detailPortfolio = result(item, 'detailPortfolio', {});
    const NABPerUnit = result(detailPortfolio, 'portfolio.0.NAB_Per_Unit', 0);
    const summary = result(item, 'summaryPortfolio', {});
    const totalUnit = result(summary, 'Customer_Unit_Penyertaan', 0);
    const numberOfUnit = result(detailPortfolio, 'portfolio.0.Customer_Unit_Available', 0);
    const redemAll = result(navigation, 'state.params.editableInput', false);
    const redempMinUnit = result(item, 'detailPortfolio.portfolio.0.Redemption_Min_Unit');
    const convertIfBalUnitEmpty = result(item, 'detailPortfolio.portfolio.0.Convert_Redemption_Min_Bal_Unit', 0);
    const valueUnitIsReady = result(item, 'detailPortfolio.portfolio.0.Redemption_Min_Bal_Unit', 0);
    const redemptMinBalanceUnit = valueUnitIsReady === 0 ? convertIfBalUnitEmpty : valueUnitIsReady;

    return (
      <ConnectedForm formValues={formValues} goToConfirmation={this.onNext}
        item={item} amountChange={this.amountChange} unitAll={this.unitAll} unitInput={this.unitInput}
        editableInput={this.state.editableInput} accountList={accountList} errorMsg={errorMsg} redempMinUnit={redempMinUnit}
        redempMinAmount={redempMinAmount} NABPerUnit={NABPerUnit} totalUnit={totalUnit} numberOfUnit={numberOfUnit} 
        redemAll={redemAll} summaryCollapsed={this.state.summaryCollapsed} summaryCollapse={this.summaryCollapse} redemptMinBalanceUnit={redemptMinBalanceUnit}/> 
    );
  }
}

const connectedTransfer = connect(mapStateToProps, mapDispatchToProps)(SellReksadanaform);
export default connectedTransfer;