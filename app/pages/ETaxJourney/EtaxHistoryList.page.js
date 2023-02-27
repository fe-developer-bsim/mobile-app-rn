import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EtaxHistoryListComponent from '../../components/ETaxJourney/ETaxHistoryList.component';
import {connect} from 'react-redux';
import {idBillingPayment, getHistory, getEtaxImage, goToLanding} from '../../state/thunks/common.thunks';
import {isEmpty, result} from 'lodash';
import {reduxForm, destroy} from 'redux-form';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields} from '../../utils/validator.util';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';

const formConfig = {
  form: 'EtaxHistoryList',
  destroyOnUnmount: true,
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['jenisPajak', 'dateStart', 'dateEnd'])
    };
    return errors;
  },
  onSubmit: (values, dispatch) => {
    dispatch(getHistory(values));
  },
};

const mapStateToProps = (state) => ({
  formValues: result(state, 'form.EtaxPaymentType.values'),
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'),
  isLogin: !isEmpty(result(state, 'user', {})),
});

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(NavigationActions.back()),
  clearFitler: () => dispatch(destroy('EtaxHistoryFilter')),
  retryTransaction: (idBilling, biller) => () => {
    const data = {
      idBilling: idBilling
    };
    dispatch(idBillingPayment(data, biller));
  },
  downloadReceipt: (idBilling) => () => {
    dispatch(getEtaxImage(idBilling));
  },
  backHome: () => {
    dispatch(goToLanding());
  },
});

const DecoratedForm = reduxForm(formConfig)(EtaxHistoryListComponent);


class EtaxHistoryList extends Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    gotoPayment: PropTypes.func,
    formValues: PropTypes.object,
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    billerAccount: PropTypes.func,
    isLogin: PropTypes.bool,
    goBack: PropTypes.func,
    clearFitler: PropTypes.func,
    retryTransaction: PropTypes.func,
    downloadReceipt: PropTypes.func,
    backHome: PropTypes.func
  }
  
  render () {
    const {createIDBilling, gotoPayment, formValues, accounts, billerAccount, isLogin, goBack, clearFitler, navigation, retryTransaction, downloadReceipt, backHome} = this.props;
    return (
      <DecoratedForm
        createIDBilling={createIDBilling} gotoPayment={gotoPayment} formValues={formValues} accounts={accounts} retryTransaction={retryTransaction} backHome={backHome}
        billerAccount={billerAccount} isLogin={isLogin} goBack={goBack} clearFitler={clearFitler} navigation={navigation} downloadReceipt={downloadReceipt}

      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EtaxHistoryList);