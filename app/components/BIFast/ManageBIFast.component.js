import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './ManageBIFast.style';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../Touchable.component';
import {ScrollView} from 'react-native-gesture-handler';
import {isEmpty, result, size} from 'lodash';
import savingPay from '../../assets/images/saving-paycard.png';

class ManageBIFastComponent extends Component {
  static propTypes = {
    addProxyBIFast: PropTypes.func,
    editProxyBIFast: PropTypes.func,
    unlinkProxyBIFast: PropTypes.func,
    transferViaProxyBIFast: PropTypes.func,
    accList: PropTypes.object,
    faqBiFast: PropTypes.func,
    backBiFast: PropTypes.func,
  }

  renderProxy = (product) => {
    const ProxyDefinition1_Val = result(product, 'ProxyDefinition1_Val', '');
    const CashAccount40_Nm = result(product, 'CashAccount40_Nm', '');
    const CashAccountType2ChoiceProxy_Prtry = result(product, 'CashAccountType2ChoiceProxy_Prtry', '');
    const GenericAccountIdentification1_Id = result(product, 'GenericAccountIdentification1_Id', '');
    return (
      <View style={styles.historyItem}>
        <Image source={savingPay} style={styles.imageOffer2}/>
        <View style={styles.billerDetailsRemittance}>
          <View style={styles.flex}>
            <Text style={styles.accTxt2}>{ProxyDefinition1_Val}</Text>
            <Text style={styles.typeTxt}>{CashAccount40_Nm}</Text>
            {CashAccountType2ChoiceProxy_Prtry === 'CCAC' ?
              <Text style={styles.typeTxt}>{'Current account'}</Text>
              : CashAccountType2ChoiceProxy_Prtry === 'SVGS' ?
                <Text style={styles.typeTxt}>{'Savings Account'}</Text>
                : CashAccountType2ChoiceProxy_Prtry === 'LOAN' ?
                  <Text style={styles.typeTxt}>{'Loan'}</Text>
                  : CashAccountType2ChoiceProxy_Prtry === 'CCRD' ?
                    <Text style={styles.typeTxt}>{'Credit Card'}</Text>
                    : CashAccountType2ChoiceProxy_Prtry === 'UESB' ?
                      <Text style={styles.typeTxt}>{'E-Money'}</Text>
                      : CashAccountType2ChoiceProxy_Prtry === 'OTHR' ?
                        <Text style={styles.typeTxt}>{'None of the above'}</Text>
                        :
                        <Text style={styles.typeTxt}>{'-'}</Text>
            }       
            <Text style={styles.typeTxt}>{GenericAccountIdentification1_Id}</Text>
          </View>
        </View>
      </View>  
    
    );
  }

  render () {
    const {addProxyBIFast, editProxyBIFast, unlinkProxyBIFast, accList, faqBiFast, backBiFast} = this.props;
    const sizeAccount = size(accList);

    return (
      <View style={styles.containerUtama}>
        <ScrollView style={styles.flexGrey}>
          <View style={styles.backgroundColorPink}/>
          <View style={styles.topBg}>
            <View style={styles.scan}>
              <Touchable onPress={backBiFast}>
                <SimasIcon name={'chevron'} size={25} style={styles.backButton}/>
              </Touchable>
              <Text style={styles.textScan}>{language.BIFAST_MANAGE}</Text>
              <Touchable  onPress={faqBiFast}>
                <Text style={styles.textScanFaq}>{language.BIFAST__FAQ}</Text>
              </Touchable>
            </View>
          </View>
          <View style={styles.containerBannerWhite}>
            <View style={styles.rowInformation}>
              <View style={styles.paddingBox}>
                <View style={styles.accNumberContainer}>
                  <View style={styles.amountTextTitleContent}>
                    <Text style={styles.amountTextTitle}>{language.BIFAST_ACCOUNT}</Text>
                  </View>                
                </View>              
              </View>             
            </View>
            {isEmpty(accList) ?
              <View style={styles.rowInformation}>
                <View style={styles.dontHave}>
                  <Text style={styles.captionText}>{language.BIFAST_ACCOUNT_DONTHAVE}</Text>
                </View>
              </View>
              :         
              <View>
                {accList.map(this.renderProxy)}
              </View>     
            }
          </View>

          <View style={styles.infoText}/>
          <View style={styles.containerHeader}>
            <View style={[styles.containerWhite]}>
              {
                sizeAccount === 2 ?
                  <View style={[styles.menu, styles.rowCenter]}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={styles.buttonDisabled}>{language.BIFAST_ADD_PROXY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.arrowDisabled} name='arrow' size={15}/>
                    </View>
                  </View>     
                  :
                  <Touchable style={[styles.menu, styles.rowCenter]} onPress={addProxyBIFast}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.BIFAST_ADD_PROXY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
              }
              <View style={styles.greyLine2} /> 
              {
                isEmpty(accList) ?
                  <View style={[styles.menu, styles.rowCenter]}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={styles.buttonDisabled}>{language.BIFAST_EDIT_PROXY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.arrowDisabled} name='arrow' size={15}/>
                    </View>
                  </View>    
                  :
                  <Touchable style={[styles.menu, styles.rowCenter]} onPress={editProxyBIFast}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.BIFAST_EDIT_PROXY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
              }
              <View style={styles.greyLine2} /> 
              {
                isEmpty(accList) ?
                  <View style={[styles.menu, styles.rowCenter]}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={styles.buttonDisabled}>{language.BIFAST_UNLINK_PROXY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.arrowDisabled} name='arrow' size={15}/>
                    </View>
                  </View>    
                  :
                  <Touchable style={[styles.menu, styles.rowCenter]} onPress={unlinkProxyBIFast}>
                    <View style={styles.rowCenter}>
                      <View>
                        <Text style={[styles.menuTitle2, styles.roboto]}>{language.BIFAST_UNLINK_PROXY}</Text>
                      </View>
                    </View>
                    <View style={styles.rowCenter}>
                      <SimasIcon style={styles.couponOutline} name='arrow' size={15}/>
                    </View>
                  </Touchable>
              }
            </View>
          </View>
          
          <View style={[styles.container]}>
            <View style={styles.bottomSpacing}>
              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.BIFAST_MANAGE_DISCLAIMER}</Text></View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default ManageBIFastComponent;