import React from 'react';
import PropTypes from 'prop-types';
import QRPromoDetail from '../../components/QRPromo/QRPromoDetail.component.js';
import result from 'lodash/result';

class QRPromoDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  render () {
    const {navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <QRPromoDetail {...navParams}/>;
  }
}


export default QRPromoDetailPage;
