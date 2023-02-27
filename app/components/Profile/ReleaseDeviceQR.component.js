import React, {Component} from 'react';
import {View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import styles from './ReleaseDeviceQR.styles';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-generator';
import {language} from '../../config/language';
import sandTime from '../../assets/images/sandTime.png';
import bankSinarmas from '../../assets/images/banksinarmas.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import Touchable from '../Touchable.component';

class ReleaseDeviceQR extends Component {
  static propTypes = {
    toReleaseQr: PropTypes.func,
    code: PropTypes.string,
    showSandTime: PropTypes.bool,
    showCountdown: PropTypes.bool,
    renewQR: PropTypes.func,
    showLoading: PropTypes.bool,
    showInstructions: PropTypes.func,
    showPopupQR: PropTypes.func,
    isLoading: PropTypes.bool,
  }

  render () {
    let {code, showSandTime, showCountdown, renewQR, showLoading, showInstructions, showPopupQR, isLoading} = this.props;
    const qrWidth = ((width - 40) * 0.6);
    return (
      <ScrollView style={styles.bodyContainer} extraHeight={120}>
        <View style={styles.columnContainer}>
          <View>
            <View style={styles.rowTopTitle}>
              <Touchable onPress={showInstructions}><Text style={styles.releaseTitle}>{language.TITLE_CHANGE_DEVICE_QR} <SimasIcon name='caution-circle' size={20} style={styles.iconTitleTop}/></Text>
              </Touchable>
            </View>
            {showSandTime ?
              <View style={styles.headerBox}>
                <View style={styles.rowTimer}>
                  <Text style={styles.topQRText}>{language.CODE_EXPIRED}</Text>
                  <View style={styles.shadowTimer}>
                    <Text style={styles.topQRTextTimer}> {showCountdown} </Text>
                  </View>
                </View>
                <View style={{flex: 1}}>
                  <Touchable onPress={renewQR}><Text style={styles.renewText} >{language.RENEW_CODE_EXPIRED}</Text></Touchable>
                </View>
              </View>
              :
              <View style={styles.headerBox}>
                <View style={styles.rowTimer}>
                  <Text style={styles.topQRText}>{language.TIME_REMAINING_CHANGE_DEVICE}</Text>
                  <View style={styles.shadowTimer}>
                    <Text style={styles.topQRTextTimer}> {showCountdown} </Text>
                  </View>
                </View>
              </View>
            }
            <View style={styles.bodyBox}>
              <View style={styles.lineDashed} />
              <View style={styles.centerQR}>
                {
                  showSandTime ?
                    <View >
                      <Image source={sandTime} style={styles.picture}/>
                      <Text style={styles.innerTextQR}>{language.CODE_HAS_EXPIRED_CHANGE_DEVICE}</Text>
                    </View>
                    : showLoading ?
                      <View style={styles.spinner}>
                        <ActivityIndicator
                          color={'black'}
                          size={1}/>
                      </View>
                      : code && !isLoading ?
                        <View>
                          <Touchable onPress={showPopupQR}>
                            <View style={styles.midleImageQR}>
                              <View style={{overflow: 'hidden'}}>
                                <QRCode value={code} size={qrWidth} bgColor='#000' fgColor='#fff'/>
                              </View>
                              <View style={styles.logoBSIM}>
                                <Image source={bankSinarmas} style={styles.imgBSIM}/>
                              </View>
                            </View>
                          </Touchable>
                          <Text style={styles.innerTextQR}>{language.TAP_EXPAND_CODE_CHANGE_DEVICE}</Text>
                        </View>
                        :
                        <View style={styles.spinner}>
                          <ActivityIndicator
                            color={'black'}
                            size={1}/>
                        </View>
                }
              </View>
            </View>
          </View>

          <View style={styles.warningBox}>
            <SimasIcon name='caution-circle' size={30} style={styles.iconStyleBlack}/>
            <Text style={styles.wrapTextWarning}>{language.CHANGE_DEVICE_WARNING}</Text>
          </View>
        </View>
      </ScrollView >
    );
  }
}

export default ReleaseDeviceQR;
