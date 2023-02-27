import React from 'react';
import PropTypes from 'prop-types';
import AutoDebitList from '../../components/Account/AutoDebitList.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {setupFundTransfer} from '../../state/thunks/fundTransfer.thunks';
import {getAutodebitList, deleteAutoDebitList} from '../../state/thunks/dashboard.thunks';
import {dateList, generateAccountListLabel, getBillerPossibleAccounts} from '../../utils/transformer.util';
import {populateBillerData, getBillpayHistory} from '../../state/thunks/common.thunks';
import * as actionCreators from '../../state/actions/index.actions.js';
import {NavigationActions} from 'react-navigation';
import {editAutoDebit} from '../../state/thunks/genericBill.thunks';
import {reduxForm, change, reset} from 'redux-form';
import {validateRequiredFields} from '../../utils/validator.util';

const formConfig = {
  form: 'EditAutoDebit',
  destroyOnUnmount: false,
  validate: (values) => {
    const errors = validateRequiredFields(values, ['amount', 'date', 'autoDebitData', 'denomination']);
    return errors;
  },
  onSubmit: (values, dispatch, {editAutoDebit}) => {
    const accountNumber = result(values, 'autoDebitData.accountNumber', '');
    const subscriberNumber = result(values, 'autoDebitData.subscriberNumber', '');
    const fixAmount = result(values, 'denomination.id', result(values, 'amount', '0'));
    const nextRun = result(values, 'date.value', '');
    const billerCode = result(values, 'autoDebitData.merchantCode', '');
    const data = {
      accountNumber,
      subscriberNumber,
      fixAmount,
      nextRun,
      billerCode,
    };
    editAutoDebit(data);
  }
};

const mapStateToProps = (state) => ({
  autoDebitList: result(state, 'autoDebitList', []),
  billerConfig: result(state, 'billerConfig', []),
  accountList: getBillerPossibleAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.EditAutoDebit.values', {}),
});

const mapDispatchToProps = (dispatch) => ({
  deleteAutoDebitList: (data) => () => dispatch(deleteAutoDebitList(data)),
  getlistAutoDebit: () => dispatch(getAutodebitList()),
  selectExistingPayee: (payee) => dispatch(setupFundTransfer(payee)),
  reloadHistory: () => dispatch(getAutodebitList()),
  getBillerData: () => dispatch(populateBillerData()),
  goToBiller: (isAddNew) => {
    dispatch(getBillpayHistory());
    dispatch(actionCreators.saveFlagAutodebit({isRegular: isAddNew, isAddNew: isAddNew}));
    dispatch(NavigationActions.navigate({routeName: 'GenericBiller', params: {isAutoDebit: true}}));
  },
  resetFlow: () => {
    dispatch(actionCreators.saveFlagAutodebit({isAddNew: false}));
  },
  goToDetail: (data) => dispatch(NavigationActions.navigate({routeName: 'DetailAutodebit', params: data})),
  editAutoDebit: (data) => dispatch(editAutoDebit(data, true)),
  setSelectedAccount: (account) => dispatch(change('EditAutoDebit', 'account', account)),
  setSelectedAutodebit: (autoDebitData) => dispatch(change('EditAutoDebit', 'autoDebitData', autoDebitData)),
  setSelectedDate: (date) => dispatch(change('EditAutoDebit', 'date', date)), // optional
  setSelectedAmount: (amount) => dispatch(change('EditAutoDebit', 'amount', amount)), // optional
  resetForm: () => dispatch(reset('EditAutoDebit')),
});

const DecoratedForm = reduxForm(formConfig)(AutoDebitList);
class AutoDebitListPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    deleteAutoDebitList: PropTypes.func,
    getlistAutoDebit: PropTypes.func,
    getAutodebitList: PropTypes.func,
    reloadHistory: PropTypes.func,
    autoDebitList: PropTypes.object,
    accountList: PropTypes.array,
    billerConfig: PropTypes.array,
    getBillerData: PropTypes.func,
    goToDetail: PropTypes.func,
    goToBiller: PropTypes.func,
    resetFlow: PropTypes.func,
    editAutoDebit: PropTypes.func,
    setSelectedAccount: PropTypes.func,
    resetForm: PropTypes.func,
    setSelectedAutodebit: PropTypes.func,
  }

  state = {
    disabled: false
  }

  componentWillMount () {
    this.props.getlistAutoDebit();
    this.props.getBillerData();
  }

  componentWillUnmount () {
    this.props.resetFlow();
  }

  render () {
    const {navigation, getlistAutoDebit, autoDebitList, goToDetail, goToBiller, editAutoDebit, setSelectedAutodebit,
      setSelectedAccount, deleteAutoDebitList, reloadHistory, accountList, billerConfig, resetForm} = this.props;
    const isEdit = result(navigation, 'state.params.isEdit', false);
    const transformedAccList = generateAccountListLabel(accountList);
    const billerList = result(billerConfig, 'billerList', []);
    return <DecoratedForm
      navigation={navigation} deleteAutoDebitList={deleteAutoDebitList} reloadFavorite={getlistAutoDebit} reloadHistory={reloadHistory}
      isEdit={isEdit} autoDebitList={autoDebitList} accountList={transformedAccList} dateList={dateList} resetForm={resetForm}
      billerList={billerList} goToDetail={goToDetail} goToBiller={goToBiller} editAutoDebit={editAutoDebit} setSelectedAutodebit={setSelectedAutodebit}
      setSelectedAccount={setSelectedAccount}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoDebitListPage);
