import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Linking} from 'react-native';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import styles from './OfferDetail.styles';
import {SinarmasButton} from '../FormComponents';
import result from 'lodash/result';
import SimasIcon from '../../assets/fonts/SimasIcon';
import moment from 'moment';
import {Toast} from '../../utils/RNHelpers.util.js';
import AutoHeightWebView from 'react-native-autoheight-webview';
import includes from 'lodash/includes';
import {Platform} from 'react-native';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class tabDetail extends React.Component {
  static propTypes = {
    offer: PropTypes.object,
    onOfferClick: PropTypes.func,
    cif: PropTypes.string,
    isOfferNilaiQ: PropTypes.bool,
  }

  openLink = (data) => () => {
    const link = result(data, '0', 'https://www.banksinarmas.com/PersonalBanking/NoPage');
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    });
  };

  render () {
    const {offer = {}, onOfferClick = noop, cif, isOfferNilaiQ} = this.props;
    const navigationKeys = result(offer, 'navigateTo', []);
    const offerStartDate = moment(offer.validStartDate, 'DD-MM-YYYY').format('DD MMM YYYY');
    const offerEndDate = moment(offer.validEndDate, 'DD-MM-YYYY').format('DD MMM YYYY');
    const navigationUrl = result(offer, 'navigateTo.0', '');
    const url = navigationUrl.substring(0, 4);
    const productName = navigationUrl;
    const tncStyle = '<style>* body {font-family: roboto; font-size: 14;}</style>';
    const headingStyle = '<style>* body {font-family: roboto; font-size: 14; font-weight: bold;}</style>';
    const bannerDetail = includes(offer.label, ('<p>')) || includes(offer.label, ('<li>')) || includes(offer.label, ('<br>')) || includes(offer.label, ('<html>'));
    const label = result(offer, 'label', '');
    let adjustEvent;
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('bdf0nz');
      adjustEvent.addCallbackParameter('page_id', 'ac-spe-1-1');
      adjustEvent.addCallbackParameter('cif', cif);
      adjustEvent.addCallbackParameter('page_name', label);
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.fullContainer}>
            <Image source={{uri: offer.imgUrl}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={styles.indicator} style={styles.offerImage} />
            <View style={styles.detailContainer}>
              { bannerDetail === true ?
                <View style={styles.infoContainer}>
                  {offer.label ? <View style={styles.labelContainerHTML}><AutoHeightWebView style={styles.webViewWidth} source={{html: headingStyle + offer.label.split('<li>')[0] || offer.label.split('<br>')[0]}}/></View> : null}
                </View>
                :
                <View style={styles.infoContainer}>
                  {offer.label ? <View style={styles.labelContainer}><Text style={styles.labelFont}>{offer.label.split('\n')[0]}</Text></View> : null}
                </View>
              }
              {offer.validStartDate ?
                <View style={styles.offerDetails}>
                  <View style={styles.iconContainer}><SimasIcon name='time-black' size={30} style={styles.iconStyleRed}/></View>
                  <View>
                    <Text style={styles.labelValidDate}>{language.OFFER__BANNER_VALID_DATE}</Text>
                    <Text style={styles.label}>{offerStartDate} - {offerEndDate}</Text>
                  </View>
                </View>
                : null }
            </View>
            <View style={styles.borderGreyTop}/>
            <View style={styles.detailContainer}>
              { bannerDetail === true ?
                <View style={styles.infoContainerTnC}>
                  {offer.label ? <View style={styles.labelContainerHTML}><AutoHeightWebView style={styles.webViewWidth} source={{html: tncStyle + offer.label}}/></View> : null}
                </View>
                :
                <View style={styles.infoContainerTnC}>
                  {offer.label ? <View style={styles.labelContainer}><Text style={styles.label}>{offer.label}</Text></View> : null}
                  {offer.subtitle === '' || offer.subtitle === '-' ? null : <Text style={styles.subtitle}>{offer.subtitle}</Text> }
                  {offer.footer === '' || offer.footer === '-' ? null : <Text style={styles.footer}>{offer.footer}</Text>}
                </View> }
            </View>
          </View>
        </ScrollView>
        { result(navigationKeys, '0', '') === 'NONE' || result(navigationKeys, '0', '') === '' ?
          null
          : url === 'http' || url === 'HTTP' ?
            <View style={styles.buttonContainer}>
              <SinarmasButton text={language.QR_PROMO__CHECK_THIS_OUT} onPress={this.openLink(navigationKeys)}/>
            </View>
            :
            isOfferNilaiQ ?
              <View style={styles.buttonContainer}>
                <SinarmasButton text={offer.textDescription} onPress={onOfferClick(productName)}/>
              </View>
              :
              <View style={styles.buttonContainer}>
                <SinarmasButton text={language.QR_PROMO__CHECK_THIS_OUT} onPress={onOfferClick(productName)}/>
              </View>
        }
      </View>
    );
  }
}

export default tabDetail;
