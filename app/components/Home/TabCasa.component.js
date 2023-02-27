import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground} from 'react-native';
import AccountCarousel from './AccountCarousel.component';
import styles from './Tabs.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import startsWith from 'lodash/startsWith';
import LinearGradient from 'react-native-linear-gradient';
import SimasIcon from '../../assets/fonts/SimasIcon';
import savingImageCard from '../../assets/images/savings-card.png';

class Casa extends React.Component {
  static propTypes = {
    accountList: PropTypes.array,
    transactions: PropTypes.array,
    navigateToTransactions: PropTypes.func,
    setCarouselReference: PropTypes.func,
    onSnapToItem: PropTypes.func,
    loadingError: PropTypes.bool,
    showReload: PropTypes.bool,
    showLoader: PropTypes.bool,
    onReloadPress: PropTypes.func,
    activeTab: PropTypes.string,
    cachedTransactions: PropTypes.object,
    setVisibility: PropTypes.func,
    accountVisibility: PropTypes.object,
    setDefaultAccount: PropTypes.func,
    defaultAccount: PropTypes.object,
    showDefaultAccountInfo: PropTypes.func,
    getMmq: PropTypes.object,
    getMmqDataDetail: PropTypes.func,
    cif: PropTypes.string,
    goToSavingAccount: PropTypes.func,
    invalid: PropTypes.bool,
    loadBalances: PropTypes.func,
    currentCarouselIndex: PropTypes.number,
    historyIndex: PropTypes.number,
    sendMail: PropTypes.func,
    goToSimasTaraDetail: PropTypes.func,
    approveAplication: PropTypes.func,
    goToCloseSimasTara: PropTypes.func,
    navigateToTransactionsFilter: PropTypes.func,
    isUsingDigisign: PropTypes.bool,
    goToshowDormantModal: PropTypes.func,
  }

  state = {
    refresh: false
  }

  componentWillReceiveProps (props) {
    if (props !== this.props) {
      this.setState({refresh: !this.state.refresh});
    }
  }

  render () {
    const {accountList = [], navigateToTransactions, onSnapToItem, setCarouselReference, activeTab = '', cachedTransactions = {},
      showLoader, loadingError, onReloadPress, showReload, setVisibility, accountVisibility, setDefaultAccount, currentCarouselIndex,
      defaultAccount, showDefaultAccountInfo, getMmq, getMmqDataDetail, cif, goToSavingAccount, invalid, loadBalances, historyIndex, sendMail, goToSimasTaraDetail, approveAplication, isUsingDigisign,
      navigateToTransactionsFilter, goToCloseSimasTara, goToshowDormantModal} = this.props;
    const transcationType = activeTab === 'currentAccount' ? 'lastTransactionsCurrent' : activeTab === 'savingAccount' ? 'lastTransactionsSavings' : 'lastTransactionsRdn';
    const transactions = (cachedTransactions[`${transcationType}`]);
    const details = {navigateToTransactions, activeTab, transactions, showLoader, loadingError, onReloadPress, showReload, getMmq, navigateToTransactionsFilter};
    const isVerified = !startsWith(cif, 'NK');

    return (
      <View style={styles.container}>
        {accountList.length < 0 ?
          <View style={styles.transactionsContainer}><Text style={styles.errorText}>{language.DASHBOARD__NO_ACCOUNTS}</Text></View> :
          accountList.length === 0 && activeTab === 'savingAccount' ?
            <View>
              <View style={styles.imageContainer}>
                <ImageBackground source={savingImageCard} borderRadius={15} style={styles.backgroundImage}>
                  <Text style={styles.titleLarge}>{language.DASHBOARD__ACCOUNT_SAVING}</Text>
                  <Text style={styles.titleLarge}>{language.DASHBOARD__ACCOUNT}</Text>
                </ImageBackground>
              </View>
              <View style={styles.tdDesription}>
                <Text style={styles.title}>{language.DASHBOARD__SAVING_ACCOUNT__WHY}</Text>
                <View style={styles.borderBottomRow}>
                  <SimasIcon name={'bling'} size={20} style={styles.redBling}/>
                  <Text style={styles.lightText}>{language.DASHBOARD__SAVING_ACOUNT__REASON_ONE}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <SimasIcon name={'bling'} size={20} style={styles.redBling}/>
                  <Text style={styles.lightText}>{language.DASHBOARD__SAVING_ACOUNT__REASON_TWO}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <SimasIcon name={'bling'} size={20} style={styles.redBling}/>
                  <Text style={styles.lightText}>{language.DASHBOARD__SAVING_ACOUNT__REASON_THREE}</Text>
                </View>
              </View>
              <View style={styles.buttonView}>
                <Touchable onPress={isVerified ? goToSavingAccount : goToSavingAccount } disabled={invalid}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={styles.gradientRed} style={styles.openTdButton}>
                    <Text style={styles.openTdText}>{language.DASHBOARD__NEW_SAVING_ACOUNT_TITLE}</Text>
                    <View style={styles.addIcon}>
                      <SimasIcon style={styles.iconColor} name='Plus' size={20}/>
                    </View>
                  </LinearGradient>
                </Touchable>
              </View>
            </View>
            :
            <View>
              <AccountCarousel setCarouselReference={setCarouselReference} onSnapToItem={onSnapToItem} accountList={accountList}
                details={details} currentCarouselIndex={currentCarouselIndex} historyIndex={historyIndex}
                onItemPress={navigateToTransactions} setVisibility={setVisibility} accountVisibility={accountVisibility}
                activeTab={activeTab} getMmq={getMmq} getMmqDataDetail={getMmqDataDetail} defaultAccount={defaultAccount}
                showDefaultAccountInfo={showDefaultAccountInfo} setDefaultAccount={setDefaultAccount} loadBalances={loadBalances} sendMail={sendMail} goToSimasTaraDetail={goToSimasTaraDetail}
                approveAplication={approveAplication} isUsingDigisign={isUsingDigisign} goToCloseSimasTara={goToCloseSimasTara} goToshowDormantModal={goToshowDormantModal}/>
            </View>
        }
      </View>
    );
  }
}

export default Casa;
