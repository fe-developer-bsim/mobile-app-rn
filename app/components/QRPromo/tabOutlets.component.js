import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import styles from './QRPromoDetail.styles';

class tabOutlets extends React.Component {
  static propTypes = {
    promo: PropTypes.object,
  }

  renderOutlets = (outlet) => (
    <View style={styles.outletContainer}>
      <View style={styles.outletDetailContainer}>
        <Text style={styles.outletName}>{outlet.memberBrandName}</Text>
        <Text numberOfLines={1} style={styles.outletAddress}>{outlet.address1} {outlet.city}</Text>
      </View>
      <View style={styles.additionalPaddingSmall}/>
      <View style={styles.greyLineFull}/>
    </View>
  )

  render () {
    const {promo = {}} = this.props;
    return (
      <View style={styles.outletsContainer}>
        {!isEmpty(promo.membership) &&
          promo.membership.map(this.renderOutlets)
        }
      </View>
    );
  }
}

export default tabOutlets;
