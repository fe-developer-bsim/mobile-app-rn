import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import {View, ImageBackground, Text} from 'react-native';
import {result, isEmpty} from 'lodash';
import styles from './AccSuccessOpening.styles';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {currencyFormatter, generateProductName} from '../../utils/transformer.util';
import moment from 'moment';
import {Platform} from 'react-native';
import newLoanImage from '../../assets/images/new-loan-card.png';
import newCCImage from '../../assets/images/credit-card.png';
let adjustAndroid;

if (Platform.OS === 'android') {
  adjustAndroid = require('react-native-adjust');
}

class AppVersionUpdator extends React.Component {
  static propTypes = {
    dataAccount: PropTypes.func,
    backToHome: PropTypes.func,
    checkStepNav: PropTypes.func,
    cif: PropTypes.string,
    currentLanguage: PropTypes.string
  }

  renderView = (item) => {
    const {currentLanguage} = this.props;
    const type = result(item, 'type', '');
    const title = currentLanguage === 'id' ? result(item, 'titleID', '') : result(item, 'titleEN', '');
    const value = type === 'currency' ? 'Rp ' + currencyFormatter(result(item, 'value', '')) : result(item, 'value', '');
  
    return (
      <View style={styles.inlineFieldDetail}>
        <Text style={styles.installmentDetailText}>{title}</Text>
        <Text style={styles.installmentDetailText}>{value}</Text>
      </View>
    );
  }
  
  renderViewDetail = (item) => {
    const {currentLanguage} = this.props;
    const title = currentLanguage === 'id' ? result(item, 'titleID', '') : result(item, 'titleEN', '');
  
    return (
      <View>
        <Text style={styles.textDetail}>{title}</Text>
      </View>
    );
  }

  render () {
    const {dataAccount, checkStepNav, cif} = this.props;
    const productName = generateProductName(result(dataAccount, 'code', ''));
    const amountApprove = result(dataAccount, 'status.approveLimit', '0');
    const applicationDate = result(dataAccount, 'createdDate', '');
    let adjustEvent;
    if (Platform.OS === 'android') {
      adjustEvent = new adjustAndroid.AdjustEvent('geq1m6');
      adjustEvent.addCallbackParameter('page_id', 'ak-daocc-10');
      adjustEvent.addCallbackParameter('cif', cif);
      adjustAndroid.Adjust.trackEvent(adjustEvent);
    }

    
    // kpr mortgage loan
    const code = result(dataAccount, 'code', '');
    const amountApproveMortLoan = result(dataAccount, 'statusNew.approveLimit', '0');
    const nextStep = result(dataAccount, 'statusNew.nextStep', '');
    const mapDataLoan = result(dataAccount, 'statusNew.listOffer', []);
    const mapDataDocument = result(dataAccount, 'statusNew.listDescription', []);
    const mapDataNote = result(dataAccount, 'statusNew.listNote', []);
 
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.bodyContainer} keyboardShouldPersistTaps='handled'>
        {code === 'LoanKPR' ?
          <View style={styles.summaryContainer}>
            <View style={styles.imgContainerAmount}>
              <ImageBackground source={newLoanImage} borderRadius={7} style={styles.imageSummary}>
                <View style={styles.aprovedText}>
                  <Text style={styles.aprovedTextColor}>{language.DASHBOARD__LOAN_SUMMARY_APPROVED}</Text>
                </View>
                <Text style={styles.amountSummaryText}>{language.MORTGAGELOAN__LOAN_PLAFON}</Text>
                <Text style={styles.amountSummarySubText}>Rp {currencyFormatter(amountApproveMortLoan)}</Text>
              </ImageBackground>
            </View>
            <View style={styles.imgContainerAmount}>
              <ImageBackground source={newLoanImage} borderRadius={7} style={styles.imageSummary}>
                <View style={styles.ph20}>
                  {isEmpty(mapDataLoan) ? null : mapDataLoan.map(this.renderView)}
                </View>
              </ImageBackground>
            </View>
            <View style={styles.imgContainerAmount}>
              <View style={styles.noticeBox}>
                <Text style={styles.textDetail}>{language.MORTGAGELOAN__DOCUMENT_NEEDED}</Text>
                <View>
                  {isEmpty(mapDataDocument) ? null : mapDataDocument.map(this.renderViewDetail)}
                </View>
              </View>
              <Text style={styles.textDetail}>{language.MORTGAGELOAN__PPA_EMAIL}</Text>
              <Text style={styles.textDetail}>{language.MORTGAGELOAN__FORMAT_PASSWORD} bsimkpr-(birthdate-ddmmyyyy)</Text>
              <Text style={styles.textDetail}>{language.MORTGAGELOAN__EXAMPLE} bsimkpr-14122000</Text>
              <View style={styles.noticeBox}>
                <View>
                  <Text style={styles.textDetail}>{language.MORTGAGELOAN__NOTES}</Text>
                  {isEmpty(mapDataNote) ? null : mapDataNote.map(this.renderViewDetail)}
                </View>
              </View>
            </View>
          </View>
          :
          <View>
            <View style={styles.summaryContainer}>
              <View style={styles.imgContainerAmount}>
                <ImageBackground source={newCCImage} borderRadius={7} style={styles.imageSummary}>
                  <View style={styles.aprovedText}>
                    <Text style={styles.aprovedTextColor}>{language.DASHBOARD__LOAN_SUMMARY_APPROVED}</Text>
                  </View>
                  <Text style={styles.amountSummaryText}>{language.CREDIT__CARD_LIMIT}</Text>
                  <Text style={styles.amountSummarySubText}>Rp {currencyFormatter(amountApprove)}</Text>
                </ImageBackground>
              </View>

              <View style={styles.imgContainerDetail}>
                <ImageBackground source={newCCImage} borderRadius={7} style={styles.imageSummary}>
                  <View style={styles.ph20}>
                    <View style={styles.inlineFieldDetail}>
                      <Text style={styles.installmentDetailText}>{language.CREDIT__CARD_TYPE}</Text>
                      <Text style={styles.installmentDetailText}>{productName}</Text>
                    </View>
                    <View style={styles.inlineFieldDetail}>
                      <Text style={styles.installmentDetailText}>{language.CREDIT__CARD_APPLICATION_DATA}</Text>
                      <Text style={styles.installmentDetailText}>{moment.unix(applicationDate / 1000).format('D MMM YYYY')}</Text>
                    </View>
                  
                    <View style={styles.inlineFieldDetail}>
                      <Text style={styles.installmentDetailText}>{language.CREDIT__CARD_ANNUAL_DATE}</Text>
                      <Text style={styles.installmentDetailText}>Free</Text>
                    </View>
                  </View>
                </ImageBackground> 
              </View>
            </View>
          </View>
        }

        {code === 'LoanKPR' ?
          <View>          
            {nextStep === '99' ?
              <View style={styles.buttonWrapperHorizontal}>
                <SinarmasButton text={language.MORTGAGELOAN__SHOW_PDF} onPress={checkStepNav()}/>
              </View>
              :
              <View style={styles.buttonContainer}>
                <View style={styles.buttonLeft}>
                  <SinarmasButton text={'DECLINE'} onPress={checkStepNav('0')}/>
                </View>
                <View style={styles.buttonRight}>
                  <SinarmasButton text={'APPROVE'} onPress={checkStepNav('1')}/>
                </View>
              </View>
            }
          </View>

          :
          <View style={styles.buttonWrapperHorizontal}>
            <SinarmasButton text={language.BUTTON__SIGN_DOCUMENT} onPress={checkStepNav()}/>
          </View>
        }
      </KeyboardAwareScrollView>
    );
  }
}

export default AppVersionUpdator;
