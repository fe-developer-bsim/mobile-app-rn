import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import SmartInvestaLinkInfoProductComponent, {fields} from '../../components/InvestmentJourney/SILIlustrasiForm2.component';
import {result, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {getMoneyInsuredSil, saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {validateRequiredFields, validateNumber} from '../../utils/validator.util';


const formConfig = {
  form: 'SilIustrasiForm2',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, silIdrUsd, checkboxArray) => {
    const isSilIdrUsd = result(silIdrUsd, 'isSilIdrUsd', '');
    if (isSilIdrUsd === 'IDR') {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkIDRPolis'}));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkUSDPolis'}));
    }
    const dataCollected = {
      formName: 'SilIustrasiForm2',
      dataBody: {
        checkboxArray: checkboxArray,
        amount: values.amount,
        investa: values.investa,
        income: values.income,
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },
  validate: (values) => {
   
    const errors = {
      ...validateRequiredFields(values, [fields.AMOUNT])
    };

    const fieldArrowError = {
      ...validateRequiredFields(values, [fields.INVESTA, fields.INCOME])
    };
    return {
      ...errors,
      ...fieldArrowError,
    };
  }
};

const mapStateToProps = (state) => ({
  selectedAccount: result(state, 'form.MobilePostpaidPaymentForm.values.accountNumber', {}),
  totalPremi: result(state, 'form.SilIustrasiForm2.values.amount', ''),
  listProduct: result(state, 'getProductListSil', {}),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  moneyInsured: result(state, 'getMoneyInsuredSil.pertanggungan', ''),
  response: result(state, 'getMoneyInsuredSil', {}),
  monthIncome: result(state, 'form.SilIustrasiForm2.values.income', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getAmount: () => dispatch(getMoneyInsuredSil()),
});

const SmartInvestaLinkInfoProdukPage = reduxForm(formConfig)(SmartInvestaLinkInfoProductComponent);

class SmartInvestaLinkDetail extends React.Component {
  static propTypes = {
    isSilIdrUsd: PropTypes.string,
    totalPremi: PropTypes.string,
    moneyInsured: PropTypes.number,
    getAmount: PropTypes.func,
    listProduct: PropTypes.array,
    response: PropTypes.array,
    monthIncome: PropTypes.object
  }

  state = {
    checkboxArray: [],
    iserror: false,
    listProductIdrUsd: {}
  }

  changeCheckboxArray = (checkbox) => {
    this.setState({checkboxArray: checkbox});
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('amount' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  onthisChangeAmount=() => {
    if (this.props.totalPremi === '') {
      this.setState.iserror;
    } else {
      this.props.getAmount();
    }
  }
  
  componentWillMount () {
    const {isSilIdrUsd, listProduct} = this.props;
    const productIdrUsd = isSilIdrUsd === 'IDR' ? (result(listProduct, 'listProduct.0.listProdDetail.0', {})) : (result(listProduct, 'listProduct.1.listProdDetail.0', {})); 
    this.setState({listProductIdrUsd: productIdrUsd});
  }

  render () {
    const {isSilIdrUsd, totalPremi, moneyInsured, listProduct, response, monthIncome} = this.props;

    return <SmartInvestaLinkInfoProdukPage
      validationInput={this.validationInput}
      isSilIdrUsd = {isSilIdrUsd}
      totalPremi={totalPremi}
      moneyInsured={moneyInsured}
      getAmount={this.onthisChangeAmount}
      listProduct={listProduct}
      checkboxArray={this.state.checkboxArray}
      changeCheckboxArray={this.changeCheckboxArray}
      response={response}
      monthIncome={monthIncome}
      listProductIdrUsd={this.state.listProductIdrUsd}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkDetail);
