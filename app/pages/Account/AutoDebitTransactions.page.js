import React from 'react';
import PropTypes from 'prop-types';
import AutoDebitTransactions from '../../components/Account/AutoDebitTransactions.component';
import {connect} from 'react-redux';
import result from 'lodash/result';

const mapStateToProps = () => ({

});

const mapDispatchToProps = () => ({
  
});

class AutoDebitTransactionsPage extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const transactionList = result(navigation, 'state.params.transactionList', []);
    return <AutoDebitTransactions
      navigation={navigation}
      transactionList={transactionList}
    />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoDebitTransactionsPage);
