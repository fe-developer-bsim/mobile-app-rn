import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './Offers.styles';
import Touchable from '../Touchable.component';
import Bar from 'react-native-progress/Bar';
import {theme} from '../../styles/core.styles';
import {language} from '../../config/language';
import noBanner from '../../assets/images/no-banner.jpg';
import SimasIcon from '../../assets/fonts/SimasIcon';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

const Offer = ({onPress, style = '', imgUrl2, type, goToOffer, openDrawer}) => (
  <View>
    <Touchable style={[styles.offerBannerContainer, style]} onPress={onPress}>
      {
        type === 'offer' ?
          <View>
            <Image source={{uri: imgUrl2}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: theme.brand,
              size: 50,
              thickness: 2
            }} style={styles.offerBannerContainer} />
            <Touchable style={styles.seeAll} onPress={goToOffer}>
              <Text style={styles.seeAlltext}>{language.OFFER__BANNER_SEEALL}</Text>
            </Touchable>
            <Touchable style={styles.burgerMenuContainer} onPress={openDrawer}>
              <View>
                <SimasIcon name={'Burger'} size={20} style={styles.burger}/>
              </View>
            </Touchable>
          </View>
          :
          <View>
            <View>
              <Image source={noBanner} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                showsText: true,
                color: theme.brand,
                size: 50,
                thickness: 2
              }} style={styles.offerBannerContainer} />
              <Touchable style={styles.burgerMenuContainer} onPress={openDrawer}>
                <View>
                  <SimasIcon name={'Burger'} size={20} style={styles.burger}/>
                </View>
              </Touchable>
            </View>
          </View>
      }

    </Touchable>
    
  </View>
);

Offer.propTypes = {
  label: PropTypes.string,
  imgUrl2: PropTypes.string,
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
  goToOffer: PropTypes.func,
  openDrawer: PropTypes.func,
};

export default Offer;
