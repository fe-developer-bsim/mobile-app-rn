import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ScrollView} from 'react-native';
import styles from './SILConfirmation.styles';
import {language} from '../../config/language';
import {result, map} from 'lodash';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {wrapMethodInFunction, formatForexAmount} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';
import CheckBox from 'react-native-checkbox';
import RedCheckBox from '../../assets/images/checkbox-checked.png';
import UnCheckBox from '../../assets/images/checkbox-unchecked.png';
import moment from 'moment';

class ConfirmationBuyComponent extends React.Component {
  static propTypes ={
    navigation: PropTypes.object,
    getinputPolisIndividu: PropTypes.func,
    email: PropTypes.string,
    fullName: PropTypes.string,
    birthdate: PropTypes.string,
    phoneNumber: PropTypes.string,
    ktp: PropTypes.string,
    mothersMaiden: PropTypes.string,
    birthPlace: PropTypes.string,
    gender: PropTypes.object,
    maritalStatus: PropTypes.object,
    agama: PropTypes.object,
    warganegara: PropTypes.object,
    pendidikan: PropTypes.object,
    listProductIdr: PropTypes.object,
    listProductUsd: PropTypes.object,
    isSilIdrUsd: PropTypes.string,
    answer1: PropTypes.object,
    answer2: PropTypes.object,
    answer3: PropTypes.object,
    explain1: PropTypes.string,
    explain2: PropTypes.string,
    listProductDetailIdr: PropTypes.object,
    listProductDetailUsd: PropTypes.object,
    totalPremi: PropTypes.string,
    moneyInsured: PropTypes.object,
    monthOption: PropTypes.object,
    silInvesOption: PropTypes.object,
    amountValue: PropTypes.object,
    fullNameBenefit: PropTypes.object,
    birthdateBenefit: PropTypes.object,
    genderBenefit: PropTypes.object,
    polisRelation: PropTypes.object,
    silStorage: PropTypes.object,
    basicPremiumIdr: PropTypes.object,
    basicPremiumUsd: PropTypes.object,
    formValues: PropTypes.object,
    question1: PropTypes.object,
    question2: PropTypes.object,
    question3: PropTypes.object,
    checkbox: PropTypes.array,
    items: PropTypes.array,
    onGoNextInfoUSD: PropTypes.func,
    onGoNextInfoIDR: PropTypes.func,
    getRipleyPersonal: PropTypes.func,
  }

  state={
    checked: false,
    secondChecked: false,
    thirdChecked: false,
  }

  checkBox=() => {
    this.setState({checked: !this.state.checked});
  }

  checkBoxSecond=() => {
    this.setState({secondChecked: !this.state.secondChecked});
  }

  checkBoxThird=() => {
    this.setState({thirdChecked: !this.state.thirdChecked});
  }

  render () {
    const {fullName, birthdate, gender, mothersMaiden, ktp, birthPlace, maritalStatus, agama,
      pendidikan, warganegara, answer1, answer2, answer3, explain1, explain2, listProductDetailIdr, listProductDetailUsd,
      totalPremi, moneyInsured, isSilIdrUsd, monthOption, formValues, listProductIdr, listProductUsd, silInvesOption,
      fullNameBenefit, birthdateBenefit, genderBenefit, polisRelation, question1, question2, question3, ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit, basicPremiumIdr, basicPremiumUsd, checkbox, onGoNextInfoIDR, onGoNextInfoUSD, getRipleyPersonal} = reduxFormProps;
    const newDate = new Date();
    const currentDate = moment(newDate).format('DD/MM/YYYY');
    const productNameIDR = result(listProductIdr, 'productName', '');
    const productNameUSD = result(listProductUsd, 'productName', '');
    const typeFundIdr = (result(listProductDetailIdr, 'listFund.0.fundName', ''));
    const typeFundUsd = (result(listProductDetailUsd, 'listFund.0.fundName', ''));
    const premiTopUpIdr = totalPremi - basicPremiumIdr;
    const premiTopUpUsd = totalPremi - basicPremiumUsd;
    const sendAccountNumber = result(formValues, 'accountNumber', '');
    const sendAccountName = result(formValues, 'name', '');
    const productType = result(formValues, 'productType', '');
    const checkboxHealth = map(checkbox);
    return (
      <View style={styles.offsetOpacity}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
          <View style={styles.progressBar}>
            <View style={[{flex: 5}, styles.redBar]}/>
            <View style={[{flex: 5}, styles.greyBar]}/>
          </View>
          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.detailsTxt}>{language.SMART__INVESMENT_LINK_DETAIL03}</Text>

            </View>
          </View>
          <View >
            <View>
              <Text style={styles.detailTitle2}>{language.GENERIC__FORM_FULLNAME}</Text>
              <Text style={styles.detailTitle}>{fullName}</Text>
            </View>
            <View>
              <Text style={styles.detailTitle2}>{language.SIL_NUMBER_KTP}</Text>
              <Text style={styles.detailTitle}>{ktp}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.GENERIC__FORM_BIRTH_PLACE}</Text>
              <Text style={styles.detailTitle}>{birthPlace}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.EMONEY__BIRTHDATE}</Text>
              <Text style={styles.detailTitle}>{moment(birthdate).format('DD/MM/YYYY')}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.GENERIC__SEX_TYPE}</Text>
              <Text style={styles.detailTitle}>{gender}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.SIL__CHOOSE_STATUS}</Text>
              <Text style={styles.detailTitle}>{maritalStatus}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.SIL__CHOOSE_RELIGION}</Text>
              <Text style={styles.detailTitle}>{agama}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.HINTTEXT__NATIONALITY}</Text>
              <Text style={styles.detailTitle}>{warganegara}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.SIL__CHOOSE_EDUCATION}</Text>
              <Text style={styles.detailTitle}>{pendidikan}</Text>
            </View>
            <View >
              <Text style={styles.detailTitle2}>{language.GENERIC__FORM_MOTHER_MAIDEN}</Text>
              <Text style={styles.detailTitle}>{mothersMaiden}</Text>
            </View>
          </View>

          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.detailsTxt}>{language.SMART__INVESMENT_LINK_DETAIL13}</Text>

            </View>
          </View>
          <View>
            <Text style={styles.sendAccNumber}>{sendAccountNumber}</Text>
            <Text style={styles.sendAccNameType}>{sendAccountName}</Text>
            <Text style={styles.sendAccNameType}>{productType}</Text>
          </View>
          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.detailsTxt}>{language.SMART__INVESMENT_LINK_DETAIL12}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.detailTitle2}>{language.GENERIC__FORM_FULLNAME}</Text>
            <Text style={styles.detailTitle}>{fullNameBenefit}</Text>
          </View>
          <View>
            <Text style={styles.detailTitle2}>{language.SMART__INVESMENT_LINK_DETAIL04}</Text>
            <Text style={styles.detailTitle}>{birthdateBenefit} </Text>
          </View>
          <View>
            <Text style={styles.detailTitle2}>{language.SIL__POLIS_RELATION}</Text>
            <Text style={styles.detailTitle}>{polisRelation}</Text>
          </View>
          <View>
            <Text style={styles.detailTitle2}>{language.GENERIC__SEX_TYPE}</Text>
            <Text style={styles.detailTitle}>{genderBenefit}</Text>
          </View>
          <View>
            <Text style={styles.detailTitle2}>{language.SIL__BENEFIT}</Text>
            <Text style={styles.detailTitle}>{language.SIL__BENEFIT_PERCENTAGE}</Text>
          </View>

          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.detailsTxt}>{language.SMART__INVESMENT_LINK_DETAIL14}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.detailTitle}>1. {question1}</Text>
            {answer1 === 'Yes' || answer1 === 'Ya' ? 
              <Text style={styles.detailTitle}>{answer1} {explain1}</Text> 
              : 
              <Text style={styles.detailTitle}>{answer1}</Text>
            }
          </View>
          <View>
            <Text style={styles.detailTitle}>2. {question2}</Text>
            <View>
              <Text style={styles.detailTitle}>{answer2}</Text>
              <View>
                {
                  map(checkboxHealth, (obj) => (
                    <View style={styles.rowCheckBox}>
                      <SimasIcon name ={'check-square'} style={styles.iconHealth}/>
                      <Text>{obj.label}</Text>
                    </View>
                  ))
                }
              </View>  
            </View>
          </View>
          <View>
            <Text style={styles.detailTitle}>3. {question3}</Text>
            {answer3 === 'Yes' || answer3 === 'Ya' ? 
              <Text style={styles.detailTitle}>{answer3} {explain2}</Text> 
              : 
              <Text style={styles.detailTitle}>{answer3}</Text>
            }
          </View>

          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.detailsTxt}>{language.SIL__DATA_HEALTH}</Text>
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_PRODUK}</Text>
              { isSilIdrUsd === 'IDR' ?
                <Text style={styles.titleNameDetail}>{productNameIDR}</Text>
                :
                <Text style={styles.titleNameDetail}>{productNameUSD}</Text>
              }
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_UANG_PERTANGGUNGAN}</Text>
              <View>
                {isSilIdrUsd === 'IDR' ?
                  <Text style={styles.titleNameDetail}>{isSilIdrUsd} {formatForexAmount(moneyInsured, isSilIdrUsd)}</Text>
                  :
                  <Text style={styles.titleNameDetail}>{isSilIdrUsd} {formatForexAmount(moneyInsured, isSilIdrUsd)}</Text>
                }
              </View>
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_RPI}</Text>
              <View>
                <Text style={styles.titleNameDetail}>{monthOption}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_TANGGAL_RPI}</Text>
              <Text style={styles.titleNameDetail}>{currentDate}</Text>
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_FUND}</Text>
              {isSilIdrUsd === 'IDR' ?
                <Text style={styles.titleNameDetail}>{typeFundIdr}</Text>
                :
                <Text style={styles.titleNameDetail}>{typeFundUsd}</Text>
              }
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_TARGET_RPI}</Text>
              <Text style={styles.titleNameDetail}>{silInvesOption}</Text>
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_PREMI_POKOK}</Text>
              { isSilIdrUsd === 'IDR' ?
                <Text style={styles.titleNameDetail}>{isSilIdrUsd} {formatForexAmount(basicPremiumIdr, isSilIdrUsd)}</Text>
                :
                <Text style={styles.titleNameDetail}>{isSilIdrUsd} {formatForexAmount(basicPremiumUsd, isSilIdrUsd)}</Text>
              }
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_PREMI_TOPUP}</Text>
              {isSilIdrUsd === 'IDR' ?
                <Text style={styles.titleNameDetail}>{isSilIdrUsd} {formatForexAmount(premiTopUpIdr, isSilIdrUsd)}</Text> :
                <Text style={styles.titleNameDetail}>{isSilIdrUsd} {formatForexAmount(premiTopUpUsd, isSilIdrUsd)}</Text>
              }
            </View>
            <View>
              <Text style={styles.detailSubTitle}>{language.CONFIRMATION_SIL_TOTAL_BAYAR}</Text>
              {isSilIdrUsd === 'IDR' ?
                <Text style={styles.totalAmount}>{isSilIdrUsd} {formatForexAmount(totalPremi, isSilIdrUsd)}</Text> :
                <Text style={styles.totalAmount}>{isSilIdrUsd} {formatForexAmount(totalPremi, isSilIdrUsd)}</Text>
              }
            </View>
          </View>

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
              { isSilIdrUsd === 'IDR' ?
                <Text>{language.CONFIRMATION_SIL_DISCLAIMER} {language.SIL__SMART__INVESMENT_LINK_IDR} {language.CONFIRMATION_SIL_DISCLAIMER1}</Text>
                :
                <Text>{language.CONFIRMATION_SIL_DISCLAIMER} {language.SIL__SMART__INVESMENT_LINK_USD} {language.CONFIRMATION_SIL_DISCLAIMER1}</Text>
              }
            </View>
          </View>

          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.rowCheckBox}>
              <View style={styles.containn}>
                <CheckBox
                  onChange={this.checkBoxSecond}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!this.state.secondChecked} // somehow checked value is reversed
                />
              </View>
              <View style={styles.textCheckBox}>
                
                { isSilIdrUsd === 'IDR' ?
                  <View>
                    <Text>{language.CONFIRMATION_SIL_DISCLAIMER2}</Text>
                    <View style={styles.row}>
                      <Touchable onPress={onGoNextInfoIDR}>
                        <Text style={styles.disclamer}>{language.CONFIRMATION_SIL_DISCLAIMER3}</Text>
                      </Touchable>
                      <Text>
                        {language.CONFIRMATION_SIL_DISCLAIMER4}
                      </Text>
                    </View>
                  </View>
                  :
                  <View>
                    <Text>{language.CONFIRMATION_SIL_DISCLAIMER2}</Text>
                    <View style={styles.row}>
                      <Touchable onPress={onGoNextInfoUSD}>
                        <Text style={styles.disclamer}>{language.CONFIRMATION_SIL_DISCLAIMER3}</Text>
                      </Touchable>
                      <Text>
                        {language.CONFIRMATION_SIL_DISCLAIMER4}
                      </Text>
                    </View>
                  </View>
                }
              </View>
            </View>
          </View>

          <View style={styles.rowDisclamer}>
            <View style={styles.textCheckBox}>
              <Text>{language.DISCLAMER__SIL_HOLIDAYS}</Text>
            </View>
          </View>

          <View style={styles.fieldsContainerWrapper}>
            <View style={styles.rowCheckBoxRiplay}>
              <View style={styles.containn}>
                <CheckBox
                  onChange={this.checkBoxThird}
                  uncheckedImage={RedCheckBox}
                  checkedImage={UnCheckBox}
                  label={null}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={styles.checkboxLabel}
                  checked={!this.state.thirdChecked} // somehow checked value is reversed
                />
              </View>
              <View style={styles.textCheckBox}>
                
                { isSilIdrUsd === 'IDR' ?
                  <View>
                    <Text>{language.CONFIRMATION_SIL_DISCLAIMER_RIPLAY_PERSONAL}</Text>
                    <Touchable onPress={getRipleyPersonal}>
                      <Text style={styles.disclamer}>{language.CONFIRMATION_SIL_DISCLAIMER_RIPLAY_PERSONAL2}</Text>
                    </Touchable>
                    <Text>
                      {language.CONFIRMATION_SIL_DISCLAIMER_RIPLAY_PERSONAL3}
                    </Text>
                  </View>
                  :
                  <View>
                    <Text>{language.CONFIRMATION_SIL_DISCLAIMER_RIPLAY_PERSONAL}</Text>
                    <View>
                      <Touchable onPress={getRipleyPersonal}>
                        <Text style={styles.disclamer}>{language.CONFIRMATION_SIL_DISCLAIMER_RIPLAY_PERSONAL2}</Text>
                      </Touchable>
                      <Text>
                        {language.CONFIRMATION_SIL_DISCLAIMER_RIPLAY_PERSONAL3}
                      </Text>
                    </View>
                  </View>
                }
              </View>
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting || !this.state.checked || !this.state.secondChecked || !this.state.thirdChecked} >
              <Text style={styles.buttonLargeTextStyle}>{language.QR_GPN_CONFIRM_BTN}</Text>
            </SinarmasButton>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ConfirmationBuyComponent;