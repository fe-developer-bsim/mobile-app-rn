import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './Investment.styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {language} from '../../config/language';
import {Field} from 'redux-form';
import {theme} from '../../styles/core.styles';
import {SinarmasPicker} from '../FormComponents';
import {result} from 'lodash';
import moment from 'moment';
import magnaLinkImage from '../../assets/images/cardMagnaLink.png';
import primeLinkImage from '../../assets/images/cardPrimeLink.png';

const mapStateToProps = (state) => ({
  accountsCust: result(state, 'accounts', []),
});

const mapDispatchToProps = () => ({
});

class MSIGcardInfo extends React.Component {
  static propTypes = {
    cardDataInfo: PropTypes.object.isRequired,
    navParams: PropTypes.object,
    nomorPolisMagna: PropTypes.array,
    nomorPolisPrime: PropTypes.array,
    currentLanguage: PropTypes.string,
  }

  accountTypeMapping = {
    'Data Magna Link': 'MagnaLink',
    'Data Prime Link': 'PrimeLink',
  };

  getItemTheme = (cardDataInfo) => {
    const {polisType} = cardDataInfo;
    let title = null, image = magnaLinkImage, styleType = '';
    const itemType = this.accountTypeMapping[polisType];
    switch (itemType) {
    case 'MagnaLink': {
      title = 'Simas Magna Link';
      image = magnaLinkImage;
      styleType = 'magnaLink';
      break;
    }
    case 'PrimeLink': {
      title = 'Simas Prime Link';
      image = primeLinkImage;
      styleType = 'primeLink';
      break;
    }
    default:
      break;
    }
    return {title, image, styleType};
  }

  render () {
    const {cardDataInfo, nomorPolisMagna, nomorPolisPrime, currentLanguage} = this.props;
    const polisName = result(cardDataInfo, 'polisName', '');
    const polisType = result(cardDataInfo, 'polisType', '');
    const itemTheme = this.getItemTheme(cardDataInfo);
    const pembayaranSelanjutnya = moment(result(cardDataInfo, 'value.PembayaranSelanjutnya', '')).format('DD MMM YYYY');
    const polisKe = result(cardDataInfo, 'value.Poliske-', '');
    const status = currentLanguage === 'en' ? result(cardDataInfo, 'value.StatusPolisEng', '') : result(cardDataInfo, 'value.StatusPolis', '');
    const tipeProduct = result(cardDataInfo, 'value.TipeProduk', '');
    let fieldName = '';
    let pickerType = [];
    if (polisType === 'Data Magna Link') {
      fieldName = 'nomorPolisMagna';
      pickerType = nomorPolisMagna;
    } else if (polisType === 'Data Prime Link') {
      fieldName = 'nomorPolisPrime';
      pickerType = nomorPolisPrime;
    }
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' extraHeight={120} contentContainerStyle={styles.containerContent} style={styles.container}>
        <View style={styles.upperContainer}>
          <ImageBackground source={itemTheme.image} borderRadius={15} style={styles.backgroundImage}>
            <View style={styles.padding}>
              <View style={styles.bgPolisName}>
                <Text style={styles.polis}>{polisName}</Text>
              </View>
              <View style={styles.dropDownContainer}>
                <Field
                  name={fieldName}
                  component={SinarmasPicker}
                  theme='primary'
                  pickerStyle={styles.fieldContainer}
                  labelKey='display'
                  arrowPickerStyle={styles.arrowDownStyle}
                  textPickerStyle={{textAlign: 'center', fontSize: theme.fontSize22}}
                  itemList={pickerType}
                  typeField={'nomorPolis'}
                />
              </View>
              <Text style={styles.stylePembayaran}>{polisType === 'Data Prime Link' ? null : language.MSIG__NEXT_PAYMENT + ': ' + pembayaranSelanjutnya}</Text>
              <View style={styles.rowPolisStatus}>
                <Text style={styles.textTitle}>{language.MSIG__POLICY_TO}</Text>
                <Text style={styles.value}>{polisKe}</Text>
              </View>
              <View style={styles.rowPolisStatus}>
                <Text style={styles.textTitle}>{language.MSIG__STATUS}</Text>
                <Text style={styles.value}>{status}</Text>
              </View>
              <View style={styles.rowPolisStatus}>
                <Text style={styles.textTitle}>{language.MSIG__PRODUCT_TYPE}</Text>
                <Text style={styles.value}>{tipeProduct}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MSIGcardInfo);
