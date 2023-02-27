import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, ImageBackground, ScrollView} from 'react-native';
import styles from './SimasInvestaLink.styles';
import {language} from '../../config/language';
import result from 'lodash/result';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import SILBackground from '../../assets/images/simasInvestaLink-bg.jpg';
import {SinarmasButton} from '../FormComponents';
import moment from 'moment';
import {currencyFormatter} from '../../utils/transformer.util';
import Slider from 'react-native-slider';

class InvestmentComponent extends React.Component {
  static propTypes = {
    showAlert: PropTypes.func,
    listSummary: PropTypes.object,
    summaryDetail: PropTypes.object,
    infoPolis: PropTypes.object,
    sliderChange: PropTypes.func,
    amountSlider: PropTypes.number,
    showAlertAmount: PropTypes.func,
  }

  render () {
    const {showAlert, summaryDetail, infoPolis, sliderChange, amountSlider, showAlertAmount} = this.props;
    const alokasiPremi = result(summaryDetail, 'alokasiPremi', '');
    const amount = result(summaryDetail, 'amount', '');
    const mti = result(summaryDetail, 'mti', '');
    const tempPeriode = result(summaryDetail, 'periode', '').split(' - ');
    const tempPeriode1 = moment(tempPeriode[0]).format('DD MMM YY');
    const tempPeriode2 = moment(tempPeriode[1]).format('DD MMM YY');
    const periode = tempPeriode1 + ' - ' + tempPeriode2;
    const tanggalJatuhTempo = moment(result(summaryDetail, 'tanggalJatuhTempo', '')).format('DD MMM YY');
    const statusTopup = result(summaryDetail, 'statusTopup', '');
    const polisNumber = result(infoPolis, 'nomorPolis', ''); 
    const maxWithdrawal = result(infoPolis, 'maxWithdrawal', '');
    const valAmountSlider = amountSlider % 1000000 !== 0;

    return (
      <View style={styles.offsetOpacity}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} style={styles.container}>
          <View style={styles.upperContainer}>
            <ImageBackground source={SILBackground} style={styles.backgroundImageEmFund}>
              <View style={styles.padding}>
                <View style={styles.dropDownContainer}>
                  <Text style={styles.polis}>{language.INQUIRY__SIL_NO_POLIS_TITLE}</Text>
                  <Touchable onPress={this.selectNoPolis}>
                    <View style={styles.dropDown}>
                      <Text style={styles.noPolis}>{polisNumber}</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View>
            <View style={styles.carouselContainerEmFund}>
              <View style={styles.rowDetails}>
                <View style={styles.leftContainer}>
                  <Text style={styles.detailTitle}>{language.INQUIRY__SIL_ALOKASI_PREMI}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.detailValues}>{alokasiPremi}</Text>
                </View>
              </View>
              <View style={styles.greyLine}/>
              <View style={styles.rowDetails}>        
                <View>
                  <Text style={styles.detailTitle}>{language.INQUIRY__SIL_INFO_TOTAL_PREMI}</Text>
                </View>
                <View>
                  <Text style={styles.detailValues}>{language.DASHBOARD__ACCOUNT_IDR} {currencyFormatter(amount)}</Text>
                </View>
              </View>
              <View style={styles.greyLine}/>        
              <View style={styles.rowDetails}>                
                <View>
                  <Text style={styles.detailTitle}>{language.INQUIRY__SIL_INFO_MTI}</Text>
                </View>
                <View>
                  <Text style={styles.detailValues}>{mti}</Text>
                </View>
              </View>
              <View style={styles.greyLine}/>        
              <View style={styles.rowDetails}>                        
                <View style={styles.leftContainer}>
                  <Text style={styles.detailTitle}>{language.INQUIRY__SIL_INFO_PERIODE_MTI}</Text>
                </View>
                <View style={styles.rightContainer}>
                  <Text style={styles.detailValues}>{periode}</Text>
                </View>
              </View>
              <View style={styles.greyLine}/>        
              <View style={styles.rowDetails}>                        
                <View>
                  <Text style={styles.detailTitle}>{language.INQUIRY__SIL_INFO_TANGGAL_JATUH_TEMPO}</Text>
                </View>
                <View>
                  <Text style={styles.detailValues}>{tanggalJatuhTempo}</Text>
                </View>
              </View>
              <View style={styles.greyLine}/>        
              <View style={styles.rowDetails}>                                
                <View>
                  <Text style={styles.detailTitle}>{language.EMONEY__STATUS}</Text>
                </View>
                <View>
                  <Text style={styles.detailValues}>{statusTopup}</Text>
                </View>
              </View>   
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <View>
              <Text style={styles.withdrawalText}>{language.INQUIRY__SIL_EM_FUND_WITHDRAWAL}</Text>
              <View style={styles.middleContainerSlider}>
                <View>
                  <Text style={styles.rpText}>Rp </Text> 
                </View>
                <View>
                  <Text style={styles.amountTextSlider}>{currencyFormatter(amountSlider)}</Text> 
                </View>
              </View>
              <View style={styles.greyLine}/> 
              <View style={styles.sliderContainer}>
                <Slider
                  value={amountSlider}
                  onValueChange={sliderChange}
                  minimumValue={1000000}
                  maximumValue={maxWithdrawal}
                  step={1000000}
                  minimumTrackTintColor= '#ED1D25'
                  maximumTrackTintColor= '#ffcccc'
                  thumbTintColor= '#ED1D25'
                />
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.minimumAmount}>
                  <Text style={styles.amount}>{language.INQUIRY__SIL_TOTAL_EM_FUND}</Text> 
                </View>
                <View style={styles.maximumAmount}>
                  <Text style={styles.amount}>Rp {currencyFormatter(maxWithdrawal)}</Text> 
                </View>
              </View>
              <View style={styles.minimumAmount}>
                <Text style={styles.amount}>{language.INQUIRY__SIL_EM_FUND_AMOUNT_ATTEN}</Text> 
              </View>
            </View>
            <View />
            <View style={styles.footerEmFund}>
              <View style={styles.rowAtten}>
                <View style={styles.footerIconAtten}><SimasIcon name={'caution-circle'} size={25} style={styles.footerIcon}/></View>
                <Text style={styles.textFooterAtten}>{language.INQUIRY__SIL_EMERGENCY_FUND_ATTEN}</Text>
              </View>
            </View>
            <View style={styles.footerEmFundHours}>
              <View style={styles.rowAtten}>
                <View style={styles.footerIconAtten}><SimasIcon name={'caution-circle'} size={25} style={styles.footerIcon}/></View>
                <Text style={styles.textFooterAttenHours}>{language.INQUIRY__SIL_EMERGENCY_FUND_DISCLAMER_HOURS}</Text>
              </View>
            </View>
           
            <View style={styles.continueEmFundView}>
              <SinarmasButton onPress={valAmountSlider ? showAlertAmount() : showAlert(amountSlider)} >
                <Text style={styles.continueEmFundText}>{language.GENERIC__CONTINUE}</Text>
              </SinarmasButton>
            </View>
          </View>
        </ScrollView>      
      </View>
    );
  }
}

export default InvestmentComponent;
