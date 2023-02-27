import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground} from 'react-native';
import AccountCarousel from './AccountCarousel.component';
import styles from './Tabs.styles';
import {language} from '../../config/language';
import LinearGradient from 'react-native-linear-gradient';
import SimasIcon from '../../assets/fonts/SimasIcon';
import loanCard from '../../assets/images/loan-card.png';
import Touchable from '../Touchable.component';

class Loan extends React.Component {
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
    serverTime: PropTypes.string,
    goToSummaryLoan: PropTypes.func,
    goToLoan: PropTypes.func,
    invalid: PropTypes.func,
    cif: PropTypes.string,
    loanMenuEnabledNTB: PropTypes.string,
    loadBalances: PropTypes.func,
    historyIndex: PropTypes.number,
    approveAplication: PropTypes.func,
    loanMenuEnabledETB: PropTypes.string,
    loanDataNew: PropTypes.array,
    lang: PropTypes.string
  }

  render () {
    const {accountList = [], navigateToTransactions, onSnapToItem, setCarouselReference, activeTab = '', cachedTransactions = {},
      showLoader, loadingError, onReloadPress, showReload, setVisibility, accountVisibility, serverTime, goToLoan, invalid, goToSummaryLoan,
      loadBalances, historyIndex, approveAplication, loanDataNew, lang} = this.props;
    const transcationType = activeTab === 'currentAccount' ? 'lastTransactionsCurrent' : activeTab === 'savingAccount' ? 'lastTransactionsSavings' : 'lastTransactionsRdn';
    const transactions = (cachedTransactions[`${transcationType}`]);

    return (
      <View style={styles.container}>
        {
          accountList.length > 0 ?
            <View>
              <AccountCarousel setCarouselReference={setCarouselReference} onSnapToItem={onSnapToItem} accountList={accountList}
                details={{navigateToTransactions, activeTab, transactions, showLoader, loadingError, onReloadPress, showReload, serverTime}}
                onItemPress={goToSummaryLoan} setVisibility={setVisibility} accountVisibility={accountVisibility}
                activeTab={activeTab} loadBalances={loadBalances} historyIndex={historyIndex} approveAplication={approveAplication} loanDataNew={loanDataNew} lang={lang}/>
            </View>
            :
            <View>
              <View style={styles.imageContainer}>
                <ImageBackground source={loanCard} borderRadius={15} style={styles.backgroundImage}>
                  <Text style={styles.titleLarge}>{language.DASHBOARD__ACCOUNT_LOAN}</Text>
                </ImageBackground>
              </View>
              <View style={styles.tdDesription}>
                <Text style={styles.title}>{language.DASHBOARD__LOAN_ACCOUNT_WHY}</Text>
                <View style={styles.borderBottomRow}>
                  <SimasIcon name={'bling'} size={20} style={styles.purpleBling}/>
                  <Text style={styles.lightText}>{language.DASHBOARD__LOAN_APPLY1}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <SimasIcon name={'bling'} size={20} style={styles.purpleBling}/>
                  <Text style={styles.lightText}>{language.DASHBOARD__LOAN_APPLY2}</Text>
                </View>
                <View style={styles.borderBottomRow}>
                  <SimasIcon name={'bling'} size={20} style={styles.purpleBling}/>
                  <Text style={styles.lightText}>{language.DASHBOARD__LOAN_APPLY3}</Text>
                </View>
              </View> 
              <View style={styles.buttonView}>
                <Touchable onPress={goToLoan} disabled={invalid}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={styles.gradientPurple} style={styles.openTdButton}>
                    <Text style={styles.openTdText}>{language.DASHBOARD__NEW_LOAN_ACCOUNT_TITLE}</Text>
                    <View style={styles.addIcon}>
                      <SimasIcon style={styles.iconColor} name='Plus' size={20}/>
                    </View>
                  </LinearGradient>
                </Touchable>
              </View>
            </View>
        }
      </View>
    );
  }
}

export default Loan;