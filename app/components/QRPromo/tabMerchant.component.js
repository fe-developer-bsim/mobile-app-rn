import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, ScrollView} from 'react-native';
import styles from './tabMerchant.styles';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import dimoHome from '../../assets/images/dimo_home.png';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class Merchant extends React.Component {
  static propTypes = {
    merchantList: PropTypes.array,
    goToMaps: PropTypes.func,
  }

  state = {
    width: 50,
    height: 50
  };

  getSize = (event) => {
    const {width, height} = event.nativeEvent.layout;
    this.setState({width, height});
  };

  renderMerchant = ({item}) => {
    const {goToMaps = noop} = this.props;
    const merchant = item.item;
    return (
      <View style={styles.cardContainer} key={item.index}>
        <Touchable onPress={goToMaps(merchant)}>
          <View style={styles.row}>
            <View style={styles.imageContainer} onLayout={this.getSize}>
              <Image source={merchant.logo ? {uri: merchant.logo} : dimoHome} renderError={loadError} indicator={Bar}
                indicatorProps={styles.indicatorStyle}
                style={[styles.imageSize, {width: this.state.width, height: this.state.height}]}
                imageStyle={[styles.promoImage, {width: this.state.width, height: this.state.height}]}/>
            </View>
            <View style={styles.mechantDetailContainer}>
              <Text style={styles.merchantDistance}>{parseInt(merchant.distance)} m</Text>
              <Text style={styles.merchantName}>{merchant.storeName}</Text>
              <Text style={styles.merchantAddress}>{merchant.address}</Text>
              <Text style={styles.payByQR}>{language.PAY_BY_QR__BRAND}</Text>
            </View>
          </View>
        </Touchable>
        <View style={styles.greyLine}/>
      </View>
    );
  }

  render () {
    const {merchantList = []} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.merchantAmountContainer}>
          <Text style={styles.merchantAmount}>{merchantList.length} {language.PAY_BY_QR__MERCHANT_FOUND}</Text>
        </View>
        <FlatList enableEmptySections data={merchantList} renderItem={this.renderMerchant}/>
      </ScrollView>
    );
  }
}

export default Merchant;
