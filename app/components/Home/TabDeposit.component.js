import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground} from 'react-native';
import AccountCarousel from './AccountCarousel.component';
import styles from './Tabs.styles';
import {language} from '../../config/language';
import noop from 'lodash/noop';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import timeDepositImage from '../../assets/images/time-deposit-card.png';

class TabDeposit extends React.Component {

  static propTypes = {
    accountList: PropTypes.array,
    onSnapToItem: PropTypes.func,
    setCarouselReference: PropTypes.func,
    onNewTD: PropTypes.func,
    timeDepositDetail: PropTypes.object,
    loadingError: PropTypes.bool,
    showLoader: PropTypes.bool,
    onReloadPress: PropTypes.func,
    showReload: PropTypes.bool,
    activeTab: PropTypes.string,
    invalid: PropTypes.bool,
    isConnected: PropTypes.bool,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendOTP: PropTypes.func,
    config: PropTypes.array,
    triggerAuth: PropTypes.func,
    handleSubmit: PropTypes.func,
    accountNumber: PropTypes.string,
    userMobileNumber: PropTypes.string,
    cachedTransactions: PropTypes.object,
    setVisibility: PropTypes.func,
    accountVisibility: PropTypes.object,
    triggerAuthNav: PropTypes.func,
    cachedTransactionsDeposit: PropTypes.array,
    loadBalances: PropTypes.func,
    historyIndex: PropTypes.func
  }

  static defaultProps = {
    accountList: [],
    onSnapToItem: noop,
    setCarouselReference: noop,
    onNewTD: noop,
    timeDepositDetail: {},
    loadingError: false,
    showLoader: false,
    onReloadPress: noop,
    showReload: false,
    activeTab: '',
    isConnected: false,
    transRefNum: '',
    userId: 0,
    resendOTP: noop,
    config: [],
    triggerAuth: noop,
    invalid: false,
    closeTD: noop,
    triggerAuthNav: noop,
  }

  render () {
    const {accountList = [], onSnapToItem, setCarouselReference, onNewTD = noop,
      activeTab, invalid, showLoader, loadingError, onReloadPress, showReload, isConnected, historyIndex,
      transRefNum, userId, resendOTP, config, triggerAuth, handleSubmit, accountNumber, userMobileNumber,
      cachedTransactionsDeposit, setVisibility, accountVisibility, triggerAuthNav, loadBalances} = this.props;
    const timeDepositDetail = cachedTransactionsDeposit;
    return (
      <View>
        <View style={styles.container}>
          {accountList.length > 0 ?
            <View>
              <AccountCarousel setCarouselReference={setCarouselReference} onSnapToItem={onSnapToItem} accountList={accountList} activeTab={activeTab} historyIndex={historyIndex}
                details={{showLoader, loadingError, onReloadPress, showReload, timeDepositDetail, isConnected, activeTab,
                  transRefNum, userId, resendOTP, config, triggerAuth, handleSubmit, accountNumber, userMobileNumber, triggerAuthNav}}
                setVisibility={setVisibility} accountVisibility={accountVisibility} cachedTransactionsDeposit={cachedTransactionsDeposit} loadBalances={loadBalances}/>
            </View> :
            <View style={styles.imageContainer}>
              <ImageBackground source={timeDepositImage} borderRadius={15} style={styles.backgroundImage}>
                <Text style={styles.titleLarge}>{language.DASHBOARD__TIME}</Text>
                <Text style={styles.titleLarge}>{language.DASHBOARD__DEPOSIT}</Text>
              </ImageBackground>
            </View>}
          {accountList.length === 0 ?
            <View style={styles.tdDesription}>
              <Text style={styles.title}>{language.DASHBOARD__TIME_DEPOSIT__WHY}</Text>
              <View style={styles.borderBottomRow}>
                <SimasIcon name={'bling'} size={20} style={styles.orangeBling}/>
                <Text style={styles.lightText}>{language.DASHBOARD__TIME_DEPOSIT__REASON_ONE}</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <SimasIcon name={'bling'} size={20} style={styles.orangeBling}/>
                <Text style={styles.lightText}>{language.DASHBOARD__TIME_DEPOSIT__REASON_TWO}</Text>
              </View>
              <View style={styles.borderBottomRow}>
                <SimasIcon name={'bling'} size={20} style={styles.orangeBling}/>
                <Text style={styles.lightText}>{language.DASHBOARD__TIME_DEPOSIT__REASON_THREE}</Text>
              </View>
            </View> : null}
          <View style={styles.buttonView}>
            <Touchable onPress={onNewTD} disabled={invalid}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={styles.gradientYellow} style={styles.openTdButton}>
                <Text style={styles.openTdText}>{language.DASHBOARD__NEW_TD_TITLE}</Text>
                <View style={styles.addIcon}>
                  <SimasIcon style={styles.iconColor} name='Plus' size={20}/>
                </View>
              </LinearGradient>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

export default TabDeposit;
