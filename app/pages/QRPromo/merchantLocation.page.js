import React from 'react';
import PropTypes from 'prop-types';
import QRMerchantLocation from '../../components/QRPromo/merchantLocation.component.js';
import result from 'lodash/result';

class QRMerchantLocationPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <QRMerchantLocation {...navParams}/>;
  }
}


export default QRMerchantLocationPage;
