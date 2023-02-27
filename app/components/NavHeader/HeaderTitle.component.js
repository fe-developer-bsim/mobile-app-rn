import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import styles from './HeaderTitle.component.style';
import {language} from '../../config/language';
import {goToSDK} from '../../state/thunks/qrpayment.thunk';

class HeaderTitle extends Component {

  static propTypes = {
    langKey: PropTypes.string,
    titleBlack: PropTypes.string,
    titleRed: PropTypes.string,
    dispatch: PropTypes.func,
    rawTitle: PropTypes.string,
    titleWhite: PropTypes.string,
    titleWhiteTrf: PropTypes.string,
    titleBold: PropTypes.string,
    titlePaymentStatus: PropTypes.string,
    remittance: PropTypes.bool,
    headerMSIG: PropTypes.bool,
    isTrfLimit: PropTypes.bool,
    headerQR: PropTypes.bool,
    headerEtax: PropTypes.bool
  }

  goToDimoSdk = () => {
    const {dispatch} = this.props;
    dispatch(goToSDK());
  }

  render () {
    const {titleBlack = '', langKey = '', titleRed = '', rawTitle = '', titleWhite = '', titleWhiteTrf = '', titleBold = '', remittance = false, headerMSIG, isTrfLimit = false, titlePaymentStatus = '', headerQR = false, headerEtax = false} = this.props;
    if (titleBlack !== '' && langKey === '' && titleRed === '' && rawTitle === '' && titleWhite === '' && titleWhiteTrf === '' && titleBold === '') {
      return (
        <Text style={styles.titleBlack}>{language[titleBlack]}</Text>
      );
    } else if (titleWhite !== '' && langKey === '' && titleRed === '' && rawTitle === '' && titleBlack === '' && titleWhiteTrf === '' && titleBold === '' && titlePaymentStatus === '') {
      return (
        <View style={styles.headerCenter}>
          <Text style={remittance ? styles.titleWhiteRemittance : isTrfLimit ? styles.padLeft : styles.titleWhite}>{language[titleWhite]}</Text>
        </View>
      );
    } else if (titleBlack === '' && langKey === '' && titleRed !== '' && rawTitle === '' && titleWhite === '' && titleWhiteTrf === '' && titleBold === '' && titlePaymentStatus === '') {
      return (
        <Text style={styles.titleRed} onPress={this.goToDimoSdk}>{language[titleRed]}</Text>
      );
    } else if (titleBlack === '' && langKey !== '' && titleRed === '' && rawTitle === '' && titleWhite === '' && titleWhiteTrf === '' && titleBold === '' && titlePaymentStatus === '') {
      return (
        <Text style={styles.title}>{language[langKey]}</Text>
      );
    } else if (titleBlack === '' && langKey === '' && titleRed === '' && rawTitle === '' && titleWhite === '' && titleWhiteTrf !== '' && titleBold === '' && titlePaymentStatus === '') {
      return (
        <View style={headerEtax ? styles.etaxHeader : styles.headerCenter}>
          <Text style={headerMSIG ? styles.titleWhiteMSIG : headerQR ? styles.tittleTrfQR : headerEtax ? styles.tittleEtax : styles.tittleTrf}>{language[titleWhiteTrf]}</Text>
        </View>
      );
    } else if (titleBlack === '' && langKey === '' && titleRed === '' && rawTitle === '' && titleWhite === '' && titleWhiteTrf === '' && titleBold === '' && titlePaymentStatus !== '') {
      return (
        <Text style={styles.tittleTrf}>{language[titlePaymentStatus]}</Text>
      );
    } else if (titleBlack === '' && langKey === '' && titleRed === '' && rawTitle === '' && titleWhite === '' && titleWhiteTrf === '' && titleBold !== '' && titlePaymentStatus === '') {
      return (
        <Text style={styles.titleBold}>{language[titleBold]}</Text>
      ); 
    } else {
      return (
        <Text style={styles.titleBlack}>{rawTitle}</Text>
      );
    }
  }
}

export default HeaderTitle;