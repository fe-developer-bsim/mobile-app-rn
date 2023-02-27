import {Image, ScrollView, Text, View} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter, toTitleCase, formatBillDetails} from '../../utils/transformer.util';
import {formatNpwp} from '../../utils/transformer.util';
import {isEmpty, result} from 'lodash';

import PropTypes from 'prop-types';
import React from 'react';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import savingPay from '../../assets/images/saving-paycard.png';
import styles from './IdBillingFormPayment.styles';
import map from 'lodash/map';

export const fields = {
  ACCOUNT_NO: 'accountNo'
};

class IdBillingFormPayment extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    updateFingerSetting: PropTypes.func,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    billingData: PropTypes.object,
    goHome: PropTypes.func,
    billerAccount: PropTypes.func,
    accounts: PropTypes.array,
    paramsData: PropTypes.object,
    billDetails: PropTypes.array
  }
  state = {
    haveNpwp: false
  }

  onChangeHandler = () => {
    const {haveNpwp} = this.state;
    if (haveNpwp) {
      this.setState({haveNpwp: false});
    } else {
      this.setState({haveNpwp: true});
    }
  }

  render () {
    const {formValues, handleSubmit, paramsData, billerAccount, billDetails} = this.props;
    const dataConfirmation = result(paramsData, 'dataConfirmation', {});
    const isExisting = result(paramsData, 'isPayment', false);
    const checkAcc = isEmpty(result(formValues, 'accountNo', {})) && isEmpty(result(paramsData, 'data.accountNo', {}));
    const accNo = isExisting ? result(paramsData, 'data.accountNo.accountNumber', '') : result(formValues, 'accountNo.accountNumber', '');
    const name = isExisting ? result(paramsData, 'data.accountNo.name', '') : result(formValues, 'accountNo.name', '');
    const productType = isExisting ? result(paramsData, 'data.accountNo.productType', '') : result(formValues, 'accountNo.productType', '');
    const balance = isExisting ? currencyFormatter(result(paramsData, 'data.accountNo.balances.availableBalance', '')) : currencyFormatter(result(formValues, 'accountNo.balances.availableBalance', ''));
    const npwpNumber = formatNpwp(result(dataConfirmation, 'npwp', ''));
    const npwpName = result(dataConfirmation, 'taxName', '');
    const npwpAddress = toTitleCase(result(dataConfirmation, 'taxAddress', ''));
    const nopNumber = !isEmpty(result(dataConfirmation, 'nopNumber', '')) ? result(dataConfirmation, 'nopNumber', '').match(/.{1,4}/g) : '';
    const nopDisplay = isEmpty(nopNumber) ? '' : nopNumber.join(' ');
    const taxType = result(dataConfirmation, 'taxType', '');
    const depositType = result(dataConfirmation, 'depositType', '');
    const dateStart = result(dataConfirmation, 'fromDate', '');
    const dateEnd = result(dataConfirmation, 'endDate', '');
    const nomorKetetapan = result(dataConfirmation, 'regularityNumber', '');
    const checkSK = !isEmpty(nomorKetetapan) || nomorKetetapan !== '';
    const jumlahSetor = result(dataConfirmation, 'amount', '');
    const terbilang = result(dataConfirmation, 'amountText', '');
    const displayTerbilang = !isEmpty(terbilang) ? terbilang.replace(/\s+/g, ' ') : terbilang;
    const berita = result(dataConfirmation, 'notes', '');
    const tahunPajak = result(dataConfirmation, 'taxYear', '');
    const idBilling = result(dataConfirmation, 'idBilling', '');
    const haveNpwp = result(dataConfirmation, 'haveNpwp', false);
    const currentBalance = isExisting ? result(paramsData, 'data.accountNo.balances.availableBalance', '') : result(formValues, 'accountNo.balances.availableBalance', '');
    const checkBalance = parseInt(currentBalance) < parseInt(jumlahSetor);
    const displayList = result(billDetails, 'displayList', []);
    const bills = formatBillDetails(displayList);
    const isDJP = result(dataConfirmation, 'isDJP', false);
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>{language.TITLE__BILL_PAY}</Text>
            </View>

            <View>
              
              <View style={styles.mt10}>
                {
                  checkAcc ?
                    <Touchable onPress={billerAccount} style={styles.emptySourceAccountContainer}>
                      <Text style={styles.mt10}>{language.GENERIC_BILLER__WALLET}</Text>
                      <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                    </Touchable> 
                    :
                    <View>
                      <Touchable onPress={billerAccount} style={styles.sourceAccountContainer}>
                        <View style={styles.iconContainer}>
                          <Image source={savingPay} style={styles.imageOffer2} />
                        </View>
                        <View style={styles.infoContainerSof}>
                          <Text style={styles.txtBoldSof}>{accNo}</Text>
                          <Text style={styles.txtBoldSof}>{name}</Text>
                          <Text style={styles.txtBoldSof}>{productType}</Text>
                          <Text style={styles.txtBoldSof}>Balance: {balance}</Text>
                        </View>
                        <SimasIcon name='arrow' size={15} style={styles.iconDetail}/>
                      </Touchable>
                      {
                        checkBalance && <View style={[styles.row2]}>
                          <SimasIcon name='input-error' style={styles.errIcon}/>
                          <Text style={styles.redText}>{language.VALIDATE__NOT_ENOUGHT_BALANCE}</Text>
                        </View>
                      }
                    </View>
                    
                }
                
              </View>
              <View>
                {
                  isDJP ?
                    <View>
                      <View style={styles.mt15}>
                        <View style={styles.boxContainer}>
                          <View style={styles.infoContainer}>
                            <Text style={styles.txtLight}>{language.ETAX_GENERATE_IDBILLING_SUBHEAD}</Text>
                            <Text style={styles.txtBold}>{idBilling}</Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.mt15}>
                        <View style={styles.boxContainer}>
                          <View style={styles.infoContainer}>
                            {
                              haveNpwp ?
                                <Text style={styles.txtLight}>{language.ETAX__FORM_ONE_NPWP}</Text>
                                :
                                <Text style={styles.txtLight}>{language.ETAX_DEPOSIT_NPWP_HINT}</Text>

                            }
                            <Text style={styles.txtBold}>{npwpNumber}</Text>
                          </View>
                        </View>
                      </View>

                      <View style={styles.mt15}>
                        <View style={styles.boxContainer}>
                          <View style={styles.infoContainer}>
                            {
                              haveNpwp ?
                                <Text style={styles.txtLight}>{language.GENERIC__NAME}</Text>
                                :
                                <Text style={styles.txtLight}>{language.ETAX_TAXPAYER_NAME_DEPOSITOR}</Text>
                            }
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
                            <Text style={styles.txtBold}>Rp {currencyFormatter(jumlahSetor)}</Text>
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
                    :
                    <View>
                      {map(bills, (value, k) => {
                        const nullValue = value === null || value === '';
                        return (
                          !nullValue && <View key={k}>
                            <View style={styles.mt15}>
                              <View style={styles.boxContainer}>
                                <View style={styles.infoContainer}>
                                  <View><Text style={styles.txtLight}>{toTitleCase(k)}</Text></View>
                                  <View><Text style={styles.txtBold}>{value}</Text></View>
                                  <View style={[styles.mv5]} />
                                </View>
                              </View>
                            </View>
                          </View>
                        ); 
                      }
                      )}
                    </View>
                }
              </View>

              <View style={styles.footer}>
                <SinarmasButton text={language.GENERATE_CONFIRMATION_BUTTON} onPress={handleSubmit} disabled={checkAcc || checkBalance}/>
              </View>   
              
            </View>
            

            
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default IdBillingFormPayment;