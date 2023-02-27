import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './CgvOffers.styles';
import Touchable from '../Touchable.component';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import {theme} from '../../styles/core.styles';
import {language} from '../../config/language';
import result from 'lodash/result';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;
const Offer = ({onPress, style = '', type, val = {}}) =>
  (
    <Touchable style={ type === 'cinema' ? [styles.offerContainerCinema, style] : [styles.offerContainer, style]} onPress={onPress}>
      {
        type === 'movie' ?
          <View style={styles.containerMovie}>
            <Image source={{uri: result(val, 'movieImageUrl', '-')}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: theme.brand,
              size: 50,
              thickness: 2
            }} style={styles.offerImage} />
            <View style={styles.offerDetails}>
              <Text style={styles.textOfferMovie}>{result(val, 'movieName', '-')}</Text>
            </View>
          </View>
          :
          type === 'cinema' ?
            <View style={styles.containerCinema}>
              <View style={styles.offerCinemaDetails}>
                <Text style={styles.tittleCinema}>CGV {result(val, 'cinemaName', '-')}</Text>
                <Text style={styles.contentCinema}>{result(val, 'cinemaAddress', '-')}</Text>
                <Text style={styles.contentCinemaCity}>{result(val, 'cityName', '-')}</Text>
                <Text style={styles.buttonCinema}>{language.CGV_SHOW_SCHEDULE}</Text>
              </View>
            </View>
            :
            <View style={styles.containerMovie}>
              <Image source={{uri: result(val, 'movieImageUrl', '-')}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                showsText: true,
                color: theme.brand,
                size: 50,
                thickness: 2
              }} style={styles.offerImage} />
              <View style={styles.offerDetails}>
                <Text style={styles.textOfferMovie}>{result(val, 'movieName', '-')}</Text>
              </View>
            </View>
      }
    </Touchable>
  );

Offer.propTypes = {
  label: PropTypes.string,
  imgUrl: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  featureIconName: PropTypes.string,
  footer: PropTypes.string,
  style: PropTypes.object,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  type: PropTypes.string,
  imageName: PropTypes.string,
  onLayout: PropTypes.func,
  loyaltyProgramType: PropTypes.string,
  discountAmount: PropTypes.number,
  permanentPercentageDiscount: PropTypes.number,
  val: PropTypes.object
};

export default Offer;
