import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './Offers.styles';
import Touchable from '../Touchable.component';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import {theme} from '../../styles/core.styles';
import {language} from '../../config/language';
import moment from 'moment';
import {getDayName, currencyFormatter} from '../../utils/transformer.util.js';
import SimasIcon from '../../assets/fonts/SimasIcon';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

const Offer = ({label, onPress, style = '', imgUrl, type, imageName, onLayout, loyaltyProgramType, discountAmount, permanentPercentageDiscount, startDate = '', endDate = '', validStartDate, validEndDate, iconPath, categoryLifeStyle, titleLifestyle, subTitleLifestyle, toogleTouchableLifestyle}) => {
  let offerDate = '';
  if (validStartDate || validEndDate) {
    offerDate = validStartDate === validEndDate ? language.DAY__EVERY + getDayName(validStartDate) :  `${moment(validStartDate, 'DD-MM-YYYY').format('DD MMM YYYY')}${' - '}${moment(validEndDate, 'DD-MM-YYYY').format('DD MMM YYYY')}`;
  }
  let showDate = '';
  if (startDate && endDate) {
    showDate = startDate === endDate ? language.DAY__EVERY + getDayName(startDate) : `${moment(startDate).format('D MMM YYYY')}${' - '}${ moment(endDate).format('D MMM YYYY')}`;
  }
  return (
    <Touchable style={[styles.offerContainer, style]} onPress={onPress}>
      {
        type === 'offer' ?
          <View>
            <Image source={(toogleTouchableLifestyle) && categoryLifeStyle ? {uri: iconPath} : {uri: imgUrl}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: theme.brand,
              size: 50,
              thickness: 2
            }} style={styles.offerImage} />
            {offerDate ?
              <View style={styles.offerDetails}>
                <View style={styles.iconContainer}><SimasIcon name='time-black' size={30} style={styles.iconStyleBlack}/></View>
                <View>
                  <Text style={styles.label}>{language.OFFER__BANNER_VALID_DATE}</Text>
                  <Text style={styles.labelValidDate}>{offerDate}</Text>
                </View>
              </View>
              : null}
            {(toogleTouchableLifestyle) && categoryLifeStyle ?
              <View style={styles.offerDetails}>
                <View>
                  <Text style={styles.label}>{titleLifestyle}</Text>
                  <Text style={styles.labelValidDate}>{subTitleLifestyle}</Text>
                </View>
              </View>
              : null}
          </View>
          :
          <View>
            <View>
              <Image source={{uri: 'https://' + imageName}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                showsText: true,
                color: theme.brand,
                size: 50,
                thickness: 2
              }} style={styles.offerImage} />
            </View>
            <View style={styles.rowContainer}>
              <View onLayout={onLayout} style={styles.promoAmountContainer}>
                <Text style={styles.discountType}>{loyaltyProgramType === 'POINTS' ? 'VOUCHER' : 'DISCOUNT'}</Text>
                <Text style={styles.discountAmount}>{loyaltyProgramType === 'POINTS' ? 'Rp ' +  currencyFormatter(discountAmount) : permanentPercentageDiscount + '%'}</Text>
              </View>
              <View style={styles.qrTag}>
                <Text style={styles.qrTagText}>{language.PAY_BY_QR__TAG}</Text>
              </View>
            </View>
            <View style={styles.promoDetailContainer}>
              <View style={styles.promoDetailDateContainer}>
                <Text style={styles.boldText}>{label}</Text>
                <Text style={styles.label}>{showDate}</Text>
              </View>
            </View>
          </View>
      }

    </Touchable>
  );
};

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
  validStartDate: PropTypes.string,
  validEndDate: PropTypes.string,
  iconPath: PropTypes.string,
  categoryLifeStyle: PropTypes.bool,
  titleLifestyle: PropTypes.string,
  subTitleLifestyle: PropTypes.string,
  toogleTouchableLifestyle: PropTypes.bool,
};

export default Offer;
