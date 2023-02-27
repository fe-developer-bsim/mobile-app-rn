import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './merchantLocation.styles';
import {language} from '../../config/language';
import MapView from 'react-native-maps';
import {SinarmasButton} from '../FormComponents';
import getDirections from 'react-native-google-maps-directions';
import Bar from 'react-native-progress/Bar';
import dimoHome from '../../assets/images/dimo_home.png';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class MerchantLocation extends React.Component {
  static propTypes = {
    merchant: PropTypes.object,
  }

  handleGetDirections = () => {
    const {merchant = {}} = this.props;
    const {latitude, longitude} = merchant;
    const data = {
      destination: {
        latitude,
        longitude
      },
      params: [
        {
          key: 'dirflg',
          value: 'w'
        }
      ]
    };
    getDirections(data);
  }

  state = {
    width: 50,
    height: 50
  };

  getSize = (event) => {
    const {width, height} = event.nativeEvent.layout;
    this.setState({width, height});
  };

  render () {
    const {merchant = {}} = this.props;
    const {latitude, longitude} = merchant;
    const coordinate = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.cardContainer}>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image source={merchant.logo ? {uri: merchant.logo} : dimoHome} renderError={loadError} indicator={Bar}
                  indicatorProps={styles.indicatorStyle}
                  style={[styles.imageSize, {width: this.state.width, height: this.state.height}]}
                  imageStyle={[styles.promoImage, {width: this.state.width, height: this.state.height}]}/>
              </View>
              <View style={styles.mechantDetailContainer}>
                <Text style={styles.merchantName}>{merchant.storeName}</Text>
                <Text style={styles.merchantAddress}>{merchant.address}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <MapView
            initialRegion={coordinate}
            style={styles.map}>
            <MapView.Marker
              coordinate={coordinate}
              title={merchant.storeName}
              description={merchant.address}
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <SinarmasButton onPress={this.handleGetDirections}>
            <Text style={styles.buttonStyle}>{language.QR_PROMO__DIRECTION}</Text>
          </SinarmasButton>
        </View>
      </View>
    );
  }
}

export default MerchantLocation;
