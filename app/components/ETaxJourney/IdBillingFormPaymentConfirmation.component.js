import {ScrollView, Text, View} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {formatNpwp, inNumber, currencyFormatter, toTitleCase, formatBillDetails} from '../../utils/transformer.util';
import {result, isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {language} from '../../config/language';
import styles from './IdBillingFormPaymentConfirmation.styles';
import map from 'lodash/map';

export const fields = {
  ACCOUNT_NO: 'accountNo'
};

class IdBillingFormPaymentConfirmation extends React.Component {
  static propTypes = {
    createIDBilling: PropTypes.func,
    updateFingerSetting: PropTypes.func,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    billingData: PropTypes.object,
    goHome: PropTypes.func,
    billerAccount: PropTypes.func,
    accounts: PropTypes.array,
    paramsData: PropTypes.object
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
    const {handleSubmit, paramsData} = this.props;
    const accNo = result(paramsData, 'accountNo.accountNumber', '');
    const idBilling = result(paramsData, 'idBilling', '').match(/.{1,4}/g);
    const idBillingDisplay = idBilling.join(' ');
    const npwpNumber = formatNpwp(result(paramsData, 'npwp', ''));
    const npwpName = result(paramsData, 'nama', '');
    const npwpAddress = toTitleCase(result(paramsData, 'alamat', ''));
    const nopNumber = !isEmpty(result(paramsData, 'nop', '')) ? result(paramsData, 'nop', '').match(/.{1,4}/g) : '';
    const nopDisplay = isEmpty(nopNumber) ? '' : nopNumber.join(' ');
    const taxType = result(paramsData, 'jenisPajak', '');
    const depositType = result(paramsData, 'jenisSetoran', '');
    const dateStart = result(paramsData, 'dateStart', '');
    const dateEnd = result(paramsData, 'dateEnd', '');
    const nomorKetetapan = result(paramsData, 'nomorKetetapan', '');
    const jumlahSetor = result(paramsData, 'jumlahSetor', '');
    const terbilang = inNumber(jumlahSetor);
    const displayTerbilang = terbilang.replace(/\s+/g, ' ');
    const berita = result(paramsData, 'berita', '');
    const tahunPajak = result(paramsData, 'tahunPajak', '');
    const haveNpwp = result(paramsData, 'haveNpwp', false);
    const displayList = result(paramsData, 'resData.result.displayList', []);
    const bills = formatBillDetails(displayList);
    const isDJP = result(paramsData, 'confirmData.dataConfirmation.isDJP', true);
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>{language.ETAX_GENERATE_IDBILLING_HEADER}</Text>
            </View>

            <View>
              {
                isDJP ?
                  <View>
                    <View style={styles.mt15}>
                      <View style={styles.boxContainer}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.txtLight}>{language.GENERIC_BILLER__SOURCE_ACC}</Text>
                          <Text style={styles.txtBold}>{accNo}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.mt15}>
                      <View style={styles.boxContainer}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.txtLight}>{language.ETAX_GENERATE_IDBILLING_SUBHEAD}</Text>
                          <Text style={styles.txtBold}>{idBillingDisplay}</Text>
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

                    <View style={styles.mt15}>
                      <View style={styles.boxContainer}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.txtLight}>{language.ETAX_TAX_REGULARITY_NUMBER}</Text>
                          <Text style={styles.txtBold}>{nomorKetetapan}</Text>
                        </View>
                      </View>
                    </View>

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
                    <View style={styles.mt15}>
                      <View style={styles.boxContainer}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.txtLight}>{language.GENERIC_BILLER__SOURCE_ACC}</Text>
                          <Text style={styles.txtBold}>{accNo}</Text>
                        </View>
                      </View>
                    </View>
                    
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
              <View style={styles.footer}>
                <SinarmasButton text={language.GENERATE_CONFIRMATION_BUTTON} onPress={handleSubmit}/>
              </View>   
            </View>
            

            
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default IdBillingFormPaymentConfirmation;