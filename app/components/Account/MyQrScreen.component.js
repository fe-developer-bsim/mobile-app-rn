import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from '../QRPayment/QRScanner.styles';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-generator';
import {language} from '../../config/language';
import sandTime from '../../assets/images/qrexpire.png';
import bankSinarmas from '../../assets/images/banksinarmas.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import Touchable from '../Touchable.component';
import {result, isEmpty} from 'lodash';
import BackgroundTimer from 'react-native-background-timer';
import {Field} from 'redux-form';
import {generateAccountLabel, wrapMethodInFunction} from '../../utils/transformer.util';
import {SinarmasButton, SinarmasPickerBoxNew} from '../../components/FormComponents';
import qrisLogo from '../../assets/images/qrisLogoCrop.png';

const totalSeconds = 180;

class MyQrScreen extends Component {
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
    navigation: PropTypes.object,
    savingAccounts: PropTypes.array,
    updateQRVal: PropTypes.func,
    thisState: PropTypes.object,
    newQR: PropTypes.func,
    dispatch: PropTypes.func,
    isGenerated: PropTypes.bool,
    dataNewQR: PropTypes.object,
    clearCPM: PropTypes.func,
    formValues: PropTypes.object,
    clearGenerated: PropTypes.func,
  }
  state = {
    secondsRemaining: totalSeconds,
  }

  
  submit = () => {
    const {dispatch, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  tick = () => {
    const {clearCPM} = this.props;
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      BackgroundTimer.clearInterval(this.interval);
      clearCPM();
    }
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    const existingTimeRemaining = result(navigation, 'state.params.time', '');
    const seconds = existingTimeRemaining !== '' ? existingTimeRemaining : totalSeconds;
    this.interval = BackgroundTimer.setInterval(this.tick, 1000);
    this.setState({
      secondsRemaining: seconds,
    });
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  popupQR = (data) => () => {
    const {showPopupQR} = this.props;
    showPopupQR(data);
  }

  handleChange = () => {
    const {dataNewQR, clearGenerated} = this.props;
    const data = result(dataNewQR, 'data', '');
    const dataQR = result(dataNewQR, 'dataQR', {});
    const isNewQR = result(dataNewQR, 'isNewQR', false);
    const generated = false;
    const countGenerated = result(dataNewQR, 'addGeneartedTotal', 0);
    clearGenerated(data, dataQR, isNewQR, generated, countGenerated);
  }

  render () {
    let {dataNewQR, savingAccounts, isGenerated, formValues} = this.props;
    const qrWidth = ((width - 40) * 0.6);
    const data = result(dataNewQR, 'data', '');
    const minute = this.state.secondsRemaining > 0 ? Math.floor(this.state.secondsRemaining / 60) < 10 ? '0' + Math.floor(this.state.secondsRemaining / 60) : Math.floor(this.state.secondsRemaining / 60) : '00';
    const second = this.state.secondsRemaining > 0 ? (this.state.secondsRemaining % 60) < 10 ? '0' + ((this.state.secondsRemaining % 60)) : ((this.state.secondsRemaining % 60)) : '00';
    const timerShow = minute + ':' + second;
    const boxStyle = !isGenerated && isEmpty(data) ? styles.bodyBoxEmpty : styles.bodyBox;
    const isEmptyAcc = isEmpty(formValues);
    const selectedAccountNumber = result(formValues, 'accountNo.accountNumber', '');
    const currentAccountNumber = result(dataNewQR, 'dataQR.accountNumber', '');
    const disableSameAcc = currentAccountNumber === selectedAccountNumber;
    const disableQRCPM = isEmptyAcc ||  (disableSameAcc && timerShow !== '00:00');
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120}>
            <Image source={qrisLogo} style={styles.imgQris}/>
            <View style={styles.containerInside}>
              { !isGenerated && isEmpty(data) ? null
                : isGenerated && isEmpty(data) ?
                  <View style={styles.headerBox}>
                    <View style={styles.rowTimer}>
                      <Text style={styles.topQRText}>{language.TIME_REMAINING_CHANGE_DEVICE} :</Text>
                      <View style={styles.shadowTimer}>
                        <Text style={styles.topQRTextTimer}> 00:00 </Text>
                      </View>
                    </View>
                  </View>
                  :
                  <View style={styles.headerBox}>
                    <View style={styles.rowTimer}>
                      <Text style={styles.topQRText}>{language.TIME_REMAINING_CHANGE_DEVICE}</Text>
                      <View style={styles.shadowTimer}>
                        <Text style={styles.topQRTextTimer}> {timerShow} </Text>
                      </View>
                    </View>
                  </View>
              }
              <View style={boxStyle}>
                <View style={styles.centerQR}>
                  {
                    isGenerated && isEmpty(data) ?
                      <View >
                        <Image source={sandTime} style={styles.pictureExpired}/>
                        <Text style={styles.innerTextQR}>{language.CODE_HAS_EXPIRED_CHANGE_DEVICE}</Text>
                      </View>
                      :
                      <View>
                        <Touchable onPress={this.popupQR(data)}>
                          <View style={styles.midleImageQR}>
                            <View style={{overflow: 'hidden'}}>
                              <QRCode value={data} size={qrWidth} bgColor='#000' fgColor='#fff'/>
                            </View>
                            <View style={styles.logoBSIM}>
                              <Image source={bankSinarmas} style={styles.imgBSIM}/>
                            </View>
                          </View>
                        </Touchable>
                        <Text style={styles.innerTextQR}>{language.TAP_EXPAND_CODE_CHANGE_DEVICE}</Text>
                      </View>
                  }
                </View>
              </View>
            </View>
            <View style={styles.formContainer}>
              <Field
                name='accountNo'
                rightIcon='arrow'
                component={SinarmasPickerBoxNew}
                itemList={generateAccountLabel(savingAccounts)}
                isTax={true}
                placeholder={language.TIME_DEPOSIT__SELECT_ACCOUNT_PLACEHOLDER}
                labelText={language.TIME_DEPOSIT__SELECT_ACCOUNT_PLACEHOLDER}
                labelKey='display'
                textPickerStyle={styles.pickerText} 
                arrowPickerStyle={styles.darkBlueArrow}
                isQRForm={true}/>
            </View>
            <View style={styles.warningBox}>
              <SimasIcon name='caution-circle' size={30} style={styles.iconStyleBlack}/>
              <Text style={styles.wrapTextWarning}>{language.QR_CPM_WARNING}</Text>
            </View>
            <View style={styles.buttonSpacing}>
              <SinarmasButton style={styles.buttonSpacing} onPress={this.submit} disabled={disableQRCPM}>
                <Text style={styles.buttonLargeTextStyle}>{language.QR_GPN__GENERATE__QR}</Text>
              </SinarmasButton>
            </View>
          </ScrollView >
        </View>
      </View>
    );
  }
}

export default MyQrScreen;
