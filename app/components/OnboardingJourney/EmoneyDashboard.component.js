import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './EmoneyDashboard.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import GetHistoryEmoney from './GetHistoryEmoney.component';
import {currencyFormatter} from '../../utils/transformer.util';
import Touchable from '../../components/Touchable.component';
import startsWith from 'lodash/startsWith';
import {language} from '../../config/language';


class LandingTabView extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    goToAllTransactions: PropTypes.func,
    emoneyAccounts: PropTypes.object,
    emoney: PropTypes.object,
    goToTopUp: PropTypes.func,
    cif: PropTypes.string,
    upgradeKyc: PropTypes.func,
    gotoTopUpNkc: PropTypes.func,
    sendMail: PropTypes.func,
    primaryToogleAccount: PropTypes.bool,
    goToSwitchpage: PropTypes.func,
    switchAccountToogleBE: PropTypes.bool
  }


  render () {
    const {goToAllTransactions, emoneyAccounts, emoney, goToTopUp, cif, upgradeKyc, transactions = [], gotoTopUpNkc, sendMail, primaryToogleAccount, goToSwitchpage, switchAccountToogleBE} = this.props;
    const rangeFilterEmoney = result(transactions, 'filters.selectedRange.value', '');
    const transactionsEmoney = rangeFilterEmoney === 'last10' ? result(transactions, 'last10', []) : rangeFilterEmoney === 'last2Months' ? result(transactions, 'last2Months', []) : rangeFilterEmoney === 'last3Months' ? result(transactions, 'last3Months', []) : result(transactions, 'lastMonth', []);
    const accountNumber = result(emoneyAccounts, 'accountNumber', '');
    const availableBalance = result(emoney, 'availableBalance', '');
    const isVerified = !startsWith(cif, 'NK');
    return (
      <View style={styles.containerScrollView}>
        <View style={styles.backgroundColor1}>
          <View style={styles.containerBanner}>
            <View style={styles.containerBillpay2}>
              <View style={styles.containerLeft}>
                <View style={styles.borderBillpay}>
                  <SimasIcon name='simas' style={styles.redIcon} size={13}/>
                  <View style={{flexDirection: 'row'}}>
                    <SimasIcon name='emoney' style={styles.blackIcon} size={10}/>
                    {isVerified && <SimasIcon name='simas-emoney-premium' style={styles.premiumIcon} size={12}/>}
                  </View>
                </View>
                <Touchable onPress={upgradeKyc} style={styles.borderBillpay}>
                  { isVerified ?
                    null
                    :  <Text style={styles.textUpgrade} >{language.UPGRADE__EMONEY} </Text> }
                </Touchable>
                {switchAccountToogleBE && <Touchable style={[styles.menu, styles.rowCenter]} onPress={goToSwitchpage}>
                  <View style={styles.rowCenter}>
                    <Text style={[styles.menuTitle2, styles.roboto]}>{language.SET_AUTODEBIT_TITTLE}</Text>
                    {primaryToogleAccount === true ? 
                      <View style={styles.buttonOn}>
                        <Text style={styles.defaultTextWhite}>{language.SET_AUTODEBIT_FLAG_ON}</Text>
                      </View> :
                      <View style={styles.buttonOff}>
                        <Text style={styles.defaultTextGrey}>{language.SET_AUTODEBIT_FLAG_OFF}</Text>
                      </View>
                    }
                  </View>
                </Touchable>
                }
              </View>
              <View style={styles.containerLeft2}>
                <View style={styles.borderBillpay}>
                  <Text style={styles.textBalance} >{language.SEND__AVAILABLE_BALANCE} </Text>
                  <Text style={styles.textAmount} >{availableBalance === 0 ? '-' : currencyFormatter(availableBalance)}</Text>
                  <Text style={styles.textAccNum} >{accountNumber}</Text>
                </View>
                <Touchable onPress={ isVerified ? goToTopUp : gotoTopUpNkc} style={styles.topUpBotton}>
                  <Text style={styles.topUpText} >+ {language.EMONEY_TOPUP__TITLE} </Text>
                </Touchable>
              </View>
            </View>
          </View>
        </View>
        <GetHistoryEmoney transactions={transactionsEmoney.slice(0, 10)} hideIcon={true} isSaving={true} goToAllTransactions={goToAllTransactions} accountNumber={accountNumber} sendMail={sendMail}/>
      </View>

    );
  }
}

export default LandingTabView;
