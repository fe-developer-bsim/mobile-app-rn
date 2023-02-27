import result from 'lodash/result';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRMerchantDetail from '../../components/QRGpn/QRMerchantDetail.component';

const mapStateToProps = (state) => ({
  accounts: result(state, 'accounts', []),
});

const mapDispatchToProps = () => ({
});


class QRMerchantDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getMerchantDetail: PropTypes.func,
  };

  render () {

    const {navigation, getMerchantDetail} = this.props;
    return <QRMerchantDetail navigation={navigation} getMerchantDetail={getMerchantDetail}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantDetailPage);
