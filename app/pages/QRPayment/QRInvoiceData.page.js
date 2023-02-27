import React, {Component} from 'react';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import QRInvoiceDetail from '../../components/QRPayment/QRInvoiceData.component';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  goToLanding: () => dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Landing'})]
  })),
});

class QRInvoiceDetailPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToLanding: PropTypes.func,
  };

  render () {
    const {navigation, goToLanding} = this.props;
    const QRVoucherData = result(navigation, 'state.params.QRVoucherData', {});
    return <QRInvoiceDetail QRVoucherData={QRVoucherData} goToLanding={goToLanding}/>;
  }
}

export default connect(null, mapDispatchToProps)(QRInvoiceDetailPage);
