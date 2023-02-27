import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, ScrollView, Image, Linking, ImageBackground} from 'react-native';
import styles from './LuckyDipItemPrize.styles';
import noop from 'lodash/noop';
import result from 'lodash/result';
import reverse from 'lodash/reverse';
import size from 'lodash/size';
import sortBy from 'lodash/sortBy';
import truncate from 'lodash/truncate';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import LuckyDipBannerPrize from '../../assets/images/GrandPrizeTicket.jpg';
import LuckyDipBannerPrizeSimasPoin from '../../assets/images/SimasPoinTicket.jpg';
import LuckyDipBannerPrizeCashBack from '../../assets/images/cashBackTicket.jpg';
import SimasIcon from '../../assets/fonts/SimasIcon';
import moment from 'moment';
import {Toast} from '../../utils/RNHelpers.util.js';
import {startsWith} from 'lodash';
import LuckyDipBannerPrizeEvoucherBackground from '../../assets/images/BackgroundEvoucher3.jpg';

class Merchant extends React.Component {
  static propTypes = {
    openDetailorFillForm: PropTypes.func,
    listPrize: PropTypes.array,
    itemSize: PropTypes.number
  }

  state = {
    width: 50,
    height: 50,
  };

  getSize = (event) => {
    const {width, height} = event.nativeEvent.layout;
    this.setState({width, height});
  };

  goTodetail=(type, claimFlag, data) => {
    this.props.openDetailorFillForm(type, claimFlag, data);
  }

  openLink = (data) => () => {
    Linking.canOpenURL(data).then((supported) => {
      if (supported) {
        Linking.openURL(data);
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
      }
    });
  };
  
  renderPrize = ({item}) => {
    const {openDetailorFillForm = noop, itemSize} = this.props;
    let counterDaysItems = 0;
    const itemDetail = result(item, 'item.rewards.0', {});
    const transRefNum = result(item, 'item.transRefNum', '');
    const isCashback = result(itemDetail, 'kode', '') === 'REG10';
    const type = isCashback ? '4' : result(itemDetail, 'type', '');
    const flagAddress = String(result(item, 'item.flagAddress', ''));
    const typeProd = type === '1' ? 'PRODUCT' : type === '2' ? 'E-VOUCHER' : type === '3' ? 'SIMAS POIN' : 'COUPON';    
    const drawDate = moment(result(item, 'item.drawDate', '')).format('DD/MM/YYYY');
    const alamatKabupaten = result(item, 'item.alamatKabupaten', '');
    const alamatKecamatan = result(item, 'item.alamatKecamatan', '');
    const alamatKelurahan = result(item, 'item.alamatKelurahan', '');
    const alamatKodePos = result(item, 'item.alamatKodePos', '');
    const alamatProvinsi = result(item, 'item.alamatProvinsi', '');
    const alamatRumah = result(item, 'item.alamatRumah', '');
    const mobileNumber = result(item, 'item.mobileNumber', '');
    const claimFlag = flagAddress === '1' && alamatKabupaten === '' && alamatKecamatan === '' && alamatKelurahan === '' && alamatKodePos === '' && alamatProvinsi === '' && alamatRumah === '' && mobileNumber === '';
    if (type === '1') {
      const dateGetItem = moment(result(item, 'item.drawDate', '')).format('YYYY/MM/DD');
      const newDate = moment(new Date()).format('YYYY/MM/DD');
      const differenceTime = moment(newDate).diff(dateGetItem);
      let secondDifference = Math.round(moment.duration(differenceTime).asDays());
      const checkClaim = claimFlag ? secondDifference : 0;
      counterDaysItems = checkClaim;
    }
    const disabled = type === '3' || type === '4' || counterDaysItems >= 30;
    const description = type === '1' && claimFlag ? truncate(result(itemDetail, 'displayName', ''), {length: '17', omission: '...'}) : type === '1' && !claimFlag ? truncate(result(itemDetail, 'displayName', ''), {length: '40', omission: '...'}) : result(itemDetail, 'displayName', '');
    const codeVoucherDetermine = startsWith(result(item, 'item.voucherCode', ''), 'https:');
    const urlImageVoucher = result(itemDetail, 'URLImage', '0');
    return (
      <View>
        <Touchable style={styles.cardContainer} key={item.index} onPress={codeVoucherDetermine ? this.openLink(result(item, 'item.voucherCode', '')) : openDetailorFillForm(type, claimFlag, result(item, 'item', {}), transRefNum)} disabled={disabled}>
          <View>
            {type === '1' ? 
              <Image source={LuckyDipBannerPrize} style={styles.imageContainer}/>
              : type === '2' ?
                <ImageBackground source={LuckyDipBannerPrizeEvoucherBackground} style={styles.imageContainerBackGround}>
                  <Image source={{uri: urlImageVoucher}} style={styles.imageurlEvoucher}/>
                </ImageBackground>
                : type === '3' ?
                  <Image source={LuckyDipBannerPrizeSimasPoin} style={styles.imageContainer}/>
                  :
                  <Image source={LuckyDipBannerPrizeCashBack} style={styles.imageContainer}/>
            }
          </View>
          <View style={styles.detailContainer}>

            <View style={styles.detailContainerRow}>
              <Text style={styles.textDescriptionStyle}>{typeProd}</Text>
              <View style={styles.row}>
                <SimasIcon name='time-black' style={styles.validTime} size={13}/>
                <Text style={styles.textDescriptionStyle}>{drawDate}</Text>
              </View>
            </View>
            <View>
              {type === '1' ?
                <View>
                  {claimFlag ?
                    <View style={styles.rowSpace}>
                      <View style={styles.widthBox}>
                        <Text style={styles.description}>{description}</Text>
                      </View>
                      {counterDaysItems >= 30 ?
                        <View style={styles.claimBox}>
                          <Text style={styles.descriptionClaimText}>{language.LUCKY__DIP_CLAIM_PRODUCT_EXPIRED}</Text>
                        </View>
                        :
                        <View style={styles.claimBox}>
                          <Text style={styles.descriptionClaimText}>{language.LUCKY__DIP_CLAIM_PRODUCT_LABEL}</Text>
                        </View>
                      }
                    </View>
                    :
                    <Text style={styles.description}>{description}</Text>
                  }
                </View>
                : type === '2' || type === '4' ?
                  <Text style={styles.description}>{description}</Text>
                  :
                  <Text style={styles.descriptionPoin}>+ {description}</Text>
              }
            </View>
          </View>
        </Touchable>
        {item.index + 1 === itemSize && 
          <View style={styles.wordingItemPrize}>
            <Text style={styles.wordingItemPrizeText}>{language.LUCKY__DIP_NO_MORE_PRIZE}</Text>
          </View>
        }
      </View>
    );
  }
  
  render () {
    const {listPrize = []} = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {size(listPrize) !== 0 ? 
          <View>
            <FlatList enableEmptySections data={reverse(sortBy(listPrize, ['drawDate']))} renderItem={this.renderPrize}/>
          </View>
          :
          <View style={styles.wordingItemPrizeEmpty}>
            <Text style={styles.wordingItemPrizeText}>{language.LUCKY__DIP_NO_MORE_PRIZE}</Text>
          </View>
        }
      </ScrollView>
    );
  }
}

export default Merchant;