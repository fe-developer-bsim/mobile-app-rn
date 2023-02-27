import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Clipboard, Image} from 'react-native';
import {language} from '../../config/language';
import styles from './EmoneyCard.styles';
import {currencyFormatter} from '../../utils/transformer.util';
import SimasIcon from '../../assets/fonts/SimasIcon';
import startsWith from 'lodash/startsWith';
import Touchable from '../../components/Touchable.component';
import result from 'lodash/result';
import LinearGradient from 'react-native-linear-gradient';
import emoneyActivate from '../../assets/images/emoney-activate.png';
import Collapsible from 'react-native-collapsible';

class EmoneyCard extends React.Component {
  static propTypes = {
    accounts: PropTypes.array,
    userName: PropTypes.string,
    emoney: PropTypes.object,
    copyAccountNumber: PropTypes.func,
    cif: PropTypes.string,
    showOffer: PropTypes.bool,
    getBalanceEmoney: PropTypes.func,
    showUpgradeEmoney: PropTypes.func,
    cardLessWithdrawal: PropTypes.func,
    topUp: PropTypes.func,
    goToEmoneyHistoryNavigate: PropTypes.func,
    taptoEmoney: PropTypes.func,
    simasPoin: PropTypes.object,
    goToTopUp: PropTypes.func,
    upgradeKyc: PropTypes.func,
    checkEULAandNavigate: PropTypes.func,
    defaultAccount: PropTypes.func,
    showDefaultAccountInfo: PropTypes.func,
    setDefaultAccEmoney: PropTypes.func,
    emoneyQRpermissions: PropTypes.func,
    loadBalances: PropTypes.func,
    goToAutoDebitPage: PropTypes.func,
    toogleDefaultAccount: PropTypes.bool
  }

  state = {
    collapsed: false
  }

  copyAccountNumber = () => {
    const {emoney} = this.props;
    const accountNumber = result(emoney, 'accountNumber', '');
    Clipboard.setString(accountNumber);
  }

  dismissEmoneyOffer = () => {
    this.setState({collapsed: !this.state.collapsed});
  }
  emoneyCard = () => {
    const {cif, emoney = {}, goToEmoneyHistoryNavigate, loadBalances} = this.props;
    const accountNumber = result(emoney, 'accountNumber', '');
    const balance = result(emoney, 'balances.availableBalance', '');
    const isVerified = !startsWith(cif, 'NK');
    return (
      <View style={styles.balanceContainer}>
        <Touchable onPress={goToEmoneyHistoryNavigate} >
          <View style={styles.column}>
            <View>
              <SimasIcon name='simas' style={styles.simasIcon} size={10}/>
              <View style={styles.rowIconEmoney}>
                <SimasIcon name='emoney' style={styles.blackIcon} size={7}/>
                {isVerified && <SimasIcon name='simas-emoney-premium' style={styles.premiumIcon} size={12}/>}
              </View>
            </View>
            {
              balance !== '' ?
                <Text style={styles.emoneyBalance}>Rp {currencyFormatter(balance)}</Text>   
                :
                <Touchable onPress ={loadBalances} style={styles.reloadBalance}>
                  <Text style={styles.mediumText}>{language.EMONEY_CARD__TAP_TO_RELOAD}</Text>
                  <View style={styles.reloadIcon}><SimasIcon name='reload' style={styles.reloadIcon} size={15}/></View>
                </Touchable>
            }
            <Text style={styles.smallLightText}>{language.EMONEY__NO_ACCOUNT}{accountNumber}</Text>
          </View>
        </Touchable>
      </View>
    );
  }
  upgradeOrDefaultAccount = () => {
    const {cif, upgradeKyc, toogleDefaultAccount, goToAutoDebitPage} = this.props;
    const isVerified = !startsWith(cif, 'NK');
    return (
      <View>
        {!isVerified ?
          <Touchable onPress={upgradeKyc} style={[styles.columnCenter]}>
            <SimasIcon name='upgrade-e-money' size ={32} style={styles.whiteIcon}/>
            <Text style={styles.upgradeText}>{language.EMONEY__UPGRADE_ACCOUNT}</Text>
            <Text style={styles.upgradeText}>{language.EMONEY__DASHBOARD_E_MONEY}</Text>
          </Touchable>
          : toogleDefaultAccount ?
            <Touchable onPress={goToAutoDebitPage} style={styles.columnCenterAutoDebit}>
              <Text style={styles.defaultTextAutoDebit}>{language.SET_AUTODEBIT_TITTLE_DASHBOARD}</Text>
              <View style={styles.buttonDefaultON}>
                <Text style={styles.defaultTextWhite}>ON</Text>
              </View>
            </Touchable>
            :
            <Touchable onPress={goToAutoDebitPage} style={styles.columnCenterAutoDebit}>
              <Text style={styles.defaultTextAutoDebit}>{language.SET_AUTODEBIT_TITTLE_DASHBOARD}</Text>
              <View style={styles.buttonDefaultOFF}>
                <Text style={styles.defaultTextLightGrey}>OFF</Text>
              </View>
            </Touchable>
        }



      </View>
    );
  }

  topupEmoneyButton = () => {
    const {goToTopUp} = this.props;
    return (
      <View>
        <Touchable onPress={goToTopUp} style={styles.columnCenter}>
          <SimasIcon name='topup-e-money' size={32} style={styles.redIcon}/>
          <Text style={styles.blackText}>{language.EMONEY__DASHBOARD_TOP_UP}</Text>
          <Text style={styles.blackText}>{language.EMONEY__DASHBOARD_E_MONEY}</Text>
        </Touchable>
      </View>
    );
  }

  scanToPay = () => {
    const {emoneyQRpermissions} = this.props;
    return (
      <View>
        <Touchable onPress={emoneyQRpermissions} style={styles.columnCenter}>
          <SimasIcon name='scan-to-pay-e-money' size={32} style={styles.redIcon}/>
          <Text style={styles.blackText}>{language.EMONEY__DASHBOARD_SCAN}</Text>
          <Text style={styles.blackText}>{language.EMONEY__DASHBOARD_TO_PAY}</Text>
        </Touchable>
      </View>
    );
  }

  render () {
    const {cif, showOffer, showUpgradeEmoney} = this.props;
    const isVerified = !startsWith(cif, 'NK');
    if (showOffer) { // have bank account but no emoney
      return ( // taptoEmoney
        <Collapsible collapsed={this.state.collapsed} refName='card'>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            style={styles.purpleContainer}
            colors={styles.purpleGradient}>
            <Image source={emoneyActivate} style={styles.activateImage} />
            <View style={styles.activateInfoContainer}>
              <Text style={styles.whiteMediumText}>{language.EMONEY__BRAND}</Text>
              <Text style={styles.whiteText}>{language.EMONEY__ACTIVATE_BENEFIT}</Text>
              <View style={styles.rowEnd}>
                <Touchable onPress={this.dismissEmoneyOffer}>
                  <Text style={styles.whiteSmallText}>{language.EMONEY__ACTIVATE_LATER}</Text>
                </Touchable>
                <Touchable onPress={showUpgradeEmoney} style={styles.activateButton}>
                  <Text style={styles.blackSmallText}>{language.EMONEY__ACTIVATE_NOW}</Text>
                </Touchable>
              </View>
            </View>
          </LinearGradient>
        </Collapsible>
      );
    } else {
      return ( // kyc emoney
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.balanceDiv}>
              {this.emoneyCard()}
            </View>
            <View style={isVerified ? styles.whiteDiv : styles.redDiv}>
              {this.upgradeOrDefaultAccount()}
            </View>
            <View style={styles.eachDiv}>
              {this.topupEmoneyButton()}
            </View>
            <View style={styles.eachDiv}>
              {this.scanToPay()}
            </View>
          </View>
        </View>
      );
    }
  }
}

export default EmoneyCard;
