import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TransactionsDetail from '../../components/Transactions/DetailTransaction.component';
import result from 'lodash/result';

class DetailTransactionsPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }
  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <TransactionsDetail  navParams={navParams}/>;
  }
}

export default DetailTransactionsPage;
