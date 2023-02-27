import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import QRRefundInfo from '../../components/QRGpn/QRRefundInfo.component';

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});


class QRRefundInfoPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getMerchantDetail: PropTypes.func,
  };

  render () {

    const {navigation, getMerchantDetail} = this.props;
    return <QRRefundInfo navigation={navigation} getMerchantDetail={getMerchantDetail}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRRefundInfoPage);
