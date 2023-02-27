import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DetailOrders from '../../components/CreditCardHistoryJourney/OrderDetail.component';
import result from 'lodash/result';

class DetailOrder extends Component {
  static propTypes = {
    detail: PropTypes.object,
    navigation: PropTypes.func,
  }

  render () {
    const {navigation} = this.props;
    const detail = result(navigation, 'state.params.url', {});
    return <DetailOrders detail={detail}/>;
  }
}

export default DetailOrder;
