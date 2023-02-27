import React, {Component} from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ScrollView
} from 'react-native';
import CloseBoxOri from '../../assets/images/closeBox.png';
import EmptyBox from '../../assets/images/BlankBoxLuckyDip.png';
import LuckyDipGrandPrizeOri from '../../assets/images/LuckyDipPGrandPrize.png';
import LuckyDipSimasPoinOri from '../../assets/images/LuckyDipPoin.png';
import LuckyDipCashBackOri from '../../assets/images/LuckyDipVoucher.png';
import LuckydipEvoucherOri from '../../assets/images/LuckyDipAlfa.png';
import styles from './LuckyDip.styles';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import * as actionCreators from '../../state/actions/index.actions.js';
import {language} from '../../config/language';
import BackGroundPic from '../../assets/images/BackgroundLuckyDip.png';
import {Toast} from '../../utils/RNHelpers.util';
import {destroy} from 'redux-form';
import Touchable from '../Touchable.component';
import {storageKeys, set} from '../../utils/storage.util';
import {getLatestLuckyDipCurrentTicket, getLatestLuckyDipInfo} from '../../utils/middleware.util';
// new HHH 3 tier
import SilverCloseBox from '../../assets/images/silver-close.png';
import SilverBoxAlfa from '../../assets/images/silver-voucher.png';
import SilverBoxCashback from '../../assets/images/silver-cashback.png';
import SilverBoxPoin from '../../assets/images/silver-poin.png';
import SilverBoxPrize from '../../assets/images/silver-prize.png';

import GoldCloseBox from '../../assets/images/gold-close.png';
import GoldBoxAlfa from '../../assets/images/gold-voucher.png';
import GoldBoxCashback from '../../assets/images/gold-cashback.png';
import GoldBoxPoin from '../../assets/images/gold-poin.png';
import GoldBoxPrize from '../../assets/images/gold-prize.png';

import PlatinumCloseBox from '../../assets/images/platinum-close.png';
import PlatinumBoxAlfa from '../../assets/images/platinum-voucher.png';
import PlatinumBoxCashback from '../../assets/images/platinum-cashback.png';
import PlatinumBoxPoin from '../../assets/images/platinum-poin.png';
import PlatinumBoxPrize from '../../assets/images/platinum-prize.png';

const openLink = (officeLink) => () => {
  Linking.canOpenURL(officeLink).then((supported) => {
    if (supported) {
      Linking.openURL(officeLink);
    } else {
      Toast.show(language.ERROR_MESSAGE__CANNOT_HANDLE_URL, Toast.LONG);
    }
  });
};

export default class LuckyDip extends Component {
  static propTypes = {
    couponCounterDetail: PropTypes.number,
    getSpinRewards: PropTypes.func,
    dispatch: PropTypes.func,
    hideSpinner: PropTypes.func,
    showSpinner: PropTypes.func,
    goToFillInformation: PropTypes.func,
    luckyDipCounter: PropTypes.string,
    tokenId: PropTypes.string,
    emptyBoxModal: PropTypes.func,
    luckyDipCache: PropTypes.object,
    luckyDipAllcounter: PropTypes.object,
    luckyDipMultiTierFlag: PropTypes.bool,
    getSpinRewardsNew: PropTypes.func
  }
  state = {
    ready: false,
    fadeValueTwo: new Animated.Value(0),
    fadeValue: new Animated.Value(0),
    initialStateOne: false,
    typePrize: '',
    disabled: false,
    openBoxParam: ''
  };

  _start = (codeToken) => () => {
    const {dispatch, getSpinRewards, getSpinRewardsNew, hideSpinner, showSpinner, tokenId, luckyDipCache, luckyDipAllcounter, luckyDipMultiTierFlag} = this.props;
    this.setState({disabled: true});
    this.setState({openBoxParam: codeToken});
    showSpinner();
    if (luckyDipMultiTierFlag) {
      const generatetokenId = codeToken === 'platinum' ?  result(tokenId, 'tokenIdPlatinum', '0') : codeToken === 'gold' ? result(tokenId, 'tokenIdGold', '0') : result(tokenId, 'tokenIdSilver', '0'); 
      getSpinRewardsNew({tokenId: generatetokenId}, dispatch).
        then((res) => {
          this.setState({disabled: false});
          const isCashback = result(res, 'data.rewards.rewardProperties.kode', '') === 'REG10';
          const type = isCashback ? '4' : result(res, 'data.rewards.rewardProperties.type', '');
          const urlImage = result(res, 'data.rewards.rewardProperties.URLImage', '');
          const displayName = result(res, 'data.rewards.rewardProperties.displayName', '');
          const currentTokenLeft = String(result(res, 'data.remainingTicket', '0'));
          const reward = result(res, 'data.rewards.rewardProperties', {});
          const transRefNum = result(res, 'data.transRefNum', '');
          // save new 3 tier tiket way
          const selectionNewRemaining = getLatestLuckyDipInfo(luckyDipAllcounter, codeToken, currentTokenLeft);
          const currentToken = String(Number(result(selectionNewRemaining, 'currentTokenPlatinum', 0)) + Number(result(selectionNewRemaining, 'currentTokenGold', 0)) + Number(result(selectionNewRemaining, 'currentTokenSilver', 0)));
          // for cache memory + reducer
          const payloadCacheTicket = getLatestLuckyDipCurrentTicket(luckyDipCache, currentToken);
          set(storageKeys['LUCKY_DIP_TICKET'], payloadCacheTicket);
          dispatch(actionCreators.getSaveLuckyDipBox(payloadCacheTicket));
          dispatch(actionCreators.saveCounterLuckydip({...selectionNewRemaining, currentToken}));
          dispatch(destroy('LuckyDipInformation'));
          this.setState({initialStateOne: true});
          this.setState({typePrize: type});
          Animated.parallel([
            Animated.timing(this.state.fadeValue, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            }),
            Animated.timing(this.state.fadeValueTwo, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true
            })
          ]).start();
          setTimeout(() => {
            this.phoneRegistered(dispatch, urlImage, displayName, currentToken, type, reward, transRefNum);
          }, 1000);
          hideSpinner();  
        }).
        catch(() => {
          Toast.show(language.COMMON__CANNOT_LOAD);
          this.setState({disabled: false});
          hideSpinner();  
        });
    } else {
      getSpinRewards({tokenId}, dispatch).
        then((res) => {
          this.setState({disabled: false});
          const isCashback = result(res, 'data.rewards.rewardProperties.kode', '') === 'REG10';
          const type = isCashback ? '4' : result(res, 'data.rewards.rewardProperties.type', '');
          const urlImage = result(res, 'data.rewards.rewardProperties.URLImage', '');
          const displayName = result(res, 'data.rewards.rewardProperties.displayName', '');
          const currentToken = String(result(res, 'data.remainingTicket', '0'));
          const reward = result(res, 'data.rewards.rewardProperties', {});
          const transRefNum = result(res, 'data.transRefNum', '');
          // for cache memory + reducer
          const payloadCacheTicket = getLatestLuckyDipCurrentTicket(luckyDipCache, currentToken);
          set(storageKeys['LUCKY_DIP_TICKET'], payloadCacheTicket);
          dispatch(actionCreators.getSaveLuckyDipBox(payloadCacheTicket));
          dispatch(actionCreators.saveCounterLuckydip({currentToken, tokenId}));
          dispatch(destroy('LuckyDipInformation'));
          this.setState({initialStateOne: true});
          this.setState({typePrize: type});
          Animated.parallel([
            Animated.timing(this.state.fadeValue, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true
            }),
            Animated.timing(this.state.fadeValueTwo, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true
            })
          ]).start();
          setTimeout(() => {
            this.phoneRegistered(dispatch, urlImage, displayName, currentToken, type, reward, transRefNum);
          }, 1000);
          hideSpinner();  
        }).
        catch(() => {
          Toast.show(language.COMMON__CANNOT_LOAD);
          this.setState({disabled: false});
          hideSpinner();  
        });
    }
  }

  phoneRegistered =(dispatch, urlImage, displayName, currentToken, type, reward, transRefNum) => {
    const {goToFillInformation} = this.props;
    const hideAlert = () => {
      dispatch(actionCreators.hideSpinner());
      dispatch(actionCreators.hideSinarmasAlert());
      this.setState({initialStateOne: false});
    };
    const goToFillInformationButton = () => {
      goToFillInformation(reward, transRefNum);
      this.setState({initialStateOne: false});
      dispatch(actionCreators.hideSinarmasAlert());
    };

    const sinarmasModalOptions = {
      text: language.LUCKY__DIP_GET_TITLE,
      onClose: hideAlert,
      button1: type === '1' ? language.LUCKY__DIP_CLAIM_NOW : language.LUCKY__DIP_PLAY_AGAIN + '(' + currentToken + ')',
      onButton1Press: type === '1' ? goToFillInformationButton : hideAlert,
      transparentBack: true,
      uriImage: urlImage,
      typeLuckyDip: type,
      textLuckyDip: displayName
    };
    dispatch(actionCreators.showSinarmasAlert({...sinarmasModalOptions, image: 'LUCKYDIP'}));
  }
  _reStart = () => () => {
    this.setState({initialStateOne: false});
  }
    
  render () {
    let {fadeValue} = this.state;
    const {luckyDipCounter, emptyBoxModal, luckyDipAllcounter, luckyDipMultiTierFlag} = this.props;
    const determineTier = Number(result(luckyDipAllcounter, 'currentTokenPlatinum')) > 0 ? 'platinum' : Number(result(luckyDipAllcounter, 'currentTokenGold')) > 0 ? 'gold' : Number(result(luckyDipAllcounter, 'currentTokenSilver')) > 0 ? 'silver' : '0';
    const luckyDipCounterText = luckyDipCounter === '0' || luckyDipCounter === '' || luckyDipCounter === undefined ? '0' : luckyDipCounter; 
    const ticketText = luckyDipCounter === '1' || luckyDipCounter === '0' ? language.LUCKY__DIP_TICKET : language.LUCKY__DIP_TICKET_MANY;
    const CloseBox = determineTier === 'platinum' ? PlatinumCloseBox : determineTier === 'gold' ? GoldCloseBox : determineTier === 'silver' ? SilverCloseBox : SilverCloseBox;
    const LuckyDipGrandPrize = this.state.openBoxParam === 'platinum' ? PlatinumBoxPrize : this.state.openBoxParam === 'gold' ? GoldBoxPrize : this.state.openBoxParam === 'silver' ? SilverBoxPrize : SilverBoxPrize;
    const LuckydipEvoucher = this.state.openBoxParam === 'platinum' ? PlatinumBoxAlfa : this.state.openBoxParam === 'gold' ? GoldBoxAlfa : this.state.openBoxParam === 'silver' ? SilverBoxAlfa : SilverBoxAlfa;
    const LuckyDipSimasPoin = this.state.openBoxParam === 'platinum' ? PlatinumBoxPoin : this.state.openBoxParam === 'gold' ? GoldBoxPoin : this.state.openBoxParam === 'silver' ? SilverBoxPoin : SilverBoxPoin;
    const LuckyDipCashBack = this.state.openBoxParam === 'platinum' ? PlatinumBoxCashback : this.state.openBoxParam === 'gold' ? GoldBoxCashback : this.state.openBoxParam === 'silver' ? SilverBoxCashback : SilverBoxCashback;
    // determine between hhh phase 1 and 2
    const determineCloseBox = luckyDipMultiTierFlag ? CloseBox : CloseBoxOri;
    const determineGrandPrize = luckyDipMultiTierFlag ? LuckyDipGrandPrize : LuckyDipGrandPrizeOri;
    const determineEvoucher = luckyDipMultiTierFlag ? LuckydipEvoucher : LuckydipEvoucherOri;
    const determineSimaspoin = luckyDipMultiTierFlag ? LuckyDipSimasPoin : LuckyDipSimasPoinOri;
    const determineCashack = luckyDipMultiTierFlag ? LuckyDipCashBack : LuckyDipCashBackOri;
    return (
      <ScrollView style={styles.containerLuckydipScroll} contentContainerStyle={styles.containerPropsLuckydipScroll}>
        <ImageBackground style={styles.containerImageBackground} source={BackGroundPic}> 
          <View>
            {this.state.initialStateOne ? 
              null : 
              <View style={styles.upperText}>
                <Text style={styles.textTitle}>{language.LUCKY__DIP_HAVE_TITLE1}<Text style={styles.ticketText}>{luckyDipCounterText} {ticketText}</Text><Text> {language.LUCKY__DIP_HAVE_TITLE2}</Text></Text>
              </View>
        
            }
          </View>
          <View style={styles.centerAlign}>
            {this.state.initialStateOne ?
              <View>
                { this.state.typePrize === '1' ?
                  <Animated.Image
                    style={luckyDipMultiTierFlag ? {
                      opacity: fadeValue,
                      ...styles.luckyDipBoxAnimation
                    } : 
                      {
                        opacity: fadeValue,
                        ...styles.luckyDipBoxAnimationOri
                      }}
                    source={determineGrandPrize}
                  />
                  : this.state.typePrize === '2' ? 
                    <Animated.Image
                      style={luckyDipMultiTierFlag ? {
                        opacity: fadeValue,
                        ...styles.luckyDipBoxAnimation
                      } : 
                        {
                          opacity: fadeValue,
                          ...styles.luckyDipBoxAnimationOri
                        }}
                      source={determineEvoucher}
                    /> : this.state.typePrize === '3' ? 
                      <Animated.Image
                        style={luckyDipMultiTierFlag ? {
                          opacity: fadeValue,
                          ...styles.luckyDipBoxAnimation
                        } : 
                          {
                            opacity: fadeValue,
                            ...styles.luckyDipBoxAnimationOri
                          }}
                        source={determineSimaspoin}
                      /> : <Animated.Image
                        style={luckyDipMultiTierFlag ? {
                          opacity: fadeValue,
                          ...styles.luckyDipBoxAnimation
                        } : 
                          {
                            opacity: fadeValue,
                            ...styles.luckyDipBoxAnimationOri
                          }}
                        source={determineCashack}
                      />}
              </View> : 
              <View>
                { luckyDipCounter === '' || luckyDipCounter === '0' || luckyDipCounter === undefined ? 
                  <ImageBackground source={EmptyBox} style={styles.noboxImage}>
                    <View>
                      <TouchableOpacity onPress={emptyBoxModal} style={styles.startButton}>
                        <View style={styles.OuterStart}>
                          <Text style={styles.textStartButton}>{language.LUCKY__DIP_PLAY_BUTTON}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                  :
                  <ImageBackground source={determineCloseBox} style={luckyDipMultiTierFlag ? styles.boxImage : styles.boxImageOri}>
                    <View>
                      <TouchableOpacity style={styles.startButton} onPress={this._start(determineTier)} disabled={this.state.disabled}>
                        <View style={styles.OuterStart}>
                          <Text style={styles.textStartButton}>{language.LUCKY__DIP_PLAY_BUTTON}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                }
              </View>
            }
          </View>
          {!this.state.initialStateOne ?
            <Touchable onPress={openLink('https://www.banksinarmas.com/id/informasi/syarat-ketentuan-hip-hip-horai')} style={luckyDipCounter === '' || luckyDipCounter === '0' || luckyDipCounter === undefined ? styles.termConditionContainer : luckyDipMultiTierFlag ? styles.termConditionContainerExist : styles.termConditionContainer}>
              <Text>{language.LUCKY__DIP_TERM_CONDITION_READ} <Text style={styles.redUnderlineText}>{language.LUCKY__DIP_TERM_CONDITION}</Text></Text>
            </Touchable> : null}
        </ImageBackground>
      </ScrollView>
    );
  }
}
