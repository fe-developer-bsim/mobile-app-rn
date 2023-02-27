import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, destroy} from 'redux-form';
import SILForm3, {fields} from '../../components/InvestmentJourney/SILeSPAJForm3.component';
import {validateRequiredFields, validateBalance, validateMonthlyIncome, isInRange} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {isEmpty, startsWith, result, sortBy, find} from 'lodash';
import {getDataOptions} from '../../utils/middleware.util';
import {NavigationActions} from 'react-navigation';
import {saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {getTransferPossibleAccountsSILMulti} from '../../utils/transformer.util';

const formConfig = {
  form: 'SileSPAJForm3',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, silIdrUsd, checkboxArray) => {
    const isSilIdrUsd = result(silIdrUsd, 'isSilIdrUsd', '');
    if (isSilIdrUsd === 'IDR') {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisForm4IDR'}));
      dispatch(destroy('SileSPAJForm4'));
    } else {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisForm4USD'}));
      dispatch(destroy('SileSPAJForm4'));
    }
    const dataCollected = {
      formName: 'SileSPAJForm3',
      dataBody: {
        checkboxArray: checkboxArray,
        pekerjaan: values.pekerjaan,
        penghasilanKantor: values.penghasilanKantor,
        sourceOfFund: values.myAccount,
        pekerjaanLainnya: values.pekerjaanLainnya
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },

  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.JOB_TYPE, fields.MONTHLY_INCOME, fields.SOURCE_OF_FUND, fields.OTHER_JOB])
    };
    return {
      monthlyIncome: validateMonthlyIncome(values.monthlyIncome),
      ...errors,
    };
  }
};

const mapStateToProps = (state, props) => ({
  jobOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listJobConfig', {})), ['id']),
  monthlyIncome: result(state, 'form.SileSPAJForm3.values.monthlyIncome', ''),
  sourceOfFund: result(state, 'form.SileSPAJForm3.values.myAccount', ''),
  listWorker: result(state, 'configEForm.listConfigEform.listWorker', []),
  listSourceOfFund: result(state, 'configEForm.listConfigEform.sourceOfFund', []),
  isLogin: !isEmpty(result(state, 'user', {})),
  accountList: result(state, 'accounts', []),
  cifCode: result(state, 'user.profile.customer.cifCode', ''),
  dropList: result(state, 'getDropList.dropDownList', {}),
  formValues: result(state, 'form.SileSPAJForm3.values', ''),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  workValue: result(state, 'form.SileSPAJForm3.values.pekerjaan.value', ''),
  totalPremi: result(state, 'form.SilIustrasiForm2.values.amount', ''),
  flagCrossCurrency: result(state, 'config.flag.flagCrossCurrency', 'INACTIVE'),
  accountsTransfer: getTransferPossibleAccountsSILMulti(result(state, 'accounts', []), 'ft', result(props, 'navigation.state.params.payee', {}), result(props, 'navigation.state.params.currency', {}), result(props, 'navigation.state.params.isOpenCrossCurrency', {}), result(state, 'silIdrUsd', '')),
});

const eSPAJSILForm3 = reduxForm(formConfig)(SILForm3);

const ConnectedForm = connect(mapStateToProps, null)(eSPAJSILForm3);

class SmartInvestaLinkForm3 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    listWorker: PropTypes.array,
    listSourceOfFund: PropTypes.array,
    isLogin: PropTypes.bool,
    accountList: PropTypes.array,
    cifCode: PropTypes.string,
    dropList: PropTypes.object,
    flagCrossCurrency: PropTypes.bool,
    getSourceAcc: PropTypes.func,
    formValues: PropTypes.object,
    totalPremi: PropTypes.string,
    workValue: PropTypes.object,
    isSilIdrUsd: PropTypes.string,
    accountsTransfer: PropTypes.array,

  }

  state = {
    numberOfDependant2: 0,
    checkboxArray: []
  }

  changeCheckboxArray = (checkbox) => {
    this.setState({checkboxArray: checkbox});
  }
 


  render () {
    const {navigation, listWorker, listSourceOfFund, isLogin,
      accountList, cifCode, dropList, totalPremi, formValues, workValue, accountsTransfer} = this.props;
    const isEmoneyKyc = !isEmpty(find(accountList, {accountType: 'emoneyAccount'})) && !startsWith(cifCode, 'NK');
    const accountBalance = result(formValues, 'myAccount.balances.availableBalance', {});
    const errors = [];
    const amount = validateBalance(accountBalance, totalPremi);
    errors['amountLess'] = totalPremi < accountBalance ? (isInRange(totalPremi, accountBalance, totalPremi)) : undefined;
    errors['amount'] = amount;
    const disabled = isEmpty(result(formValues, 'myAccount', {}));

    return (
      <ConnectedForm
        navigation={navigation}
        listWorker={listWorker}
        listSourceOfFund={listSourceOfFund}
        isLogin={isLogin}
        addQuantity={this.addQuantity}
        minusQuantity={this.minusQuantity}
        numberOfDependant2={this.state.numberOfDependant2}
        isEmoneyKyc={isEmoneyKyc}
        dropList={dropList}
        checkboxArray={this.state.checkboxArray}
        changeCheckboxArray={this.changeCheckboxArray}
        totalPremi={totalPremi}
        formValues = {formValues}
        workValue = {workValue}
        errors={errors}
        disabled={disabled}
        accountsTransfer={accountsTransfer}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, null)(SmartInvestaLinkForm3);
export default ConnectedFormPage;