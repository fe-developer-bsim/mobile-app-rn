import {View, Image, Text, ScrollView} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './AddNewAtmCard.styles';
import LogoImage from '../../assets/images/white-simobi.png';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import result from 'lodash/result';

class AddNewAtmSuccessScreen extends React.Component {

  static propTypes = {
    handleSubmit: PropTypes.func,
    navigation: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  render () {
    const {handleSubmit, navigation, currentLanguage} = this.props;
    const transactionId = result(navigation, 'state.params.transactionId', '');
    const isSuccess = result(navigation, 'state.params.isSuccess', '');
    const errMsg = result(navigation, 'state.params.errMsg', '');
    const productType = result(navigation, 'state.params.productType', '');
    const accountNumber = result(navigation, 'state.params.accountNumber', '');
    return (
      <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerSuccessScreen} extraHeight={120} style={styles.bgGrey}>
        <View style={styles.redContainer}>
          <Image source={LogoImage} style={styles.logoImage}/>
          <View style={styles.regCont}>
            <View>
              {isSuccess === 'yes' ?
                <Text style={styles.merchantText}>{language.POPUP_CONGRATULATION_HEADING}</Text>
                :
                <View>
                  <Text style={styles.merchantText}>{language.ADD_NEW_ATM_FAILED}</Text>
                </View>
              }
            </View>
            <View style={styles.plusContainer}>
              <SimasIcon name={isSuccess === 'yes' ? 'check-black' : 'close-black'} size={30} style={styles.plusIcon}/>
            </View>
          </View>
          <View>
            <View>
              {isSuccess === 'yes' && currentLanguage === 'en' ?
                <View>
                  <Text style={styles.whiteText}>{language.ADD_NEW_ATM_YOUR} {productType}</Text>
                  <Text style={styles.whiteText}>{language.POPUP__TEXT_WITH_ACC_NO} {accountNumber}</Text>
                  <Text style={styles.whiteText}>{language.POPUP__TEXT_HAS_BEEN_ADD_NEW_ATM}</Text>
                </View>
                : isSuccess === 'yes' && currentLanguage === 'id' ?
                  <View>
                    <Text style={styles.whiteText}>{productType} {language.ADD_NEW_ATM_YOUR}</Text>
                    <Text style={styles.whiteText}>{language.POPUP__TEXT_WITH_ACC_NO} {accountNumber}</Text>
                    <Text style={styles.whiteText}>{language.POPUP__TEXT_HAS_BEEN_ADD_NEW_ATM}</Text>
                  </View>
                  :
                  <View>
                    <Text style={styles.whiteText}>{errMsg}</Text>
                  </View>
              }
            </View>
            <View style={styles.transactionId}>
              <Text style={styles.whiteText}>{language.PAYMENT_STATUS__ID_TRANS}</Text>
              <Text style={styles.whiteText}>{transactionId}</Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.whiteText}>{isSuccess === 'yes' ? language.QR_GPN__MERCHANT_SUCCESS_03 : language.ADD_NEW_ATM_FAILED_01}</Text>
            <View style={styles.rowSuccessScreen}>
              <Text style={styles.whiteUnderlineText}>{language.QR_GPN__MERCHANT_SUCCESS_04}</Text>
              <Text style={styles.whiteText}>{language.QR_GPN__MERCHANT_SUCCESS_05}</Text>
            </View>
          </View>
        </View>
        {isSuccess === 'yes' ?
          <View style={styles.whiteContainer}>
            <View style={styles.rowSuccessScreen}>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'bullet'} size={15} style={styles.bulletIcon}/>
                </View>
              </View>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'credit-card'} size={40} style={styles.waitIcon}/>
                </View>
                <View style={styles.info2}>
                  <Text style={styles.txt}>{language.ADD_NEW_ATM_SUCCESS_01}</Text>
                  <Text style={styles.txt}>{language.ADD_NEW_ATM_SUCCESS_02}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rowSuccessScreen}>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'bullet'} size={15} style={styles.bulletIcon}/>
                </View>
              </View>
              <View>
                <View style={styles.plusContainer}>
                  <SimasIcon name={'truck'} size={70}/>
                </View>
                <View style={styles.info2}>
                  <Text style={styles.txt}>{language.ADD_NEW_ATM_SUCCESS_03}</Text>
                  <Text style={styles.txt}>{language.ADD_NEW_ATM_SUCCESS_04}</Text>
                </View>
                <View style={styles.paddingDetail}>
                  <Text style={styles.textSmallTitle}>{language.ADD_NEW_ATM_CARD_ESTIMATED}</Text>
                  <View style={styles.tncRowMargin}>
                    <Text>-</Text>
                    <Text style={styles.textSmall}>{language.ADD_NEW_ATM_CARD_ESTIMATED_JADETABEK}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>-</Text>
                    <Text style={styles.textSmall}>{language.ADD_NEW_ATM_CARD_ESTIMATED_LUAR_JADETABEK}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>-</Text>
                    <Text style={styles.textSmall}>{language.ADD_NEW_ATM_CARD_ESTIMATED_LUAR_PULAU_JAWA}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View> : null}
        <View style={styles.buttonAgree}>
          <SinarmasButton onPress={handleSubmit} text={language.QR_GPN__REFUND_STATUS_09} />
        </View>
      </ScrollView>
    );
  }
}


export default AddNewAtmSuccessScreen;
