import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmallCgvInfo from '../../components/Emall/EmallCgvInfo.component';
import {getTransferPossibleAccounts} from '../../utils/transformer.util';

const mapStateToProps = (state) => ({
  accounts: getTransferPossibleAccounts(result(state, 'accounts', []), 'bp'), 
  simasPoin: result(state, 'simasPoin', {}),
  cgvCoupon: result(state, 'cgvCoupon', {}),
});

const mapDispatchToProps = () => ({
});

class EmallCgvInfoPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    accounts: PropTypes.array,
    simasPoin: PropTypes.object,
    getConfirmSimas: PropTypes.func,
    cgvCoupon: PropTypes.object,
    triggerAuth: PropTypes.func,
    goTrigger: PropTypes.func,
    getResult: PropTypes.func,
  };

  render () {
    const {navigation, accounts, simasPoin, cgvCoupon} = this.props;
    return <EmallCgvInfo navigation={navigation} accounts={accounts} cgvCoupon={cgvCoupon}
      simasPoin={simasPoin} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmallCgvInfoPage);
