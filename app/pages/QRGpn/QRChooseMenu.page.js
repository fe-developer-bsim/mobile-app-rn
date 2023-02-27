import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRChooseMenu from '../../components/QRGpn/QRChooseMenu.component';
import {QRCustomer} from '../../state/thunks/QRGpn.thunks';
import {WithdrawalForm} from '../../state/thunks/qrpayment.thunk';

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
});

const mapDispatchToProps = (dispatch) => ({
  QRCustomer: (menu) => dispatch(QRCustomer(menu)),
  WithdrawalForms: (menu) => dispatch(WithdrawalForm(menu)),
  dispatch: (res) => dispatch(res),
});


class QRChooseMenuPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getMerchantDetail: PropTypes.func,
    QRCustomer: PropTypes.func,
    WithdrawalForms: PropTypes.func,
    dispatch: PropTypes.func,
  };

  render () {

    const {navigation, getMerchantDetail, QRCustomer, dispatch, WithdrawalForms} = this.props;
    return <QRChooseMenu WithdrawalForms={WithdrawalForms} navigation={navigation} getMerchantDetail={getMerchantDetail} QRCustomer={QRCustomer} dispatch={dispatch}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRChooseMenuPage);
