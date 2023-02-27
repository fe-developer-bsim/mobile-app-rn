import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {language} from '../../config/language';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import styles from './DealDetail.component.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import getDirections from 'react-native-google-maps-directions';
import Touchable from '../Touchable.component';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class DealDetail extends React.Component {
  static propTypes = {
    discountMerchantDetail: PropTypes.object,
  }

  handleGetDirections = () => {
    const {discountMerchantDetail = {}} = this.props;
    const {merchant_lat, merchant_long} = discountMerchantDetail;
    const data = {
      destination: {
        latitude: parseFloat(merchant_lat),
        longitude: parseFloat(merchant_long)
      },
      params: [
        {
          key: 'travelmode',
          value: 'driving'
        },
        {
          key: 'dir_action',
          value: 'navigate'
        }
      ]
    };
    getDirections(data);
  }

  render () {
    const {discountMerchantDetail} = this.props;
    const renderPromo = discountMerchantDetail.promo.map((promo) => (
      <View key={promo.nama}>
        <View style={styles.promoContainer}><Text style={styles.label}>{promo.nama}</Text></View>
        <Text style={styles.subtitle}>{promo.periode}</Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.fullContainer}>
            <View>
              <Image source={{uri: discountMerchantDetail.gambar_visual.value}} resizeMode={'cover'} renderError={loadError} indicator={Bar} indicatorProps={styles.indicator} style={styles.offerImage} />
              <Touchable style={styles.locateContainer} onPress={this.handleGetDirections}>
                <Text style={styles.locateText}>{language.QR_DISCOUNT__LOCATE_TEXT}</Text>
                <SimasIcon name={'cross-hair-1'} size={20} style={styles.locateIcon}/>
              </Touchable>
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.infoContainer}>
                {discountMerchantDetail.merchant_name ? <View style={styles.labelContainer}><Text style={styles.label}>{discountMerchantDetail.merchant_name}</Text></View> : null}
                {discountMerchantDetail.merchant_alamat === '' || discountMerchantDetail.merchant_alamat === '-' ? null : <Text style={styles.subtitle}>{discountMerchantDetail.merchant_alamat}</Text> }
                {discountMerchantDetail.merchant_city === '' || discountMerchantDetail.merchant_city === '-' ? null : <Text style={styles.subtitle}>{discountMerchantDetail.merchant_city}</Text>}
                {(discountMerchantDetail.Kode_area === '' || discountMerchantDetail.Kode_area === '-') && (discountMerchantDetail.telepon === '' || discountMerchantDetail.telepon === '-') ? 
                  null :
                  <Text style={styles.subtitle}>{`${discountMerchantDetail.Kode_area} ${discountMerchantDetail.telepon}`}</Text>}
                {discountMerchantDetail.jam_operasional === '' || discountMerchantDetail.jam_operasional === '-' ? null : <View style={styles.labelFooter}><Text style={styles.subtitle}>{discountMerchantDetail.jam_operasional}</Text></View>}
              </View>
            </View>
          </View>

          <View style={styles.fullContainer}>
            <View style={styles.detailContainer}>
              <View style={styles.infoContainer}>
                {discountMerchantDetail.promo.length > 0 ? renderPromo : null}
                {discountMerchantDetail.deskripsi_produk === '' || discountMerchantDetail.deskripsi_produk === '-' ? null : <View style={styles.labelFooter}><Text style={styles.subtitle}>{discountMerchantDetail.deskripsi_produk}</Text></View>}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DealDetail;
