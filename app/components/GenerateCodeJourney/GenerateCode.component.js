import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Clipboard, ScrollView} from 'react-native';
import styles from './GenerateCode.styles';
import {result} from 'lodash';
import QRCode from 'react-native-qrcode-generator';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {Toast} from '../../utils/RNHelpers.util.js';
import Barcode from 'react-native-barcode-builder';
import {language} from '../../config/language';

class GenerateCode extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    goToMainOffline: PropTypes.func,
    finish: PropTypes.func,
    timeout: PropTypes.func,
    goToTapCode: PropTypes.func,
    gototapnumber: PropTypes.func,
    gototapcode: PropTypes.func,
    timerShow: PropTypes.object
  }
  state = {
    secondsRemaining: 299,
  }

  writeToClipboard = () => {
    const {navigation} = this.props;
    const code = result(navigation, 'state.params.firstCode', '');
    Clipboard.setString(code);
    Toast.show('Code copied to clipboard', Toast.LONG);
  };

  tick = () => {
    const {timeout, navigation} = this.props;
    const isLogin = result(navigation, 'state.params.isLogin', false);
    const payload = result(navigation, 'state.params.payload', {});
    const offlineCode = String(result(navigation, 'state.params.firstCode', ''));
    const tipeCode = String(result(navigation, 'state.params.tipeCode', ''));
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      timeout(payload, isLogin, offlineCode, tipeCode);
    }
  }

  componentDidMount = () => {
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }
  componentWillReceiveProps (newProps) {
    const respoonseCodeSuccess = result(newProps, 'isSuccess.responseCode', false);
    if (respoonseCodeSuccess === true) {
      BackgroundTimer.clearInterval(this.interval);
    } else if (this.state.secondsRemaining < 0) {
      BackgroundTimer.clearInterval(this.interval);
    }
  }

  render () {
    const {navigation, gototapcode, gototapnumber, timerShow} = this.props;
    const code = String(result(navigation, 'state.params.code', ''));
    const showCodeRaw = String(result(navigation, 'state.params.code', ''));
    const timer = this.state.secondsRemaining;
    const minute = Math.floor(timer / 60) < 10 ? '0' + Math.floor(timer / 60) : Math.floor(timer / 60);
    const second = (timer % 60) < 10 ? '0' + ((timer % 60)) : ((timer % 60));
    const timerShowNew = timerShow ? timerShow : minute + ':' + second;
    const showCode = String(showCodeRaw).replace(/(.{4})/g, '$1 ');
    const merchantName = result(navigation, 'state.params.payload.merchantName', '');

    return (
      <ScrollView>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.title}>{language.GENERATE_CODE_TITLE}</Text>
          </View>
          <View style={styles.subTitleContainer}>
            <View>
              <Text style={styles.caption1}>{language.GENERATE_CODE_GENERATOR_SHOWCODE1}</Text>
              <View style={styles.space}>
                <Text style={styles.merchNametext}>{merchantName}</Text>
                <Text>{language.GENERATE_CODE_GENERATOR_SHOWCODE3}</Text>
              </View>
            </View>
            <View style={styles.maxPayment}>
              <Text style={styles.validText}>{language.GENERATE_CODE_GENERATOR_VALID}</Text>
              <View style={styles.timeWidth}>
                <Text style={styles.timerShow}>{timerShowNew}</Text>
                <View>
                  <Text style={styles.labeltime}>{language.GENERATE_CODE_LABEL_TIME}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.containerCode}>
          <View style={[styles.rowbert, styles.border, styles.borderShadow]}>
            <View>
              <View style={styles.barcode}>
                <Touchable onPress={gototapnumber}>
                  <Barcode value={code} format='CODE128' width={1.3} height={50}/>
                  <Text style={styles.codeText}>{showCode}</Text>
                </Touchable>
              </View>
            </View>
            <View style={styles.lineTopBottom} />
            <View>
              <Touchable onPress={gototapcode}>
                <View style={styles.borderCenter}>
                  <View style={{overflow: 'hidden'}}>
                    <QRCode
                      value={code}
                      size={120}
                      bgColor='#000'
                      fgColor='#fff'/>
                  </View>
                  <View style={styles.logoBSIM}>
                    {/* <Image source={''} style={styles.imgBSIM}/> */}
                  </View>
                </View>
              </Touchable>
              <Text style={styles.innerTextQR}>{language.GENERATE_CODE_TAP}</Text>
            </View>
            <View  />
          </View>
        </View>
        <View style={styles.containerCoba}>
          <View style={styles.containtextExplanation}>
            <SimasIcon name={''} size={25} style={styles.explainIcon}/>
            <View style={styles.containExplantionRight}>
              <Text style={styles.textExplanation} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default GenerateCode;
