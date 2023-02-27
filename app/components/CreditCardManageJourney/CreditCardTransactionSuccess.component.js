import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  Linking} from 'react-native';
import styles from './CreditCardTransactionSuccess.style';
import {language} from '../../config/language';
import {toCCFormater} from '../../utils/transformer.util';
import result from 'lodash/result';
import shareIcon from '../../assets/images/shareIcon.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import Permissions from 'react-native-permissions';
import {Toast} from '../../utils/RNHelpers.util.js';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class CreditCardTransactionSuccess extends Component {

  static propTypes = {
    formValues: PropTypes.object,
    periode: PropTypes.object,
    selectedAccount: PropTypes.object,
    returnToDashboard: PropTypes.func,
  }

  state = {
    height: 0,
    width: 0
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

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  }

  render () {
    const {formValues, periode, returnToDashboard} = this.props;
    const amount = result(formValues, 'sublabel');
    const trans = result(formValues, 'label');
    const periodeL = result(periode, 'term');
    const interest = result(periode, 'interestRate[0]');
    const firstI = result(periode, 'installmentAmount[0]');

    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.5,
      height: this.state.height,
      width: this.state.width
    };

    return (
      <View style={styles.halfWidth}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{paddingBottom: 20}}>

            <View style={styles.contentContainer}>
              <View style={styles.top}>

                <View style={styles.backgroundColor1}/>

                <View style={styles.containerBox}>
                  <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
                    <View style={styles.containerLeft}>
                      <SimasIcon name='success-circle' size={40} style={styles.successIcon}/>
                      <Text style={styles.detailTitle}>{language.DASHBOARD__CREDIT_CARD_SUCCESS}</Text>

                      <View style={styles.greyLine}/>

                      <Text style={styles.detailSubTitle}>{language.OPEN_NEW_ACCOUNT__TRANSACTION}</Text>
                      <View style={styles.detailInside}>
                        <View style={styles.detailInsideName}>
                          <Text style={styles.detailText}>{trans}</Text>
                        </View>
                        <View style={styles.detailInsideAmt}>
                          <Text style={styles.detailText}>{'Rp ' + toCCFormater(amount)}</Text>
                        </View>
                      </View>


                      <Text style={styles.detailSubTitle}>{language.DASHBOARD__CREDIT_CARD_INSTALLMENT_DETAIL}</Text>

                      <View style={styles.detailInsideIns}>
                        <View style={styles.detailIns}>
                          <Text style={styles.detailText}>{language.DETAIL__AMOUNT}</Text>
                          <Text style={styles.detailText}>{'Rp ' + toCCFormater(amount)}</Text>
                        </View>
                        <View style={styles.detailIns}>
                          <Text style={styles.detailText}>{language.DASHBOARD__CREDIT_CARD_CONVERT_POT}</Text>
                          <Text style={styles.detailText}>{periodeL}</Text>
                        </View>
                        <View style={styles.detailIns}>
                          <Text style={styles.detailText}>{language.DASHBOARD__CREDIT_CARD_CONVERT_INTEREST}</Text>
                          <Text style={styles.detailText}>{interest + ' %'}</Text>
                        </View>

                        <View style={styles.greyLine}/>

                        <View style={styles.total}>
                          <Text style={styles.totalText}>{language.DASHBOARD__CREDIT_CARD_INSTALLMENT}</Text>
                          <Text style={styles.totalText}>{'Rp ' + toCCFormater(firstI)}</Text>
                        </View>
                      </View>

                      <View style={styles.detail}>

                        <View style={{paddingHorizontal: 20, marginBottom: 10}}>
                          <Text style={styles.detailTextB}>{language.PAYMENT_STATUS__NEED_HELP} <Text style={styles.detailTextCall} onPress={this.call}>{language.HELP__CALL_US__SUBTITLE}</Text> </Text>
                          <Text style={styles.sendAccType}>{language.PAYMENT_STATUS__HELP_01}</Text>
                          <Text style={styles.sendAccType}>{language.PAYMENT_STATUS__HELP_02}</Text>
                        </View>
                      </View>

                    </View>
                  </ViewShot>
                </View>
              </View>
            </View>


            <View style={styles.bottom}>
              <View style={styles.containerBottomDetail}>
                <Touchable style={styles.shareButton} onPress={this.screenCapture}>
                  <View style={styles.insideButton}>
                    <Image source={shareIcon} style={styles.shareIconSize}/>
                    <Text style={styles.shareText}>{language.PAYMENT_STATUS__SHARE}</Text>
                  </View>
                </Touchable>
                <Touchable style={styles.doneButton} onPress={returnToDashboard}>
                  <Text style={styles.doneText}>{language.PAYMENT_STATUS__DONE}</Text>
                </Touchable>
              </View>
            </View>

          </ScrollView>
        </View>
      </View>
    );
  }
}

export default CreditCardTransactionSuccess;
