import React, {Component} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './QrTcico.styles';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-generator';
import {language} from '../../config/language';
import qrisLogo from '../../assets/images/qrisLogoCrop.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import Touchable from '../Touchable.component';
import result from 'lodash/result';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import BackgroundTimer from 'react-native-background-timer';
import {Field} from 'redux-form';
import {generateAccountLabelQrTransfer, wrapMethodInFunction} from '../../utils/transformer.util';
import {normalizeAmount, formatFieldAmount, parseTLVTcico} from '../../utils/transformer.util';
import {SinarmasInputBoxNew, SinarmasPickerBoxNew} from '../FormComponents';
import {SinarmasButton} from '../FormComponents';

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
    formValues: PropTypes.object,
    tagQrTTS: PropTypes.object,
  }
  state = {
    secondsRemaining: totalSeconds,
    currentValues: {}
  }

  submit = () => {
    const {dispatch, formValues, ...reduxFormProps} = this.props;
    const {handleSubmit} = reduxFormProps;
    this.setState({currentValues: formValues});
    dispatch(wrapMethodInFunction(handleSubmit));
  };

  componentWillMount = () => {
    BackgroundTimer.clearInterval(this.interval);
    let {tagQrTTS} = this.props;
    const accId = result(tagQrTTS, 'newQRData.accId', '');
    const type = result(tagQrTTS, 'newQRData.transferMethod', '');
    const values = {accId, type};
    this.setState({currentValues: values});
  }

  popupQR = (data) => () => {
    const {showPopupQR} = this.props;
    showPopupQR(data);
  }

  render () {
    let {tagQrTTS, savingAccounts, formValues} = this.props;
    const {currentValues} = this.state;
    const tranferMethodList = [{type: 'Transfer Internal'}, {type: 'Transfer External'}];
    const qrWidth = ((width - 40) * 0.6);
    const data = result(tagQrTTS, 'data', '');
    let parseQRTag = parseTLVTcico(data);
    parseQRTag = JSON.parse(parseQRTag);
    const isCashin = result(parseQRTag, '62.08', '') === 'CDPT';
    const isGenerated = result(tagQrTTS, 'isGenerated', false);
    const account = result(formValues, 'accountNo', '');
    const isSameValue = isEqual(currentValues, formValues);
    const disabled = isEmpty(account) || isSameValue;
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>

          <ScrollView style={styles.bodyContainer} extraHeight={120}>
            {
              isGenerated ?
                <View>
                  <Image source={qrisLogo} style={styles.imgQris}/>
                  <View style={styles.bodyBox}>
                    <View style={styles.centerQR}>
                      <Touchable onPress={this.popupQR(data)}>
                        <View style={styles.midleImageQR}>
                          <View style={{overflow: 'hidden'}}>
                            <QRCode value={data} size={qrWidth} bgColor='#000' fgColor='#fff'/>
                          </View>
                        </View>
                      </Touchable>
                      <Text style={styles.innerTextQR}>{language.TAP_EXPAND_CODE_CHANGE_DEVICE}</Text>
                    </View>
                  </View>
                </View>
                : null
            }
            {
              isCashin ? 
                null :
                <View style={styles.formContainerAmount}>
                  <Field
                    name='transferMethod'
                    rightIcon='arrow'
                    placeholder={'Select Transaction Type'}
                    labelText={'Transaction Type'}
                    itemList={tranferMethodList}
                    labelKey='type'
                    component={SinarmasPickerBoxNew}
                    qrTTS={true}
                    textPickerStyle={styles.textPickerStyle}
                    pickerStyle={styles.pickerStyle}
                    isQRForm={true}
                  />
                </View>
            }
            <View style={styles.formContainerAmount}>
              <Field
                name='accountNo'
                rightIcon='arrow'
                component={SinarmasPickerBoxNew}
                placeholder={language.DASHBOARD__ACCOUNT_NUMBER}
                labelText={language.DASHBOARD__ACCOUNT_NUMBER}
                labelKey='display'
                itemList={generateAccountLabelQrTransfer(savingAccounts)}
                textPickerStyle={styles.textPickerStyle}
                pickerStyle={styles.pickerStyle}
                isQRForm={true}
              />
            </View>
            <View style={styles.formContainerAmount}>
              <Field
                name='amount'
                maxLength={13}
                label={'Amount'}
                format={formatFieldAmount}
                normalize={normalizeAmount}
                component={SinarmasInputBoxNew}
                keyboardType='decimal-pad'
                placeholder={language.GENERIC_BILLER__AMOUNT_PLACEHOLDER}
                isQrTTS={true}
              />
            </View>
            
            {
              isGenerated ?
                <View style={styles.warningBox}>
                  <SimasIcon name='caution-circle' size={30} style={styles.iconStyleBlack}/>
                  <Text style={styles.wrapTextWarning}>{language.QR_TTS_WARNING}</Text>
                </View>
                : null
            }
            
          </ScrollView >
          <View style={styles.buttonLogin}>
            <SinarmasButton style={styles.buttonSpacing} onPress={this.submit} disabled={disabled}>
              <Text style={styles.nextButton}>{isGenerated ? language.QR__CPM_INFORMATION_4.toUpperCase() : language.QR_GPN__GENERATE__QR.toUpperCase()}</Text>
            </SinarmasButton>
          </View>
        </View>
      </View>
    );
  }
}

export default MyQrScreen;
