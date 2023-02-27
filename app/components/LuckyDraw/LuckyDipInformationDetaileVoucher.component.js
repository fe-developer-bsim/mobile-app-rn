import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Clipboard, Linking, ScrollView} from 'react-native';
import {language} from '../../config/language';
import styles from './LuckyDip.styles';
import {result, startsWith, lowerCase, isEmpty} from 'lodash';
import AlfaIcon from '../../assets/images/AlfaCarticon.jpg';
import BorderGrey from '../../assets/images/DesainAlfaCart.png';
import Touchable from '../Touchable.component';
import {currencyFormatter, wrapMethodInFunction, copyToCLipboard} from '../../utils/transformer.util';
import moment from 'moment';
import {Toast} from '../../utils/RNHelpers.util';
import AlfamartEVoucherIcon from '../../assets/images/EVoucher-Alfamart-detail.jpg';
import SimasIcon from '../../assets/fonts/SimasIcon';
const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};
class LuckyDipInformationDetaileVoucher extends Component {


  copyCodeNumber = () => {
    const {data} = this.props;
    const isFromMyOrder = result(data, 'isFromMyOrder', false);
    const voucherCode = isFromMyOrder ? result(data, 'voucher.serial2', '') : result(data, 'voucherCode', '');
    Clipboard.setString(voucherCode);
    Toast.show(language.LUCKY__DIP_TAP_COPIED, Toast.LONG);
  }
  
  render () {
    const {data} = this.props;
    const isFromMyOrder = result(data, 'isFromMyOrder', false);
    const itemDetail = result(data, 'rewards.0', {});
    const typeVoucher = startsWith(lowerCase(result(itemDetail, 'kode', '')), 'ga');
    const price = result(itemDetail, 'price', '0');
    const validDate = isFromMyOrder ? moment(result(data, 'redemptionDate', '')).format('D MMM YYYY HH:mm') : moment(result(data, 'drawDate', '')).format('D MMM YYYY HH:mm');
    const expiredDate = isFromMyOrder ? moment(result(data, 'expiredDate', '')).format('D MMM YYYY HH:mm') : moment(result(data, 'expiredDate', '') + ' ' + result(data, 'expiredTime', '')).format('D MMM YYYY HH:mm');
    const voucherCode = isFromMyOrder ? result(data, 'voucher.serial2', '') : result(data, 'voucherCode', '');
    const uriImage = isFromMyOrder ? result(data, 'urlImage', '') : result(itemDetail, 'URLImage', '');
    const nameEvoucher = isFromMyOrder ? result(data, 'voucherName', '') : result(itemDetail, 'displayName', '') + '\n';
    const serialNumber = result(data, 'voucher.serial1', '');
    const imageLogo = typeVoucher ? AlfamartEVoucherIcon : AlfaIcon;
    const typeVoucherGA = startsWith(lowerCase(result(data, 'searchPath', '')), 'ga');
    const tncGeneral = isFromMyOrder ? result(data, 'voucher.tnc', '') : result(itemDetail, 'TnC', '') === '' ? 'https://www.banksinarmas.com/id/informasi/syarat-ketentuan-redeem-evoucher-alfacart' : result(itemDetail, 'TnC', '');
    const howToUseMyOrderVoucher = result(data, 'voucher.howToRedeem', '');
    return (
      <ScrollView style={styles.containerOutside}>
        <View style={styles.containerInside}>
          <Image source={typeVoucher ? imageLogo : {uri: uriImage}} style={styles.alfaIcon}/>
          <View style={styles.upperContain}>
            <View style={styles.padding}>
              {typeVoucherGA ? 
                <Text style={styles.valueText} >{nameEvoucher}</Text>
                :
                <Text style={styles.valueText} >{nameEvoucher}<Text style={styles.formatCurrency}>IDR {currencyFormatter(price)}</Text></Text>
              }
            </View>
            <View style={styles.upperTextDetail}>
              <Text style={styles.validText}>{language.GENERIC__VALID_DATE_TITLE}</Text>
            </View>
            <View>
              <Text style={styles.timeExpired}>{validDate} - {expiredDate}</Text>
            </View>
            <View style={styles.bottomUpperDetail}>
              {
                !isEmpty(serialNumber) &&
                <View>
                  <View style={styles.upperTextDetail}>
                    <Text style={styles.validText}>Serial</Text>
                  </View>
                  <View style={styles.serialContainer}>
                    <Text numberOfLines={1} style={styles.serialText}>{serialNumber}</Text>
                    <Touchable onPress={wrapMethodInFunction(copyToCLipboard, serialNumber)}>
                      <SimasIcon name='copy' style={styles.copyIcon} size={15}/>
                    </Touchable>
                  </View>
                </View>
              }
              <View style={styles.urlContainer}>
                {
                  !isEmpty(tncGeneral) &&
                  <Touchable onPress={openLink(tncGeneral)}>
                    <Text style={styles.redUnderlineText}>{language.LUCKY__DIP_TERM_CONDITION}</Text>
                  </Touchable>
                }
                {
                  !isEmpty(howToUseMyOrderVoucher) &&
                  <Touchable onPress={openLink(howToUseMyOrderVoucher)}>
                    <Text style={styles.redUnderlineText}>{language.EVOUCHER__HOW_TO_USE}</Text>
                  </Touchable>
                }
              </View>
            </View>
          </View>
          <Image source={BorderGrey} style={styles.borderGreyDesign}/>
          <View style={styles.containCode}>
            <Text>{language.LUCKY__DIP_ALFA_CODE} :</Text>
            <Touchable style={styles.containCodeText} onPress={this.copyCodeNumber}>
              <Text style={styles.codeText}>{voucherCode}</Text>
            </Touchable>
            <Touchable onPress={this.copyCodeNumber}>
              <Text style={styles.redText}>{language.LUCKY__DIP_TAP_COPY}</Text>
            </Touchable>
          </View>
        </View>
      </ScrollView>
    );
  }
}

LuckyDipInformationDetaileVoucher.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object
};

export default LuckyDipInformationDetaileVoucher;
