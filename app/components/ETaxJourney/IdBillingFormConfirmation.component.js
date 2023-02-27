import {ScrollView, Text, View, Platform} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {copyToCLipboard, wrapMethodInFunction} from '../../utils/transformer.util';
import {formatNpwp, inNumber, toTitleCase, currencyFormatter} from '../../utils/transformer.util';
import {isEmpty, result} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from './IdBillingFormConfirmation.styles';
import ViewShot from 'react-native-view-shot';
import Permissions from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';
import {Toast} from '../../utils/RNHelpers.util';
let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class IdBillingFormConfirmation extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  static propTypes = {
    createIDBilling: PropTypes.func,
    updateFingerSetting: PropTypes.func,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    billingData: PropTypes.object,
    goHome: PropTypes.func,
    paramsData: PropTypes.object
  }

  state = {
    haveNpwp: false,
    height: 0,
    width: 0,
  }

  onChangeHandler = () => {
    const {haveNpwp} = this.state;
    if (haveNpwp) {
      this.setState({haveNpwp: false});
    } else {
      this.setState({haveNpwp: true});
    }
  }

  getScreenSize = (event) => {
    const {height, width} = event.nativeEvent.layout;
    this.setState({height, width});
  }

  capturePayment = () => {
    this.refs.viewShot.capture().then((uri) => {
      const image = uri;
      if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(image, 'photo');
      } else {
        const date = new Date();
        const {fs} = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        const path = PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.png';
        RNFetchBlob.fs.writeFile(path, image, 'base64').then(() => {
          alert('ID Billing saved successfully.');
        }).catch((error) => {
          alert(JSON.stringify(error));
        });
      }
    });
  }

  saveIDBilling = () => {
    if (Platform.OS === 'android') { 
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__SHARE_STATUS);
            } else {
              this.capturePayment();
            }
          });
        } else {
          this.capturePayment();
        }
      });
    }
  }

  render () {
    const {handleSubmit, billingData, goHome, paramsData} = this.props;
    const dataConfirmation = result(paramsData, 'dataConfirmation', {});
    const npwpNumber = formatNpwp(result(dataConfirmation, 'npwp', ''));
    const npwpName = result(dataConfirmation, 'taxName', '');
    const npwpAddress = toTitleCase(result(dataConfirmation, 'taxAddress', ''));
    const nopNumber = !isEmpty(result(dataConfirmation, 'nopNumber', '')) ? result(dataConfirmation, 'nopNumber', '').match(/.{1,4}/g) : '';
    const nopDisplay = isEmpty(nopNumber) ? '-' : nopNumber.join(' ');
    const taxType = result(dataConfirmation, 'taxTypeView', '');
    const depositType = result(dataConfirmation, 'depositTypeView', '');
    const dateStart = result(dataConfirmation, 'fromDateView', '');
    const dateEnd = result(dataConfirmation, 'endDateView', '');
    const nomorKetetapan = result(dataConfirmation, 'regularityNumber', '');
    const jumlahSetor = result(dataConfirmation, 'amount', '');
    const terbilang = inNumber(jumlahSetor);
    const displayTerbilang = terbilang.replace(/\s+/g, ' ');
    const berita = result(dataConfirmation, 'notes', '') || '-';
    const tahunPajak = result(dataConfirmation, 'taxYear', '');
    const haveNpwp = result(dataConfirmation, 'haveNpwp', false);
    const idNumber = result(dataConfirmation, 'idNumber', '');
    const checkSK = !isEmpty(nomorKetetapan) || nomorKetetapan !== '';
    const options = {
      result: Platform.OS === 'ios' ? 'tmpfile' : 'base64',
      quality: 0.9,
      height: this.state.height,
      width: this.state.width
    };
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>{language.ETAX_GENERATE_IDBILLING_HEADER}</Text>
            </View>
            <View>
              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    {
                      haveNpwp ? 
                        <Text style={styles.txtLight}>{language.ETAX__FORM_ONE_NPWP}</Text>
                        :
                        <Text style={styles.txtLight}>NIK</Text>
                    }
                    <Text style={styles.txtBold}>{haveNpwp ? npwpNumber : idNumber}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.GENERIC__NAME}</Text>
                    <Text style={styles.txtBold}>{npwpName}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.FORM__ADDRESS}</Text>
                    <Text style={styles.txtBold}>{npwpAddress}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>NOP</Text>
                    <Text style={styles.txtBold}>{nopDisplay}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.ETAX_TAXPAYER_TAXTYPE_HINT}</Text>
                    <Text style={styles.txtBold}>{taxType}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.ETAX_TAXPAYER_DEPOSITTYPE_HINT}</Text>
                    <Text style={styles.txtBold}>{depositType}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <Text style={styles.txtMasaPajak}>{language.ETAX_TAX_PERIOD_SUB}</Text>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainerDate}>
                  <View style={styles.infoContainerDate}>
                    <Text style={styles.txtLight}>{language.DETAIL_TRANSACTION__FROM}</Text>
                    <Text style={styles.txtBold}>{dateStart}</Text>
                  </View>
                  <View style={styles.infoContainerDate}>
                    <Text style={styles.txtLight}>{language.DETAIL_TRANSACTION__TO}</Text>
                    <Text style={styles.txtBold}>{dateEnd}</Text>
                  </View>
                </View>
                
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.ETAX_TAX_YEAR_PICKER}</Text>
                    <Text style={styles.txtBold}>{tahunPajak}</Text>
                  </View>
                </View>
              </View>

              {
                checkSK && <View style={styles.mt15}>
                  <View style={styles.boxContainer}>
                    <View style={styles.infoContainer}>
                      <Text style={styles.txtLight}>{language.ETAX_TAX_REGULARITY_NUMBER}</Text>
                      <Text style={styles.txtBold}>{nomorKetetapan}</Text>
                    </View>
                  </View>
                </View>
              }
              
              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.ETAX_TAX_DEPOSIT_AMOUNT}</Text>
                    <Text style={styles.txtBold}>{language.CGV__RP} {currencyFormatter(jumlahSetor)}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.ETAX_TAX_COUNTED_AMOUNT}</Text>
                    <Text style={styles.txtBold}>{displayTerbilang} Rupiah</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mt15}>
                <View style={styles.boxContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.txtLight}>{language.TRANSFER__NOTES}</Text>
                    <Text style={styles.txtBold}>{berita}</Text>
                  </View>
                </View>
              </View>
              
            </View>
            {             
               
              isEmpty(billingData) ?
                <View style={styles.footer}>
                  <SinarmasButton text={'CREATE ID BILLING'} onPress={handleSubmit}/>
                </View>   : 
                <View>
                  <ViewShot onLayout={this.getScreenSize} ref='viewShot' options={options}>
                    <View style={styles.bgWhite}>
                      <View style={styles.greyLine} />
                      <Text style={styles.bottomText}>{language.ETAX_GENERATE_IDBILLING_HEAD}</Text>
                      <View style={styles.idBillingContainer}>
                        <View>
                          <Text style={styles.bottomTextIdBilling}>{language.ETAX_GENERATE_IDBILLING_SUBHEAD}</Text>
                          <Text  style={styles.bottomTextIdBilling}>{billingData.idBilling}</Text>
                        </View>
                        <Touchable onPress={wrapMethodInFunction(copyToCLipboard, billingData.idBilling)} style={styles.copyIconContainer}>
                          <SimasIcon name='copy' style={styles.copyIcon} size={20}/>
                        </Touchable>
                      </View>
                      <View style={styles.dateBillingContainer}>
                        <View>
                          <Text style={styles.bottomTextIdBilling}>{language.ETAX_GENERATE_IDBILLING_PERIOD}</Text>
                          <Text  style={styles.bottomTextIdBilling}>{billingData.activeDate}</Text>
                        </View>
                      </View>
                    </View>
                  </ViewShot>
                  <View style={styles.idBillingButtonContainer}> 
                    <SinarmasButton text={language.TAB_TITLE__OVERVIEW} onPress={goHome} style={styles.buttonBot}/>
                    <SinarmasButton text={language.GENERIC__CONTINUE} onPress={handleSubmit} style={styles.buttonBot}/>
                  </View>
                  <View style={styles.saveBillingContainer}>
                    <SinarmasButton text={'SAVE ID BILLING'} onPress={this.saveIDBilling} style={styles.saveButton}/>
                  </View>
                </View>
            }
            
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default IdBillingFormConfirmation;