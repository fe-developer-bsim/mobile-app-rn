import React from 'react';
import PropTypes from 'prop-types';
import AutoDebitComponent from '../../components/Home/SetDefaultAutoDebit.component';
import {connect} from 'react-redux';
import {setToogleAutoDebitAccount, offerOpeningAccount} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import {getTransferPossibleAccountsToSetDefaultAccount} from '../../utils/transformer.util';

const mapStateToProps = (state) => ({
  toogleDefaultAccount: result(state, 'primaryToogleAccount', false),
  accountList: getTransferPossibleAccountsToSetDefaultAccount(result(state, 'accounts', []), 'bp')
});

const mapDispatchToProps = (dispatch) => ({
  setChangeToogleAutoDebit: (state) => () => {
    dispatch(setToogleAutoDebitAccount(state));
  },
  offerOpeningAccount: () => {
    dispatch(offerOpeningAccount());
  }
});
class AutoDebitPage extends React.Component {
  static propTypes = {
    setChangeToogleAutoDebit: PropTypes.func,
    toogleDefaultAccount: PropTypes.bool,
    accountList: PropTypes.array,
    offerOpeningAccount: PropTypes.func
  }

  render () {
    const {setChangeToogleAutoDebit, toogleDefaultAccount, accountList, offerOpeningAccount} = this.props;
    return <AutoDebitComponent setChangeToogleAutoDebit={setChangeToogleAutoDebit} offerOpeningAccount={offerOpeningAccount} accountList={accountList} toogleDefaultAccount={toogleDefaultAccount}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoDebitPage);