import React from 'react';
import PropTypes from 'prop-types';
import DealDetail from '../../components/OnboardingJourney/DealDetail.component';
import result from 'lodash/result';

class DealDetailPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    discountMerchantDetail: PropTypes.object,
  }

  render () {
    const {navigation = {}} = this.props;
    const discountMerchantDetail = result(navigation, 'state.params.discountMerchantDetail', {});
    return <DealDetail discountMerchantDetail={discountMerchantDetail}/>;
  }
}

export default DealDetailPage;
