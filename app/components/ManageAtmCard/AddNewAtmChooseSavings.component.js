import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';
import {SinarmasPickerBox, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {connect} from 'react-redux';
import {generateSavingsAcoountToAdd, currencyFormatter} from '../../utils/transformer.util';
import {language} from '../../config/language';
import styles from './AddNewAtmCard.styles';
import {result, isEmpty} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';

const mapStateToProps = (state) => ({
  productType: result(state, 'form.AddNewAtmChooseSavings.values.accountNo.productType', ''),
});

class AddNewAtmChooseSavings extends React.Component {

  static propTypes = {
    filteredAccount: PropTypes.array,
    isDisabled: PropTypes.bool,
    goToNextPage: PropTypes.func,
    productType: PropTypes.string,
    isEmptyForm: PropTypes.bool,
    isLessAmount: PropTypes.bool,
    data: PropTypes.array,
    getCheckBalanceAddAtm: PropTypes.func,
    accounts: PropTypes.array,
    isiForm: PropTypes.object,
    currentLanguage: PropTypes.string,
  }

  render () {
    const {goToNextPage, productType, isEmptyForm, data, getCheckBalanceAddAtm, isLessAmount, accounts, isiForm, currentLanguage} = this.props;
    const checkBalances = parseFloat(result(isiForm, 'AvailableBalance', 0));
    const isEmptyBalances = checkBalances === 0;
    const imageCard = result(isiForm, 'accountNo.imageCard', '');
    const minBalance = parseInt(result(isiForm, 'MinimumBalance', 0));
    const cardNetwork = result(isiForm, 'accountNo.tncConfig.cardNetwork', '');
    const tarikTunai = result(isiForm, 'accountNo.tncConfig.tncConfig.tarikTunai', '');
    const tfAntarRek = result(isiForm, 'accountNo.tncConfig.tncConfig.transferAntarRekening', '');
    const tfBankLain = result(isiForm, 'accountNo.tncConfig.tncConfig.transferBankLain', '');
    const setorTunaiCRM = result(isiForm, 'accountNo.tncConfig.tncConfig.setoranTunaiCRM', '');
    const belanjaMerchantGPN = result(isiForm, 'accountNo.tncConfig.tncConfig.belanjaMerchantDebit', '');
    const dipKartu = result(isiForm, 'accountNo.tncConfig.tncConfig.dipKartu', '');
    const tapKartu = result(isiForm, 'accountNo.tncConfig.tncConfig.tapKartu', '');
    return (
      <View style={styles.buttonContainerStyle}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.bodyContainerWithNoTerms} extraHeight={120}>
          <View>
            <View style={styles.FieldsContainerWrapper}>
              <View>
                <Text style={styles.mainTitleText}>{language.CHOOSE_SAVINGS_TO_ADD_TITTLE}</Text>
              </View>
              <View style={styles.stylePicker}>
                <Field
                  name='accountNo'
                  rightIcon='arrow'
                  component={SinarmasPickerBox}
                  placeholder={language.ADD_NEW_ATM_CHOOSE_SAVINGS_ACC_PLACEHOLDER}
                  labelText={language.ADD_NEW_ATM_CHOOSE_SAVINGS_ACC}
                  labelKey='display'
                  itemList={generateSavingsAcoountToAdd(data, accounts)}
                  onValChange={getCheckBalanceAddAtm}
                  textPickerStyle={styles.textPickerStyle}
                />
                { isLessAmount ?
                  <View style={[styles.rowTextError]}>
                    <SimasIcon name='input-error' style={styles.errIcon}/>
                    <Text style={styles.redText}>{language.VALIDATE__AMOUNT_REQUEST_ATM}</Text>
                  </View>
                  : isEmpty(data) ?
                    <View style={[styles.rowTextError]}>
                      <SimasIcon name='input-error' style={styles.errIcon}/>
                      <Text style={styles.redText}>{language.ERR__ATM_CARD_ALL_ACC_IS_LINKING}</Text>
                    </View>
                    : null
                }
              </View>
              {!isEmpty(productType) ?
                <View>
                  <Text style={styles.formHeader}>{language.ADD_NEW_ATM_CARD_DETAIL}</Text>
                  <View style={styles.containerImageCard}>
                    <Image source={{uri: imageCard}} style={styles.imageList} />
                  </View>
                  <Text style={styles.formHeader}>{language.REQUEST_ATM_CARD_INFORMATION}</Text>
                  <View style={styles.tncRow}>
                    <Text>1.</Text>
                    <Text style={styles.textTnc}>{language.REQUEST_ATM_CARD__TNC_1 + currencyFormatter(minBalance)}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>2.</Text>
                    <Text style={styles.textTnc}>{language.REQUEST_ATM_CARD__TNC_2}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>3.</Text>
                    <Text style={styles.textTnc}>{language.REQUEST_ATM_CARD__TNC_3}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>4.</Text>
                    <Text style={styles.textTnc}>{language.REQUEST_ATM_CARD__TNC_4}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>5.</Text>
                    <Text style={styles.textTnc}>{language.REQUEST_ATM_CARD__TNC_5}</Text>
                  </View>
                  <View style={styles.tncRowMargin}>
                    <Text>6.</Text>
                    <Text style={styles.textTnc}>{currentLanguage === 'en' ? language.REQUEST_ATM_CARD__TNC_6 + cardNetwork +  ' Card :' : language.REQUEST_ATM_CARD__TNC_6 + cardNetwork + ' :'}</Text>
                  </View>

                  <View style={styles.borderSimasTara}>
                    <Text style={styles.textTrxLimit}>{language.REQUEST_ATM_CARD__TRANSACTION_LIMIT + cardNetwork}</Text>
                    <View style={styles.borderBottomRow}>
                      <View style={styles.newTitleContainer}>
                        <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__CASH_WITHDRAWAL}</Text>
                      </View>
                      <Text style={styles.valueDetail}>Rp. {currencyFormatter(tarikTunai)}</Text>
                    </View>
                    <View style={styles.borderBottomRow}>
                      <View style={styles.newTitleContainer}>
                        <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__TRANSFER_BETWEEN}</Text>
                      </View>
                      <Text style={styles.valueDetail}>Rp. {currencyFormatter(tfAntarRek)}</Text>
                    </View>
                    <View style={styles.borderBottomRow}>
                      <View style={styles.newTitleContainer}>
                        <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__TRANSFER_OTHER}</Text>
                      </View>
                      <Text style={styles.valueDetail}>Rp. {currencyFormatter(tfBankLain)}</Text>
                    </View>
                    <View style={styles.borderBottomRow}>
                      <View style={styles.newTitleContainer}>
                        <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__CASH_DEPOSIT}</Text>
                      </View>
                      <Text style={styles.valueDetail}>Rp. {currencyFormatter(setorTunaiCRM)}</Text>
                    </View>
                    { productType === 'Tabungan Simas Diamond' ?
                      <View>
                        <View style={styles.borderBottomNoRow}>
                          <View style={styles.newTitleContainer}>
                            <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__SHOP_TRX}</Text>
                          </View>
                          <Text style={styles.valueDetail}>{' '}</Text>
                        </View><View style={styles.borderBottomNoRow}>
                          <View style={styles.newTitleContainer}>
                            <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__CARD_TAP}</Text>
                          </View>
                          <Text style={styles.valueDetail}>Rp. {currencyFormatter(tapKartu)}</Text>
                        </View><View style={styles.borderBottomNoRow}>
                          <View style={styles.newTitleContainer}>
                            <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__CARD_DIP}</Text>
                          </View>
                          <Text style={styles.valueDetail}>Rp. {currencyFormatter(dipKartu)}</Text>
                        </View>
                      </View>
                      :
                      <View style={styles.borderBottomNoRow}>
                        <View style={styles.newTitleContainer}>
                          <Text style={styles.titleSimasTara}>{language.REQUEST_ATM_CARD__SHOP_GPN}</Text>
                        </View>
                        <Text style={styles.valueDetail}>Rp. {currencyFormatter(belanjaMerchantGPN)}</Text>
                      </View>
                    }
                  </View>
                </View>
                :
                null
              }
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.containerIcon}>
          <SinarmasButton disabled={isEmptyForm || isLessAmount || isEmptyBalances} onPress={goToNextPage()} text={language.GENERIC__CONTINUE}/>
        </View>
      </View>
    );
  }
}
export default connect(mapStateToProps)(AddNewAtmChooseSavings);
