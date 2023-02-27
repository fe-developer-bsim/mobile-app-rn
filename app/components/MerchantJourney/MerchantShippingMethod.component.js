import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './MerchantShippingMethod.styles';
import Touchable from '../../components/Touchable.component';
import {ScrollView} from 'react-native-gesture-handler';
import {result} from 'lodash';

class AlfacartDashboard extends React.Component {
  static propTypes = {
    detailProduct: PropTypes.func,
    nav: PropTypes.object,
    navigateTo: PropTypes.func,
    categoryData: PropTypes.array,
    listAllProductData: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    dataCategory: PropTypes.string,
    seeAllCategory: PropTypes.func,
    selectNoPolis: PropTypes.func,
    inquiryData: PropTypes.object,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.object,
    goToEmFund: PropTypes.func,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    goToAlfacart: PropTypes.func,
    detailCategory: PropTypes.func,
    dispatch: PropTypes.func,
    listAllProduct: PropTypes.func,
    maximumNumberOfEachPage: PropTypes.string,
    detailProductData: PropTypes.array,
    onChangeTab: PropTypes.func,
    initialTab: PropTypes.number,
    getConfirmation: PropTypes.func,
    shipmentAdressMerchant: PropTypes.array,
    goTopUp: PropTypes.func,
  }

  renderLocation = (item) => {
    const {getConfirmation} = this.props;

    return (
      <Touchable style={styles.containerInnerShipping} onPress={getConfirmation(item)}>
        <View style={styles.row} >
          <Text style={styles.titleCode}>{result(item, 'name', '')}</Text>
        </View>
        <View>
          <Text style={styles.AddressStyle}>{result(item, 'address1', '')}</Text>
          <Text style={styles.AddressStyle}>{result(item, 'nameDistrict', '')}, {result(item, 'nameCity', '')}</Text>
        </View>
      </Touchable>
    );
  }

  selectNoPolis = () => {
    this.bs.current.snapTo(1);
  }

  render () {
    const {shipmentAdressMerchant} = this.props;

    return (
      <ScrollView>
        <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
          <View style={styles.container2}>
            <View style={styles.containerDetailProduct}>
              {shipmentAdressMerchant.map(this.renderLocation)}
            </View>

          </View>
        </View>
      </ScrollView>
    );
  }
}

export default AlfacartDashboard;
