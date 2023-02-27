import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ETaxPaymentTypeComponent from '../../components/ETaxJourney/ETaxHistoryFilter.component';
import {connect} from 'react-redux';
import {createIDBilling, getHistory} from '../../state/thunks/common.thunks';
import {isEmpty, result} from 'lodash';
import {reduxForm, destroy} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';

const formConfig = {
  form: 'EtaxHistoryFilter',
  destroyOnUnmount: true,
  onSubmit: (values, dispatch, {biller}) => {
    dispatch(getHistory(values, biller));
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.EtaxHistoryFilter.values'),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  isLogin: !isEmpty(result(state, 'user', {})),
  jenisPajak: result(state, 'etaxInformation.jenisPajak', []),
});

const mapDispatchToProps = (dispatch) => ({
  createIDBilling: () => dispatch(createIDBilling()),
  goBack: () => dispatch(NavigationActions.back()),
  clearFitler: () => dispatch(destroy('EtaxHistoryFilter')),
  billerAccount: () => dispatch(NavigationActions.navigate({routeName: 'BillerAccount', params: {formName: 'EtaxPaymentType', fieldName: 'accountNo', sourceType: 'genericBiller'}})),
  getHistory: (values, selectedDate, biller) => () => dispatch(getHistory(values, selectedDate, biller)),
});

const DecoratedForm = reduxForm(formConfig)(ETaxPaymentTypeComponent);


class EtaxHistoryFilter extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    formValues: PropTypes.object,
    accounts: PropTypes.array,
    billerAccount: PropTypes.func,
    isLogin: PropTypes.bool,
    goBack: PropTypes.func,
    clearFitler: PropTypes.func,
    navigation: PropTypes.object,
    jenisPajak: PropTypes.array,
    getHistory: PropTypes.func
  }
  
  render () {
    const {createIDBilling, navigation, gotoPayment, formValues, accounts, billerAccount, isLogin, goBack, clearFitler, jenisPajak, getHistory} = this.props;
    const biller = result(navigation, 'state.params.biller', {});
    return (
      <DecoratedForm
        createIDBilling={createIDBilling} gotoPayment={gotoPayment} formValues={formValues} accounts={accounts} jenisPajak={jenisPajak}
        billerAccount={billerAccount} isLogin={isLogin} goBack={goBack} clearFitler={clearFitler} biller={biller} getHistory={getHistory}

      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EtaxHistoryFilter);