import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView} from 'react-native';
import {SinarmasButton} from '../FormComponents';
import {currencyFormatter} from '../../utils/transformer.util';
import result from 'lodash/result';
import styles from './SimasInvestaLink.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import moment from 'moment';
import {getDayName, getAccountType} from '../../utils/transformer.util';

class FundTransferConfirmation extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    triggerAuth: PropTypes.func,
    currentDate: PropTypes.string,
    amount: PropTypes.string,
    infoPolis: PropTypes.object,
    summaryDetail: PropTypes.object,
    accountList: PropTypes.array
  }

  state = {
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed: true,
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

  render () {
    const {handleSubmit, amount, infoPolis, accountList, summaryDetail} = this.props;
    const {containerHeightStyle} = this.state;
    const currentDate = new Date();
    const accNumber = result(infoPolis, 'informasiRekening.rekeningNo', '');
    const accName = result(infoPolis, 'informasiRekening.rekeningNama', '');
    const accProduct = getAccountType(accountList, accNumber);
    const savingAcc = result(accProduct, '[0]', {});
    const accProductType = result(savingAcc, 'productType', '');
    let showTime = getDayName(currentDate) + ', ' + moment(currentDate).format('DD MMM YYYY');
    const nomorPolis = result(infoPolis, 'nomorPolis', '');
    const alokasiPremi = result(summaryDetail, 'alokasiPremi', '');
    
    return (
      <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={(!containerHeightStyle) ? styles.halfWidth : {}}>
          <View style={(!containerHeightStyle) ? styles.halfWidth : containerHeightStyle}>
            <View style={[styles.container]}>
              <Text style={styles.title}>{language.INQUIRY__SIL_EM_FUND_CONFIRM_TEXT}</Text>
              <View style={styles.labelSpacing} />
              <View style={styles.box}>
                <View style={styles.rowBetween}>
                  <View style={styles.leftIcon}><SimasIcon name={'amount'} size={30} style={styles.headerIcon}/></View>
                  <View>
                    <Text style={styles.amountText}>Rp {currencyFormatter(amount)}</Text>
                  </View>
                  <View style={styles.rightIcon} />
                </View>
              </View>
              <View style={styles.timeInitiate}>
                <Text style={styles.timeInitiateText}>On {showTime}</Text>
              </View>
              <View style={styles.labelSpacing} />
              <View style={styles.senderDetail}>
                <SimasIcon name={'wallet'} size={30} style={styles.walletIcon}/>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.sendAccNumber}>{nomorPolis}</Text>
                  <Text style={styles.sendAccNameType}>{language.INQUIRY__SIL_KAP}</Text>
                  <Text style={styles.sendAccNameType}>{alokasiPremi}</Text>
                </View>
              </View>
              <SimasIcon name={'more-menu'} size={25} style={styles.greyDot}/>
              <View style={styles.payeeDetail}>
                <SimasIcon name={'purchase'} size={30} style={styles.profileIcon}/>
                <View style={styles.rightItemContainer}>
                  <Text style={styles.sendAccNumber}>{accNumber}</Text>
                  <Text style={styles.sendAccNameType}>{accName}</Text>
                  <Text style={styles.sendAccNameType}>{accProductType}</Text>
                </View>
              </View>
            </View>

            <View style={styles.greyLineBold} />
            <View style={[styles.container]}>
              <View style={styles.bottomSpacing}>
                <View style={styles.footer}>
                  <View style={styles.rowAtten}>
                    <View style={styles.footerIconAtten}><SimasIcon name={'caution-circle'} size={25} style={styles.footerIconConfirm}/></View>
                    <Text style={styles.textFooterAtten}>{language.SIL__EMERGENCY_FUND_CONFIRMATION}</Text>
                  </View>
                </View>
                <View style={styles.footerHours}>
                  <View style={styles.rowAtten}>
                    <View style={styles.footerIconAtten}><SimasIcon name={'caution-circle'} size={25} style={styles.footerIconConfirmHours}/></View>
                    <Text style={styles.textFooterAttenConfirmHours}>{language.INQUIRY__SIL_EMERGENCY_FUND_DISCLAMER_HOURS}</Text>
                  </View>
                </View>
                <SinarmasButton style={styles.emFundBtnConfirm} text={language.INQUIRY__SIL_EM_FUND_CONFIRM_BTN} onPress={handleSubmit}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default FundTransferConfirmation;
