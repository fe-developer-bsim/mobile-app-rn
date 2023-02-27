import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './LuckyDrawScreen.styles';
import noop from 'lodash/noop';
import LuckyDrawList from './LuckyDrawList.component';
import result from 'lodash/result';
import PropTypes from 'prop-types';

class ShopPage extends React.Component {
  static propTypes = {
    onOrderDetail: PropTypes.func,
    getDataList: PropTypes.func,
    navigation: PropTypes.object,
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    emailDrawAlert: PropTypes.func,
  }
  static defaultProps = {
    orderData: [],
    emailDrawAlert: noop
  }

  render () {
    const {emailDrawAlert} = this.props;
    const orderData = result(this.props, 'orderData', []);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContainer}>
          <LuckyDrawList orderData={orderData} emailDrawAlert={emailDrawAlert} />
        </ScrollView>
      </View>
    );
  }
}

export default ShopPage;
