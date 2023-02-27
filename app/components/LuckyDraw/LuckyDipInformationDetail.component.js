import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Linking} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import styles from './LuckyDipInformation.style';
import {result} from 'lodash';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import WebView from 'react-native-webview';
import {Toast} from '../../utils/RNHelpers.util';


const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};

class LuckyDipInformationDetail extends Component {
  state={
    checked: false
  }

  checkBox=() => {
    this.setState({checked: !this.state.checked});
  }

  render () {
    const {buttonSubmit, submitAddressform, addressDetail, reward, backButton, trackingNumber} = this.props;
    const fullName = !buttonSubmit ? result(addressDetail, 'fullName', '') + ' ' + result(addressDetail, 'lastName', '') : result(addressDetail, 'fullName', '');
    const streetAddress = result(addressDetail, 'streetAddress', '');
    const subDistrict = result(addressDetail, 'subDistrict.name', '');
    const district = result(addressDetail, 'district.name', '');
    const city = result(addressDetail, 'city.name', '');
    const province = result(addressDetail, 'province.name', '');
    const phoneNumber = result(addressDetail, 'phoneNumber', '');
    const postalCode = result(addressDetail, 'postalCode', '');
    const note = result(addressDetail, 'note', '');
    const uriImage = result(reward, 'URLImage', '');
    const displayName = result(reward, 'displayName', '');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraScrollHeight={100} enableOnAndroid={true}>
        <View style={styles.spaceContainer}>

          <View style={styles.rowTop}>
            <View>
              <WebView source={{uri: uriImage}} style={styles.imageContainer}/>
            </View>
            <View style={styles.rightTopContain}>
              <Text style={styles.textProductTitle}>{language.LUCKY__DIP_TITLE_PRODUK}</Text>
              <View style={styles.textProductContainer}>
                <Text style={styles.textProductSubTitle}>{displayName}</Text>
                <Text style={styles.textProductSubTitle}>{language.LUCKY__DIP_TITLE_QUANTITY} : 1</Text>
              </View>
            </View>
          </View>
          <View style={styles.greyLine}/>
          <View>
            <Text style={styles.titleShipTo}>{language.LUCKY__DIP_SHIP_TO}</Text>
          </View>
          <View>
            <Text style={styles.titleCustomer}>{fullName}</Text>
            <Text style={styles.paddingText}>{phoneNumber}</Text>
            <Text style={styles.paddingText}>{streetAddress}, {subDistrict},</Text>
            <Text style={styles.paddingText}>{district}, {city},</Text>
            <Text style={styles.paddingText}>{province}, {postalCode}</Text>
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.titleShipTo}>{language.LUCKY__DIP_DETAIL_ADDRESS}</Text>
            <Text>{note}</Text>
          </View>
          {!buttonSubmit ?
            <View style={styles.rowCheckBox}>
              <View style={styles.containn}>
                <CheckBox
                  onChange={this.checkBox}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!this.state.checked} // somehow checked value is reversed
                />
              </View>
              <View style={styles.textCheckBox}>
                <Text>
                  {language.LUCKY__DIP_DISCLAIMER}
                </Text>
              </View>
            </View> :
            <View>
              <View style={styles.paddingTopDisclaimer}>
                <Text>
                  {language.LUCKY__DIP_DISCLAIMER}
                </Text>
              </View>
              <View style={styles.paddingTopDisclaimer}>
                <View style={styles.titleTextResi}>
                  <Text style={styles.textResiStyle}>{language.LUCKY__DIP_TRACKING_NUMBER}</Text>
                </View>
                {trackingNumber === '' ?
                  <Text style={styles.textEmptyResiStyle}>{language.LUCKY__DIP_TRACKING_NUMBER_EMPTY}</Text>
                  :
                  <View style={styles.rowResi}>
                    <Text style={styles.resiText}>{trackingNumber}</Text>
                    <Touchable>
                      <SimasIcon name='copy' style={styles.iconCopy} size={20}/>
                    </Touchable>
                  </View>
                }
              </View>
              {trackingNumber === '' ?
                <View>
                  <View style={styles.urlTip}>
                    <Text>{language.LUCKY__DIP_ADDRESS_TRACKING1} <Text style={styles.webStyle}>www.alfatrex.id</Text>  {language.LUCKY__DIP_ADDRESS_TRACKING2} <Text style={styles.webStyle}>{language.LUCKY__DIP_ADDRESS_TRACKING3}</Text></Text>
                  </View>
                </View> :
                <View>
                  <View style={styles.urlTip}>
                    <Text>{language.LUCKY__DIP_ADDRESS_TRACKING1} <Text style={styles.webStyle}>www.alfatrex.id</Text> {language.LUCKY__DIP_ADDRESS_TRACKING2} <Text style={styles.addressSign} onPress={openLink('https://www.alfatrex.id')}>{language.LUCKY__DIP_ADDRESS_TRACKING3}</Text></Text>
                  </View>
                </View>
              }
            </View>
          }
        </View>

        <View>
          {!buttonSubmit ?
            <View>
              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>                        
                <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.LUCKY__DIP_CONFIRMATION_EDITED}</Text></View>
              </View>
              <View style={styles.buttonWrapper}>
                <SinarmasButton onPress={submitAddressform} disabled={!this.state.checked}>
                  <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
                </SinarmasButton>
              </View>
            </View> :
            <View>
              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>                        
                <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.LUCKY__DIP_CONFIRMATION_EDITED}</Text></View>
              </View>
              <View style={styles.buttonWrapper}>
                <SinarmasButton onPress={backButton}>
                  <Text style={styles.buttonLargeTextStyle}>{language.GENERIC__CLOSE}</Text>
                </SinarmasButton>
              </View>
            </View>}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

LuckyDipInformationDetail.propTypes = {
  navigation: PropTypes.object,
  buttonSubmit: PropTypes.bool,
  submitAddressform: PropTypes.func,
  addressDetail: PropTypes.object,
  reward: PropTypes.object,
  backButton: PropTypes.func,
  trackingNumber: PropTypes.func
};

export default LuckyDipInformationDetail;
