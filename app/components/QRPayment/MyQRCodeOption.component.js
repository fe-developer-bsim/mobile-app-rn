import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './MyQRCodeOption.component.styles';
import {Text, View, ScrollView} from 'react-native';
import result from 'lodash/result';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SinarmasButton, SinarmasPickerBoxNew, SinarmasInputBoxNew} from '../FormComponents';
import {Field} from 'redux-form';
import {parseTLVTcico, normalizeAmount, formatFieldAmount, generateAccountLabelQrTransfer, generateAccountLabel} from '../../utils/transformer.util';
import Touchable from '../../components/Touchable.component';
import {isEmpty, noop} from 'lodash';

class MyQRCodeOption extends Component {
  static propTypes = {
    data: PropTypes.object,
    savingAccounts: PropTypes.array,
    tagQrTTS: PropTypes.object,
    showQRTcico: PropTypes.func,
    onNextCPM: PropTypes.func,
    goToExistingQRCPM: PropTypes.func,
    cpmAccount: PropTypes.array,
    tcicoAccount: PropTypes.array,
    dataNewQR: PropTypes.object,
    formValues: PropTypes.object,
    hideQRTTS: PropTypes.string
  }
  
  state = {
    selectedMenu: ''
  }

  openModal = (menu) => () => {
    const {tagQrTTS, showQRTcico, dataNewQR, goToExistingQRCPM} = this.props;
    this.setState({selectedMenu: menu});
    const data = result(tagQrTTS, 'data', '');
    let parseQRTag = parseTLVTcico(data);
    parseQRTag = JSON.parse(parseQRTag);
    const qrTcicoType = result(parseQRTag, '62.08', '');
    if (menu === 'cpm') {
      const currentTime = new Date();
      const timeGenerated = result(dataNewQR, 'timeGenerated', currentTime);
      const checkGeneratedTime = result(dataNewQR, 'timeGenerated', '') === '';
      let diff = (timeGenerated.getTime() - currentTime.getTime()) / 1000;
      diff /= 60;
      const minutePassed = Math.abs(diff);
      const convertToSecond = minutePassed * 60;
      const timeRemainig = 180 - convertToSecond;
      const finalTime = Math.floor(timeRemainig);
      if (!checkGeneratedTime && timeRemainig > 0) {
        goToExistingQRCPM(finalTime);
      } else {
        setTimeout(() => {
          this.RBSheet.open();
        }, 500);
      }
    } else if (menu === 'BOOK') {
      if (isEmpty(tagQrTTS) || (qrTcicoType !== 'BOOK' && qrTcicoType !== 'DMCT')) {
        setTimeout(() => {
          this.RBSheet.open();
        }, 500);
      } else {
        showQRTcico(qrTcicoType);
      }

    } else {
      if (isEmpty(tagQrTTS) || qrTcicoType !== 'CDPT') {
        setTimeout(() => {
          this.RBSheet.open();
        }, 500);
      } else {
        showQRTcico(qrTcicoType);
      }
    }
  }

  generateTcico = (depositType) => () => {
    const {showQRTcico} = this.props;
    this.setState({isModalVisible: false});
    this.RBSheet.close();
    showQRTcico(depositType);
  }

  onNextCPM = () => {
    const {onNextCPM = noop} = this.props;
    this.RBSheet.close();
    onNextCPM();
  }

  render () {
    const {cpmAccount = [], tcicoAccount = [], formValues = {}, hideQRTTS} = this.props;
    const {selectedMenu} = this.state;
    const isCPM = selectedMenu === 'cpm';
    const isTrf = selectedMenu === 'BOOK';
    const isDepo = selectedMenu === 'CDPT';
    const tranferMethodList = [{type: 'Transfer Internal'}, {type: 'Transfer External'}];
    const height = isTrf ? 420 : isDepo ? 320 : 250;
    const disableQRTTS = hideQRTTS === 'YES';
    const disableAccNo = isEmpty(result(formValues, 'accountNo', ''));
    const disableTransfer = isEmpty(result(formValues, 'accountNo')) || isEmpty(result(formValues, 'transferMethod.type', ''));
    return (
      <View style={styles.container}>
        <View style={styles.topTextContainer}>
          <Text style={styles.headerText} >{language.GENERATE_QR_CODE_OPTION_TITTLE}</Text>
        </View>
      
        <Touchable style={styles.itemContainer} onPress={this.openModal('cpm')}>
          <View style={styles.iconContainer}>
            <SimasIcon name={'qr_cpm'} size={40} style={styles.backButton}/>
          </View>
          <View style={styles.textBody}>
            <Text style={styles.headerItemText}>{language.GENERATE_QR_CODE_CPM_TITTLE}</Text>
            <Text style={styles.itemText}>{language.GENERATE_QR_CODE_CPM_TEXT}</Text>
          </View>
        </Touchable>
        {
          disableQRTTS ? 
            null 
            :
            <View>
              <Touchable style={styles.itemContainer} onPress={this.openModal('BOOK')}>
                <View style={styles.iconContainer}>
                  <SimasIcon name={'qr_transfer'} size={40} style={styles.backButton}/>
                </View>
                <View style={styles.textBody}>
                  <Text style={styles.headerItemText}>{language.GENERATE_QR_CODE_TRANSER_TITTLE}</Text>
                  <Text style={styles.itemText}>{language.GENERATE_QR_CODE_TRANSER_TEXT}</Text>
                </View>
              </Touchable>
              <Touchable style={styles.itemContainer} onPress={this.openModal('CDPT')}>
                <View style={styles.iconContainer}>
                  <SimasIcon name={'qr_cashin'} size={40} style={styles.backButton}/>
                </View>
                <View style={styles.textBody}>
                  <Text style={styles.headerItemText}>{language.GENERATE_QR_CODE_CASHIN_TITTLE}</Text>
                  <Text style={styles.itemText}>{language.GENERATE_QR_CODE_CASHIN_TEXT}</Text>
                </View>
              </Touchable>
            </View>

        }
        
        <RBSheet
          // eslint-disable-next-line react/jsx-no-bind
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          height={height}
          customStyles={{
            container: {
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }
          }}
        >
          <ScrollView style={styles.containerContent}>
            <Text style={styles.generateQRTTSText}>{language.GENERATE_YOUR_QR_GENERIC}</Text>
            {
              isTrf ?
                <View style={styles.formContainerAmount}>
                  <Field
                    name='transferMethod'
                    rightIcon='arrow'
                    placeholder={language.GENERATE_QR_TRANSFER_TYPE_TEXT}
                    labelText={language.GENERATE_QR_TRANSFER_TYPE}
                    itemList={tranferMethodList}
                    labelKey='type'
                    component={SinarmasPickerBoxNew}
                    qrTTS={true}
                    textPickerStyle={styles.textPickerStyle}
                    pickerStyle={styles.pickerStyle}
                    isQRForm={true}
                  />
                </View> : null
            }
            
            <View style={styles.formContainerAmount}>
              <Field
                name='accountNo'
                rightIcon='arrow'
                component={SinarmasPickerBoxNew}
                placeholder={language.DASHBOARD__ACCOUNT_NUMBER}
                labelText={language.DASHBOARD__ACCOUNT_NUMBER}
                labelKey='display'
                itemList={isCPM ? generateAccountLabel(cpmAccount) : generateAccountLabelQrTransfer(tcicoAccount)}
                textPickerStyle={styles.textPickerStyle}
                pickerStyle={styles.pickerStyle}
                isQRForm={true}
              />
            </View> 
            {
              isTrf || isDepo ?
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
                </View> : null
            }
            {
              isCPM ? 
                <SinarmasButton onPress={this.onNextCPM} style={styles.generateQRTTSButton} disabled={disableAccNo}>
                  <Text style={styles.generateQRText}>{language.QR__CPM_INFORMATION_4.toUpperCase()}</Text>
                </SinarmasButton> :
                <SinarmasButton onPress={this.generateTcico(selectedMenu)} style={styles.generateQRTTSButton} disabled={isDepo ? disableAccNo : disableTransfer}>
                  <Text style={styles.generateQRText}>{language.QR__CPM_INFORMATION_4.toUpperCase()}</Text>
                </SinarmasButton>
            }
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}

export default MyQRCodeOption;
