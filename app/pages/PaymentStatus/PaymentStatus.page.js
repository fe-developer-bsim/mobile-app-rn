import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PaymentStatus from '../../components/PaymentStatus/PaymentStatus.component';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';
import {formatBillDetails, formatDataDetailList} from '../../utils/transformer.util';
import {setDirtyMiniStatement} from '../../state/actions/index.actions';
import {logout} from '../../state/thunks/onboarding.thunks';
import {hidePaymentModal} from '../../state/actions/index.actions.js';

class PaymentStatusPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    options: PropTypes.object,
    onClose: PropTypes.func,
    logoutFunc: PropTypes.func,
  };

  render () {
    const {options, onClose, logoutFunc} = this.props;

    const displayList = formatBillDetails(result(options, 'resultDisplay', []));
    const dataDetailList = formatDataDetailList(result(options, 'dataDetail', []));

    return <PaymentStatus onClose={onClose} displayList={displayList} dataDetailList={dataDetailList} logoutFunc={logoutFunc} {...options}/>;
  }
}

const mapStateToProps = (state) => ({
  options: result(state, 'paymentModal', {})
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => {
    dispatch(setDirtyMiniStatement(true));
    dispatch(NavigationActions.back());
    dispatch(hidePaymentModal());
  },
  logoutFunc: () => {
    dispatch(NavigationActions.back());
    setTimeout(() => {
      dispatch(logout());
    }, 0);
  }
});

const connectedCreditCardConfirmation = connect(mapStateToProps, mapDispatchToProps)(PaymentStatusPage);
export default connectedCreditCardConfirmation;
