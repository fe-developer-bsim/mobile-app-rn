import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Linking, Platform} from 'react-native';
import styles from './CashAdvanceSuccess.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import moment from 'moment';
import * as Utils from '../../utils/transformer.util';
import creditCard from '../../assets/images/icon-CreditCard.png';
import transferIcon from '../../assets/images/Transfer.png';
import shareIcon from '../../assets/images/shareIcon.png';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import {currencyFormatter} from '../../utils/transformer.util';
import {Toast} from '../../utils/RNHelpers.util';
import {SinarmasButton} from '../FormComponents';
import {noop, result} from 'lodash';
import SimobiPlus from '../../assets/images/simobiplus.png';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}


class CashAdvanceSuccess extends React.Component {

  static propTypes = {
    accountList: PropTypes.array,
    formValues: PropTypes.object,
    selectedAccount: PropTypes.object,
    ccDetail: PropTypes.object,
    navigation: PropTypes.object,
    returnToDash: PropTypes.func,
    type: PropTypes.string,
    trxType: PropTypes.string,
    initialDeposit: PropTypes.string,
    transRefNum: PropTypes.string,
    isNoFund: PropTypes.string,
  }

  state = {
    height: 0,
    width: 0
  }

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  }

  call = () => {
    Linking.canOpenURL('tel:1500153').then((supported) => {
      if (supported) {
        Linking.openURL('tel:1500153');
      } else {
        Toast.show(language.ERROR_MESSAGE__CANNOT_CALL);
      }
    }).catch(() => Toast.show(language.ERROR_MESSAGE__CANNOT_CALL));
  }

  screenCapture = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.refs.viewShot.capture().then((uri) => {
                const options = {
                  title: language.PAYMENT_STATUS__SHARE_WITH,
                  url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
                };
                Share.open(options);
              });
            }
          });
        } else {
          this.refs.viewShot.capture().then((uri) => {
            const options = {
              title: language.PAYMENT_STATUS__SHARE_WITH,
              url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
            };
            Share.open(options);
          });
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.refs.viewShot.capture().then((uri) => {
                const options = {
                  title: language.PAYMENT_STATUS__SHARE_WITH,
                  url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
                };
                Share.open(options);
              });
            }
          });
        } else {
          this.refs.viewShot.capture().then((uri) => {
            const options = {
              title: language.PAYMENT_STATUS__SHARE_WITH,
              url: Platform.OS === 'ios' ? 'file://' + uri : 'data:image/png;base64,' + uri
            };
            Share.open(options);
          });
        }
      });
    }
  }

  render () {
    const {type = 'SUCCESS', trxType = '', navigation,
      isNoFund, returnToDash = noop, transRefNum} = this.props;
    const currentDate = new Date();
    const txDate = moment(currentDate).format('DD MMM YYYY, hh:mm A');
    const showTime = Utils.getDayName(currentDate) + ', ' + moment().format('DD MMM YYYY');
    const transId = result(navigation, 'state.params.transRefNum', '');
    const amount = result(navigation, 'state.params.amt', '');
    const note = result(navigation, 'state.params.note', '');
    const destAcc = result(navigation, 'state.params.destAcc', {});
    const srcAccNumber = result(destAcc, 'accountNumber', '');
    const srcProductType = result(destAcc, 'productType', '');
    const srcName = result(destAcc, 'name', '');
    const ccAccount = result(navigation, 'state.params.ccAccount', {});
    const accNumber = Utils.ccAccountNumber(result(ccAccount, 'accountNumber', ''));
    const ccProductType = result(ccAccount, 'productType', '');
    const ccName = result(ccAccount, 'name', '');
    const fee = result(navigation, 'state.params.fee', '');
    const total = result(navigation, 'state.params.totalAmount', '');
    const title = type === 'SUCCESS' ? language.DASHBOARD__CREDIT_CARD_TRANSACTION_SUCCESS : type === 'PENDING' ? language.PAYMENT_STATUS__PENDING : trxType + language.PAYMENT_STATUS__FAILED;
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };

    return (
      <View style={styles.halfWidth}>
        <ScrollView>
          <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options} style={styles.flexGrey}>
            {
              type === 'SUCCESS' ?
                <View>
                  <View style={styles.backgroundColorPink}/>
                  <View style={styles.marginTop}>
                    <Text style={styles.tittleTrf}>{title}</Text>
                  </View>
                  <View style={styles.containerBannerWhite}>
                    <View style={styles.containerLeft}>
                      <View style={styles.paddingBox}>
                        <View style={styles.iconSuccess}>
                          <SimasIcon name={'success-circle'} style={styles.logoSuccessIcon} size={30}/>
                          <Text style={styles.bankTitle}>{language.PAYMENT_STATUS__TRANSFER_SUCCESS}</Text>
                        </View>
                        <View style={styles.transNumber}>
                          <Text style={styles.transrefnumSuccess}>{language.PAYMENT_STATUS__NO_TRANS} {transId}</Text>
                        </View>
                        <View style={styles.greyLine2} />
                        <Text style={styles.receiptTextSuccess}>{language.PAYMENT_STATUS__RECEIPT}</Text>
                        <View style={styles.containerAmount}>
                          <View style={[styles.row, styles.mv5]}>
                            <Text style={styles.accNoNewOne}>{language.CREDITCARD__CASH_ADVANCE_AMOUNT}</Text>
                            <Text style={[styles.accNoNewOne, styles.robotoNew]}>Rp. {currencyFormatter(amount)}</Text>
                          </View>
                          <View style={styles.row}>
                            <Text style={styles.accNoNewOne}>{language.CREDITCARD__CASH_ADVANCE_PROMO}</Text>
                            <Text style={[styles.accNoNewOne, styles.robotoNew]}>-</Text>
                          </View>
                          <View style={[styles.row, styles.mv5]}>
                            <Text style={styles.accNoNewOne}>{language.TRANSFER__FEE}</Text>
                            <Text style={[styles.accNoNewOne, styles.robotoNew]}>Rp. {currencyFormatter(fee)}</Text>
                          </View>
                          <View style={styles.labelSpacing} />
                          <View style={styles.borderTop} />
                          <View style={[styles.row, styles.mv5]}>
                            <Text style={styles.accNoNewOne}>{language.CREDITCARD__CASH_ADVANCE_TOTAL}</Text>
                            <Text style={[styles.accNo, styles.robotoNew]}>Rp. {currencyFormatter(total)}</Text>
                          </View>
                        </View>
                        <View style={styles.labelSpacing} />

                        <View style={styles.button2}>
                          <Text style={styles.detailText}>{language.CREDITCARD__CASH_ADVANCE_DATE} {showTime}</Text>
                        </View>
                        <View style={styles.rowAlignSuccessFrom}>
                          <View style={styles.rightItemContainer}>
                            <Image source={creditCard} style={styles.imgIconFrom}/>
                          </View>
                          <View>
                            <Text style={styles.sendAccNameType}>{ccName}</Text>
                            <Text style={styles.sendAccNumber}>{accNumber}</Text>
                            <Text style={styles.sendAccType}>{ccProductType}</Text>
                          </View>
                        </View>
                        <View style={styles.dotContainer}>
                          <SimasIcon name={'more-menu'} size={20} style={styles.greyDot}/>
                          <SimasIcon name={'more-menu'} size={20} style={styles.greyDot}/>
                        </View>
                        <View style={styles.rowAlignSuccess}>
                          <View>
                            <Image source={transferIcon} style={styles.imgIconSend}/>
                          </View>
                          <View>
                            <Text style={styles.sendAccNameType}>{srcName}</Text>
                            <Text style={styles.sendAccNumber}>{srcAccNumber}</Text>
                            <Text style={styles.sendAccType}>{srcProductType}</Text>
                          </View>
                        </View>
                        <View style={styles.spaceContainer} />
                        <View style={styles.detailInside}>
                          <Text style={styles.detailText}>{language.CREDITCARD__CASH_ADVANCE_NOTE}</Text>
                        </View>
                        <View style={styles.boxAddInfo}>
                          <Text style={styles.textStyleInfo}>{note}</Text>
                        </View>
                        <View style={styles.middleContainerBot}>
                          <View style={styles.helpContainerSuccess}>
                            <Text style={styles.transactionRevamp}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
                          </View>
                          <View>
                            <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_01}</Text>
                            <Text style={styles.help}>{language.PAYMENT_STATUS__HELP_02}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                :
                <View style={styles.middleContainerTop}>
                  <View>
                    <View style={styles.titleContainer}>
                      { type === 'SUCCESS' ? 
                        null :
                        <Image source={SimobiPlus} style={styles.mainTitleLogo}/>
                      }
                      { type === 'SUCCESS' ? 
                        null :
                        <View>
                          <Text style={styles.transactionDate}>{txDate}</Text>
                        </View>
                      }
                    </View>
                    <View style={[styles.row, styles.ph20]}>
                      <View style={styles.columnHeader}>
                        <View style={styles.mainTitle}>
                          <Text style={styles.mainTitleText}>{title}</Text>
                          { isNoFund ?
                            <Text style={styles.successText}>{language.RESPONSE_MESSAGE__RC_51}</Text>
                            : null }
                          { transRefNum !== '' ?
                            <Text style={styles.transrefnum}>{language.PAYMENT_STATUS__NO_TRANS} {transRefNum}</Text>
                            : <Text/>
                          }
                        </View>
                      </View>
                      <View>
                        { type === 'PENDING' ?
                          <SimasIcon name={'pending-circle'} style={styles.logoPending} size={50}/>
                          :
                          <SimasIcon name={'fail-circle'} style={styles.logoFail} size={50}/>
                        }
                      </View>
                    </View>
                  </View>
                  <View style={styles.borderGreyTop}/>
                  <View>
                    <View style={styles.middleContainerBoth}>
                      {type === 'SUCCESS' ? 
                        null :
                        <View style={styles.helpContainer}>
                          <Text style={styles.transaction}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.redText} onPress={this.call}>1500 153</Text></Text>
                        </View>
                      }
                    </View>
                  </View>
                </View>
            }
          </ViewShot>
          {type === 'SUCCESS' ?
            <View style={styles.buttonContainerbotNew}>
              <View style={styles.button}>
                <Touchable style={styles.shareButton} onPress={this.screenCapture}>
                  <View style={styles.insideButton}>
                    <Image source={shareIcon} style={styles.shareIconSize}/>
                    <Text style={styles.shareText}>{language.PAYMENT_STATUS__SHARE}</Text>
                  </View>
                </Touchable>
              </View>
              <View style={styles.button}>
                <SinarmasButton style={styles.doneButton2} onPress={returnToDash} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
              </View>
            </View>
            :
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <SinarmasButton onPress={returnToDash} text={language.EMONEY__CLOSING_EMONEY_BUTTON_DONE}/>
              </View>
            </View>
          }
        </ScrollView>
      </View>
    );
  }
}

export default CashAdvanceSuccess;
