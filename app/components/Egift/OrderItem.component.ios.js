import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Linking, ImageBackground} from 'react-native';
import SimasIcon from '../../assets/fonts/SimasIcon';
import styles from './OrderItem.component.styles';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import moment from 'moment';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import {wrapMethodInFunction, copyToCLipboard} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util.js';
import {startsWith, noop} from 'lodash';
import BackGroundEvoucher from '../../assets/images/BackgroundEvoucher2.jpg';
import EvoucherAlfamartGiveAway from '../../assets/images/EVoucher-Alfamart-label.jpg';
import ExpireBadge from '../../assets/images/expire-badge.png';


class OrderItem extends React.Component {

  state = {
    showButton: false,
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

  showMenu = () => () => {
    this.setState({showButton: !this.state.showButton});
  }

  onPressMove = (orderNumber, voucherId) => () => {
    const {moveVoucher} = this.props;
    this.setState({showButton: false});
    moveVoucher(orderNumber, voucherId);
  }
  
  onPressDelete = (orderNumber, voucherId) => () => {
    const {deleteVoucher} = this.props;
    this.setState({showButton: false});
    deleteVoucher(orderNumber, voucherId);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props && this.state.showButton === true) {
      this.setState({showButton: false});
    }
  }

  render () {
    const {style, expiredDate, voucherName, onPress, urlImage, voucher, data = {}, typeVoucher, goToEvoucherDetail = noop, agregator, orderNumber, redeemedDate, redemptionDate, expiredRangeConfig, activeTab} = this.props;
    const newExpiredDate = moment(expiredDate).format('D MMM YYYY HH:mm');
    const validDate = moment(result(data, 'drawDate', redemptionDate)).format('D MMM YYYY HH:mm');
    const currentDate = moment().format('D MMM YYYY HH:mm');
    const isExpired = moment(currentDate).isSameOrAfter(newExpiredDate);
    const isRedeemed = !isEmpty(redeemedDate) || !isEmpty(result(data, 'redeemedDate', ''));
    const egiftcode = result(voucher, 'egift_code', '');
    const pin = result(voucher, 'pin', '');
    const url = result(voucher, 'url', '');
    const serial1 = result(voucher, 'serial1', '');
    const serial2 = result(voucher, 'serial2', '');
    const isUnipin = !isEmpty(serial1) && !isEmpty(serial2);
    const isTada = !isEmpty(egiftcode);

    // for voucher redemption
    const orderNumber2 = result(data, 'orderNumber', ''); // orderNumber for HHH and Giveaway
    const orderNumberFix = typeVoucher === 'EVOUCHER' || typeVoucher === 'GIVEAWAY' ? orderNumber2 : orderNumber;
    const voucherId = result(voucher, 'id_voucher', '').toString(); // voucherId for UV | for TADA use egiftcode
    const voucherId2 = result(data, 'voucherCode', ''); // voucherId for HHH and Giveaway
    const voucherIdFix = typeVoucher === 'EVOUCHER' || typeVoucher === 'GIVEAWAY' ? voucherId2 : isTada ? egiftcode : isUnipin ? serial1 : voucherId;

    const itemDetail = result(data, 'rewards.0', {});
    const urlImageVoucher = result(itemDetail, 'URLImage', '0');
    const displayNameEvoucher = result(itemDetail, 'displayName', '0');
    const codeVoucherDetermine = startsWith(result(data, 'voucherCode', ''), 'https:');
    const myOrderVoucherDetermine = startsWith(url, 'https:');
    const ImageforGiveAway = result(itemDetail, 'URLImage', '') === '' ? EvoucherAlfamartGiveAway : result(itemDetail, 'URLImage', '');
    const daysToExpired = moment(expiredDate).diff(currentDate, 'days'); // should return integer
    const showExpireBadge = activeTab === 'available' ? daysToExpired <= parseInt(expiredRangeConfig) : false;
    return (
      <View style={{marginHorizontal: 20}}>
        {typeVoucher === 'EVOUCHER' ? // for vouchers from HHH or lucky dip
          <View>
            <Touchable  onPress={codeVoucherDetermine ? this.openLink(result(data, 'voucherCode', '')) : goToEvoucherDetail(data)} style={[styles.offerContainer, style]}>
              <View style={styles.container}>
                <View style={styles.offerImage}>
                  <ImageBackground source={BackGroundEvoucher} style={styles.imageSizeiconURL}>
                    <Image source={{uri: urlImageVoucher}}  style={styles.uriImage}/>
                  </ImageBackground>
                </View>
                <View>
                  <View style={styles.detailsContainer}>
                    <View style={styles.headingContainer}>
                      <View style={{flex: 1}}>
                        <Text style={styles.headingCode}>E-VOUCHER</Text>
                        <Text style={styles.transactionHeadingEvoucher}>{displayNameEvoucher}</Text>
                      </View>
                      <Touchable style={styles.moreButton} onPress={this.showMenu()}>
                        <SimasIcon name='more-menu-2' size={15}/>
                      </Touchable>
                    </View>
                    {
                      this.state.showButton && (isExpired || isRedeemed) ?
                        <Touchable onPress={this.onPressMove(orderNumberFix, voucherIdFix)} style={styles.moveButton2}>
                          <Text style={styles.transactionHeading}>{language.EVOUCHER__MOVE_BUTTON}</Text>
                        </Touchable>
                        :
                        this.state.showButton ?
                          <Touchable onPress={this.onPressMove(orderNumberFix, voucherIdFix)} style={styles.moveButton2}>
                            <Text style={styles.transactionHeading}>{language.EVOUCHER__MOVE_BUTTON}</Text>
                          </Touchable>
                          : null
                    }
                    {
                      codeVoucherDetermine ?
                        <View style={styles.row}>
                          <Text style={styles.transactionHeading}>{'Link :'} </Text>
                          <View style={styles.codePin}>
                            <Text numberOfLines={1} style={styles.textPin}>{voucherIdFix}</Text>
                            <Touchable onPress={wrapMethodInFunction(copyToCLipboard, voucherIdFix)}>
                              <SimasIcon name='copy' style={styles.copyIcon} size={15}/>
                            </Touchable>
                          </View>
                        </View>
                        : null
                    }
                  </View>
                </View>
              </View>
              <View style={styles.offerDetails}>
                <View style={styles.row2}>
                  <View style={styles.iconContainer}>
                    <SimasIcon name='time-black' size={20} style={styles.timeIcon}/>
                    <Text style={styles.labelValidDate}>{validDate} - {newExpiredDate}</Text>
                  </View>
                </View>
                <View style={styles.iconSecondPage} >
                  <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                </View>
              </View>
            </Touchable>
          </View>
          : typeVoucher === 'GIVEAWAY' ? // for vouchers from giveaway
            <View>
              <Touchable  onPress={codeVoucherDetermine ? this.openLink(result(data, 'voucherCode', '')) : goToEvoucherDetail({...data, searchPath: 'GA'})} style={[styles.offerContainer, style]}>
                <View style={styles.container}>
                  <View style={styles.offerImage}>
                    {result(itemDetail, 'URLImage', '') === '' ?
                      <Image source={ImageforGiveAway} style={styles.imageSizeicon} />
                      :
                      <Image source={{uri: ImageforGiveAway}} style={styles.imageSizeicon} />
                    }
                  </View>
                  <View>
                    <View style={styles.detailsContainer}>
                      <View style={styles.headingContainer}>
                        <View style={{flex: 1}}>
                          <Text style={styles.headingCode}>E-VOUCHER</Text>
                          <Text style={styles.transactionHeading}>{result(itemDetail, 'displayName', '')}</Text>
                        </View>
                        <Touchable style={styles.moreButton} onPress={this.showMenu()}>
                          <SimasIcon name='more-menu-2' size={15}/>
                        </Touchable>
                      </View>
                      {
                        this.state.showButton && (isExpired || isRedeemed) ?
                          <Touchable onPress={this.onPressDelete(orderNumberFix, voucherIdFix)} style={styles.moveButton2}>
                            <Text style={styles.transactionHeading}>{language.EVOUCHER__DELETE_BUTTON}</Text>
                          </Touchable>
                          : 
                          this.state.showButton ?
                            <Touchable onPress={this.onPressMove(orderNumberFix, voucherIdFix)} style={styles.moveButton2}>
                              <Text style={styles.transactionHeading}>{language.EVOUCHER__MOVE_BUTTON}</Text>
                            </Touchable>
                            : null
                      }
                      {
                        codeVoucherDetermine ? // for giveaway, url is in voucherCode/id
                          <View style={styles.row}>
                            <Text style={styles.transactionHeading}>{'Link :'} </Text>
                            <View style={styles.codePin}>
                              <Text numberOfLines={1} style={styles.textPin}>{voucherIdFix}</Text>
                              <Touchable onPress={wrapMethodInFunction(copyToCLipboard, voucherIdFix)}>
                                <SimasIcon name='copy' style={styles.copyIcon} size={15}/>
                              </Touchable>
                            </View>
                          </View>
                          : null
                      }
                    </View>
                  </View>
                </View>
                <View style={styles.offerDetails}>
                  <View style={styles.row2}>
                    <View style={styles.iconContainer}>
                      <SimasIcon name='time-black' size={20} style={styles.timeIcon}/>
                      <Text style={styles.labelValidDate}>{validDate} - {newExpiredDate}</Text>
                    </View>
                  </View>
                  <View style={styles.iconSecondPage} >
                    <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                  </View>
                </View>
              </Touchable>
            </View>
            : // for vouchers from my order
            <View>
              <Touchable onPress={myOrderVoucherDetermine ? onPress : goToEvoucherDetail({...this.props, searchPath: 'GA', isFromMyOrder: true})} style={[styles.offerContainer, style]}>
                <View style={styles.container}>
                  <View style={styles.offerImage}>
                    <Image source={{uri: urlImage}} style={agregator === 'SOF' ? styles.imageSizeIconContain : styles.imageSizeicon} />
                  </View>
                  <View>
                    <View style={styles.detailsContainer}>
                      <View style={styles.headingContainer}>
                        <View style={{flex: 1}}>
                          {
                            egiftcode ?
                              <Text style={styles.headingCode}>{language.PROFILE__SIMAS_POIN_ORDERID}: <Text style={styles.code}>{egiftcode}</Text></Text>
                              : null
                          }
                          <Text style={styles.transactionHeading2}>{voucherName}</Text>
                        </View>
                        <Touchable style={styles.moreButton} onPress={this.showMenu()}>
                          <SimasIcon name='more-menu-2' size={15}/>
                        </Touchable>
                      </View>
                      {
                        this.state.showButton && (isExpired || isRedeemed) ?
                          <Touchable onPress={this.onPressDelete(orderNumberFix, voucherIdFix)} style={styles.moveButton2}>
                            <Text style={styles.transactionHeading}>{language.EVOUCHER__DELETE_BUTTON}</Text>
                          </Touchable>
                          :
                          this.state.showButton ?
                            <Touchable onPress={this.onPressMove(orderNumberFix, voucherIdFix)} style={styles.moveButton2}>
                              <Text style={styles.transactionHeading}>{language.EVOUCHER__MOVE_BUTTON}</Text>
                            </Touchable>
                            : null
                      }
                      {
                        !isEmpty(pin) || !isEmpty(url) ?
                          <View style={styles.row}>
                            <Text style={styles.transactionHeading}>{isEmpty(pin) ? 'Link :' : language.EGIFT__EVOUCHER_PIN + ' :'} </Text>
                            <View style={styles.codePin}>
                              <Text numberOfLines={1} style={styles.textPin}>{isEmpty(pin) ? url : pin}</Text>
                              <Touchable onPress={isEmpty(pin) ? wrapMethodInFunction(copyToCLipboard, url) : wrapMethodInFunction(copyToCLipboard, pin)}>
                                <SimasIcon name='copy' style={styles.copyIcon} size={15}/>
                              </Touchable>
                            </View>
                          </View>
                          : null
                      }
                    </View>
                  </View>
                </View>
                <View style={styles.offerDetails}>
                  <View style={styles.row2}>
                    <View style={styles.iconContainer}>
                      <SimasIcon name='time-black' size={20} style={styles.timeIcon}/>
                      <Text style={styles.labelValidDate}>{validDate} - {newExpiredDate}</Text>
                    </View>
                  </View>
                  <View style={styles.iconSecondPage} >
                    <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                  </View>
                </View>
              </Touchable>
            </View>
        }
        {showExpireBadge && <Image source={ExpireBadge} style={styles.expireBadge}/>}
      </View>
    );
  }
  static propTypes = {
    navigation: PropTypes.object,
    urlImage: PropTypes.string,
    style: PropTypes.object,
    expiredDate: PropTypes.string,
    voucherName: PropTypes.string,
    cifCode: PropTypes.string,
    onPress: PropTypes.func,
    image: PropTypes.string,
    redemptionDate: PropTypes.string,
    expiredDates: PropTypes.string,
    redemptionDates: PropTypes.string,
    egiftcode: PropTypes.string,
    voucher: PropTypes.object,
    urlDetail: PropTypes.string,
    typeVoucher: PropTypes.string,
    data: PropTypes.object,
    goToEvoucherDetail: PropTypes.func,
    agregator: PropTypes.string,
    moveVoucher: PropTypes.func,
    orderNumber: PropTypes.string,
    redeemedDate: PropTypes.string,
    deleteVoucher: PropTypes.func,
    expiredRangeConfig: PropTypes.string,
    activeTab: PropTypes.string,
  }
}
export default OrderItem;
