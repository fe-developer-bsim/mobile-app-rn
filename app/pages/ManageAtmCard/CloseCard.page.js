import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CloseCardComponent from '../../components/ManageAtmCard/CloseCard.component';
import {getAllAccountsExceptGiro, getSavingValasPossibleAccounts} from '../../utils/transformer.util';
import {getClosingDetail} from '../../state/thunks/dashboard.thunks';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = (state) =>
  ({
    filteredAccountSavingValas: getAllAccountsExceptGiro(result(state, 'closeAccountConfig.closingAccountException', []), getSavingValasPossibleAccounts(result(state, 'accounts', []), 'ft')),
    curr: result(state, 'closeAccountConfig.closingAccountException', [])
  });

const mapDispatchToProps = (dispatch) => ({
  getAccountData: (values, isOneAcc) => {
    dispatch(getClosingDetail(values, isOneAcc)); 
  },
});

class CloseCardPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    getAccountData: PropTypes.func,
    checkAccounts: PropTypes.func,
    filteredAccountSavingValas: PropTypes.array,
    curr: PropTypes.array
  };

  selectData = (values) => {
    const {getAccountData, filteredAccountSavingValas, curr} = this.props;
    const chosenAccount = result(values, 'accountNumber', '');
    const chosenCurrency = result(values, 'currency', '');

    if (chosenCurrency === 'IDR') {
      const isOneAccIdr = filter(filteredAccountSavingValas, (x) => !curr.includes(x.currency)); 
      const filteredIdr = filter(isOneAccIdr, (x) => !chosenAccount.includes(x.accountNumber)); 
      const IDR = isEmpty(filteredIdr);

      if (IDR === true) {
        const isOneAcc = 'true';
        getAccountData(values, isOneAcc);
      } else {
        const isOneAcc = 'false';
        getAccountData(values, isOneAcc);
      }
    } else {
      const isOneAccValas = filter(filteredAccountSavingValas, (x) => curr.includes(x.currency)); 
      const chosenValas = filter(isOneAccValas, (x) => chosenCurrency.includes(x.currency)); 
      const filteredValas = filter(chosenValas, (x) => !chosenAccount.includes(x.accountNumber));
      const checkValas = isEmpty(filteredValas);

      if (checkValas === true) {
        const isOneAcc = 'true';
        getAccountData(values, isOneAcc);
      } else {
        const isOneAcc = 'false';
        getAccountData(values, isOneAcc);
      }
    }
  }

  render () {
    const {navigation, filteredAccountSavingValas} = this.props;

    return <CloseCardComponent
      navigation={navigation}
      getAccountData={this.selectData}
      filteredAccountSavingValas={filteredAccountSavingValas}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseCardPage);
