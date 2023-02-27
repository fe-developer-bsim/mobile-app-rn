import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmallTxInfo from '../../components/Emall/EmallTxInfo.component';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'), 
  fareDepart: result(state, 'flightFareDetail1', {}),
  fareReturn: result(state, 'flightFareDetail2', {}),
});

const mapDispatchToProps = () => ({
});

class EmallTxInfoPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    fareDepart: PropTypes.object,
    fareReturn: PropTypes.object,
  };

  render () {
    const {navigation, accounts, fareDepart, fareReturn} = this.props;
    return <EmallTxInfo navigation={navigation} accounts={accounts} fareDepart={fareDepart} fareReturn={fareReturn} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallTxInfoPage);
