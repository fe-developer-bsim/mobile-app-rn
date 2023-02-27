import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './QRTcicoConfirmPage.styles';
import {SinarmasButton} from '../FormComponents';
import {noop} from 'lodash/noop';
import {language} from '../../config/language';
import result from 'lodash/result';
import {wrapMethodInFunction, currencyFormatter, getDayName, toTitleCase} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import {Field} from 'redux-form';
import SinarmasInputBoxRevamp from '../FormComponents/SinarmasInputBox/SinarmasInputBoxRevamp.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import bG from '../../assets/images/backgroud_rev.png';
import {isEmpty} from 'lodash';

class QRTcicoConfirmPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    formValues: PropTypes.object,
    defaultAccount: PropTypes.object,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    goToCoupon: PropTypes.func,
    couponUse: PropTypes.string,
    removeCoupon: PropTypes.func,
    checkCoupon: PropTypes.func,
    isLogin: PropTypes.bool,
  }

  state = {
    disabled: false,
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
  }

  onModalSubmit = () => {
    this.setState({disabled: true}, () => {
      const {handleSubmit = noop} = this.props;
      wrapMethodInFunction(handleSubmit());
      setTimeout(() => {
        this.setState({disabled: false});
      }, 7000);
    });
  };

  remove=() => {
    this.props.removeCoupon();
  }

  setContainerHeightStyle = (e) => {
    this.setState({containerHeightStyle: {minHeight: e.nativeEvent.layout.height - 20}});
  }

  summaryCollapse = () => {
    this.setState({summaryCollapsed: !this.state.summaryCollapsed});
  }

  expand = () => {
    this.setState({showExpand: !this.state.showExpand});
  }

  goToCoupon=() => {
    const {navigation, checkCoupon} = this.props;
    const amountVal = Number(result(navigation, 'state.params.data.amountVal', 0));
    const billerCode = '123456';
    checkCoupon(amountVal, billerCode);
  }

  render () {
    const {navigation, formValues, isLogin, submitting, ...reduxFormProps} = this.props;
    const {invalid = false} = reduxFormProps;
    const navParams = result(navigation, 'state.params');
    const transrefNum = result(navParams, 'resData.transferTransaction.transRefNum', '');
    const isCashout = result(navParams, 'jsonDt.62.08', '') === 'CWDL';
    const rrn = transrefNum.substring(transrefNum.length - 12, transrefNum.length);
    const rrnCashout = result(navParams, 'inquiryRes.retrieval_reference_number', '');
    const feeCout = result(navParams, 'inquiryRes.bankCharge', '').toString();
    const feeTrf = result(navParams, 'resData.transferTransaction.bankCharge', '').toString();
    const rrnShow = isCashout ? rrnCashout : rrn;
    const fee = isCashout ? feeCout : feeTrf;
    const amountVal = result(navigation, 'state.params.data.amountVal', 0);
    const notes = result(navigation, 'state.params.data.notes', '');
    const desAcc = result(navParams, 'jsonDt.40.02', 0);
    const desName = result(navParams, 'jsonDt.59', 0);
    const currentDate = new Date();
    const total = isEmpty(fee) || fee === null ? parseInt(amountVal) : parseInt(fee) + parseInt(amountVal);
    const showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const disableTemp = false;
    const showDetailAmt = this.state.summaryCollapsed;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent} extraScrollHeight={100} enableOnAndroid={true}>
        <ImageBackground source={bG} style={styles.imageSummary} />
        <View style={styles.tes} >
          <View style={styles.containerTransfer}>
            <View style={styles.containerBanner}>
              <View style={styles.containerLeft}>
                <View style={styles.targetAcc}>
                  <View style={styles.textAcc}>
                    <Text style={styles.targetName}>Amount</Text>
                  </View>
                </View>
                <View style={styles.accNumberContainer}>
                  <View style={styles.accNumber}>
                    <View style={styles.iconRp}>
                      <SimasIcon name={'new_rpicon'} size={50} style={styles.headerIcon}/>
                    </View>
                    <View>
                      <Text style={styles.amountText}>{currencyFormatter(total)}</Text>
                    </View>
                    <View>
                      <SimasIcon onPress={this.summaryCollapse} name={showDetailAmt ? 'expand-black' : 'colapse-black'} size={20} style={[styles.plus]}/>
                    </View>
                  </View>
                  
                  <View>
                    <Collapsible collapsed={this.state.summaryCollapsed} refName='summary'>
                      <View style={[styles.greyLine, styles.mt10]} />
                      <View style={styles.row}>
                        <Text style={styles.robotoLight}>{language.GENERIC_BILLER__AMOUNT_TXT}</Text>
                        <Text style={styles.robotoLight}>Rp {currencyFormatter(amountVal)}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.robotoLight}>{language.GENERIC_BILLER__FEE_TXT}</Text>
                        <Text style={styles.robotoLight}>Rp {isEmpty(fee) || fee === null ? '0' : currencyFormatter(fee)}</Text>
                      </View>
                    </Collapsible>
                  </View>
                </View>
                {
                  isCashout ? 
                    null : 
                    <View> 
                      <View style={styles.targetAcc}>
                        <View style={styles.textAcc}>
                          <Text style={styles.targetName}>Additional Information</Text>
                        </View>
                      </View>
                      <View style={styles.accNumberContainer}>
                        <View style={styles.accNumber}>
                          <View style={styles.notetRight}>
                            <Field
                              name='notes'
                              placeholder={notes}
                              // format={Utils.formatFieldAmount}
                              // normalize={Utils.normalizeAmount}
                              disabled={true}
                              component={SinarmasInputBoxRevamp}
                              keyboardType='phone-pad'
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                }
                
                <View style={styles.timeInitiate}>
                  {
                    result(formValues, 'transferTime', '') === '' ?
                      <Text style={styles.timeInitiateText}>On {showTime}</Text>
                      :
                      <Text style={styles.timeInitiateText}>On {getDayName(result(formValues, 'transferTime', '')) + ', ' + moment(result(formValues, 'transferTime', '')).format('DD MMM YYYY')}</Text>
                  }
                </View>
                <View style={styles.labelSpacing} />
                <View style={styles.senderDetail}>
                  <View style={styles.sofCard}>                            
                    <SimasIcon name={'new_card'} size={17} style={styles.iconRed}/>
                  </View>
                  <View style={styles.rightItemContainer}>
                    {
                      isLogin ?
                        <View>
                          <Text style={styles.sendAccNumber}>{result(navParams, 'data.sourceAcc.accountNumber', 'NIL')}</Text>
                          <Text style={styles.sendAccName}>{toTitleCase(result(navParams, 'data.sourceAcc.name', 'NIL'))}</Text>
                          <Text style={styles.sendAccType}>{result(navParams, 'data.sourceAcc.productType', 'NIL')}</Text>
                        </View>
                        :
                        <View>
                          <Text style={styles.sendAccNumber}>{result(navParams, 'data.sourceAcc.accountNumber', 'NIL')}</Text>
                        </View>
                    }
                    
                  </View>
                </View>
                <View style={styles.dotContainer}>
                  <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                  <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
                </View>
                <View style={styles.payeeDetail}>
                  <View style={styles.sofCard}>                            
                    <SimasIcon name={'new-send'} size={35} style={styles.iconBlue}/>
                  </View>
                  <View style={styles.rightItemContainer}>
                    {
                      isCashout ? 
                        null :
                        <Text style={styles.sendAccNumber}>{desAcc}</Text>
                    }
                    <Text style={styles.sendAccName}>{toTitleCase(desName)}</Text>
                  </View>
                </View>
                <View style={styles.greyLineBold} />
                <View style={styles.extraPadding}><Text style={styles.smallGreyText}>{language.TRANSFER__METHOD_FOOTER}</Text>
                </View>
              </View>
              {
                
                isCashout ? <View style={styles.transferDetail}>
                  <View style={styles.transferDetailRight}>
                    <Text style={styles.textDetailLeft}>{language.PAYMENT_STATUS__RRN_TRANS}</Text>
                    <Text style={styles.textDetailLeft}>{rrnShow}</Text>
                  </View>
                
                </View> 
                  : <View style={styles.transferDetail}>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>{language.PAYMENT_STATUS__RRN_TRANS}</Text>
                      <Text style={styles.textDetailLeft}>{rrnShow}</Text>
                    </View>
                    <View style={styles.greyLineBold2} />

                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Transfer Amount</Text>
                      <Text style={styles.textDetailLeft}>Rp. {currencyFormatter(amountVal)}</Text>
                    </View>
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Fee</Text>
                      <Text style={styles.textDetailLeft}>Rp {isEmpty(fee) || fee === null ? '0' : currencyFormatter(fee)}</Text>
                    </View>
                    <View style={styles.greyLineBold2} />
                    <View style={styles.transferDetailRight}>
                      <Text style={styles.textDetailLeft}>Total Amount</Text>
                      <Text style={styles.textDetailLeft}>Rp. {currencyFormatter(total)}</Text>
                    </View>
                  </View>
              }
              

              <View style={styles.containtextExplanation}>
                <SimasIcon name={'caution-circle'} size={25} style={styles.explainIcon}/>
                <View style={styles.containExplantionRight}><Text style={styles.textExplanation}>{language.CONFIRMATION_PAGE__EXPLANATION}</Text></View>
              </View>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
        <View style={styles.bottomSpacing}>
          <SinarmasButton style={styles.btnConfirm} onPress={this.onModalSubmit} disabled={invalid || submitting || disableTemp} >
            <Text style={styles.buttonLargeTextStyle}>{isCashout ? language.QR_GPN__MERCHANT_BTN : language.TRANSFER__BUTTON_TRANSFER}</Text>
          </SinarmasButton>
        </View> 
        
      </KeyboardAwareScrollView>
    );
  }
}


export default QRTcicoConfirmPage;
