import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import AccountInfoItem from '../AccountInfoItem/AccountInfoItem.component';
import Carousel  from '../Carousel/Carousel.component';
import {noop, isEmpty, result, filter, startsWith} from 'lodash';
import styles from './Tabs.styles';
import AccountDetails from '../Home/AccountDetails.component';

class AccountCarousel extends React.Component {
  static propTypes = {
    accountList: PropTypes.array,
    onItemPress: PropTypes.func,
    onSnapToItem: PropTypes.func,
    setCarouselReference: PropTypes.func,
    linkCreditCard: PropTypes.func,
    activeTab: PropTypes.string,
    details: PropTypes.object,
    setVisibility: PropTypes.func,
    accountVisibility: PropTypes.object,
    cachedTransactionsDeposit: PropTypes.array,
    setDefaultAccount: PropTypes.func,
    defaultAccount: PropTypes.object,
    showDefaultAccountInfo: PropTypes.func,
    getMmq: PropTypes.object,
    getMmqDataDetail: PropTypes.func,
    goToLoanSummary: PropTypes.func,
    loadBalances: PropTypes.func,
    currentCarouselIndex: PropTypes.number,
    historyIndex: PropTypes.number,
    sendMail: PropTypes.func,
    goToSimasTaraDetail: PropTypes.func,
    approveAplication: PropTypes.func,
    cif: PropTypes.string,
    goToCloseSimasTara: PropTypes.func,
    isUsingDigisign: PropTypes.bool,
    numberCVV: PropTypes.object,
    showVCC: PropTypes.func,
    settingCC: PropTypes.func,
    loanDataNew: PropTypes.array,
    lang: PropTypes.string,
    goToshowDormantModal: PropTypes.func,
    navigateToConvert: PropTypes.func,
  }

  renderCard = (cardData) => {
    const {onItemPress = noop, details = {},
      setVisibility = noop, accountVisibility, cachedTransactionsDeposit, setDefaultAccount, defaultAccount, showDefaultAccountInfo, getMmq, getMmqDataDetail, loadBalances, currentCarouselIndex, approveAplication, isUsingDigisign, goToSimasTaraDetail, goToCloseSimasTara, numberCVV, lang, goToshowDormantModal} = this.props;
    const accountInfo = result(cardData, 'item', {});
    const index = result(cardData, 'index', 0);
    return (
      <View>
        <View key={index} style={styles.cardsContainer}>
          <AccountInfoItem accountInfo={accountInfo} key={index} index={index} details={details} onItemPress={onItemPress}
            setVisibility={setVisibility(index)} accountVisibility={accountVisibility} activeTab={details.activeTab}
            cachedTransactionsDeposit={cachedTransactionsDeposit} setDefaultAccount={setDefaultAccount}
            defaultAccount={defaultAccount} showDefaultAccountInfo={showDefaultAccountInfo}  getMmq={getMmq}
            getMmqDataDetail={getMmqDataDetail} loadBalances={loadBalances} currentCarouselIndex={currentCarouselIndex} approveAplication={approveAplication} isUsingDigisign={isUsingDigisign}
            goToSimasTaraDetail={goToSimasTaraDetail} goToCloseSimasTara={goToCloseSimasTara}  numberCVV={numberCVV} lang={lang} goToshowDormantModal={goToshowDormantModal}/>
        </View>
      </View>);
  }

  render () {
    const {accountList, onSnapToItem = noop, setCarouselReference = noop, activeTab = '', details, cachedTransactionsDeposit = [], getMmq, goToLoanSummary, historyIndex, getMmqDataDetail, sendMail, goToSimasTaraDetail, cif, loanDataNew, goToshowDormantModal} = this.props;
    if (!accountList && activeTab !== 'loan') return null;
    const dataMMQ = getMmq;
    let idContacts = [];
    const customContacts = filter(dataMMQ, (obj) => {
      const realDatareal = result(obj, 'dataMMQ.listData.dataset', []);
      filter(realDatareal, (obj2) => {
        idContacts.push(obj2);
      });
    });
    const content = [...accountList, ...idContacts, ...customContacts];
    const checkingCCActive = !startsWith(cif, 'NK') ? [...accountList] : [...accountList];
    const dataList = activeTab === 'creditCardAccount' ? checkingCCActive : !isEmpty(dataMMQ) ? content :  accountList;
    const accountInfo = result(dataList, historyIndex, {});
    const navigateToTransactions = result(details, 'navigateToTransactions');
    const navigateToTransactionsFilter = result(details, 'navigateToTransactionsFilter');
    return (
      <View>
        <Carousel carouselRef={setCarouselReference} onSnapToItem={onSnapToItem}
          data={dataList} renderCard={this.renderCard} details={details} cachedTransactionsDeposit={cachedTransactionsDeposit} getMmq={getMmq} goToLoanSummary={goToLoanSummary}/>
        <AccountDetails index={historyIndex} accountInfo={accountInfo} getMmqDataDetail={getMmqDataDetail} sendMail={sendMail} navigateToTransactions={navigateToTransactions} goToSimasTaraDetail={goToSimasTaraDetail} navigateToTransactionsFilter={navigateToTransactionsFilter} {...details} dataList={dataList} goToshowDormantModal={goToshowDormantModal} loanDataNew={loanDataNew}/>
      </View>
    );
  }
}

export default AccountCarousel;
