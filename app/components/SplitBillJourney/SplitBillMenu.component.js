import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from '../../components/SplitBillJourney/SplitBillMenu.component.styles';
import result from 'lodash/result';
import noop from 'lodash/noop';
import {language} from '../../config/language';
import {ScrollableTabBar} from '@valdio/react-native-scrollable-tabview';
import TabYouBill from '../../components/SplitBillJourney/tabYouBill.component';
import TabYouOwe from '../../components/SplitBillJourney/tabYouOwe.component';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import {SinarmasButton} from '../../components/FormComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NoSplitBill from '../../assets/images/no_split_bill.png';

class SplitBillMenu extends React.Component {
  static propTypes = {
    splitBill: PropTypes.array.isRequired,
    offerID: PropTypes.string,
    onSplitBillClick: PropTypes.func,
    clickedSplitBill: PropTypes.object,
    closeHandler: PropTypes.func,
    isLogin: PropTypes.bool,
    changeTab: PropTypes.func,
    qrYouBill: PropTypes.array,
    onYouBillClick: PropTypes.func,
    youOweList: PropTypes.array,
    goToMaps: PropTypes.func,
    getYouOweList: PropTypes.func,
    createSplitBill: PropTypes.func,
    onChangeTab: PropTypes.func,
    setCarouselReferenceFor: PropTypes.func,
    activeTab: PropTypes.string,
    getListSender: PropTypes.object,
    detailSplitBillMenu: PropTypes.func,
    detailSplitBillMenuOwe: PropTypes.func,
    getListReceiver: PropTypes.object,
    userMobileNumber: PropTypes.string,
    deleteYouBill: PropTypes.func,
    goRejectYouOwe: PropTypes.func,
    ownNumber: PropTypes.string,
    validateStatus: PropTypes.bool,
    isNotCreateSplitBill: PropTypes.func,
    dataUser: PropTypes.object,
    goDeleteYouBill: PropTypes.func,
    currentLanguage: PropTypes.object,
    scanPressed: PropTypes.func,
    codePressed: PropTypes.func,
    onScan: PropTypes.bool,
    onCode: PropTypes.bool,
    isEmptySplitBill: PropTypes.bool,
  }
  static defaultProps = {
    splitBill: [],
    onSplitBillClick: noop
  }

  state = {

  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar style={{borderWidth: 0}}/>)

  render () {
    const splitBill = result(this.props, 'splitBill', []);
    const {clickedSplitBill = {}, closeHandler = noop, isLogin, qrYouBill = [], onSplitBillClick = noop, 
      onYouBillClick = noop, youOweList = [], goToMaps = noop, setCarouselReferenceFor = noop, isEmptySplitBill,
      activeTab = '', getListSender = {}, detailSplitBillMenu, detailSplitBillMenuOwe, getListReceiver = {}, userMobileNumber, deleteYouBill, createSplitBill, goRejectYouOwe, ownNumber, validateStatus, isNotCreateSplitBill, dataUser = {}, goDeleteYouBill, currentLanguage, codePressed, scanPressed, onScan, onCode} = this.props;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContentRevamp} style={styles.containerRevamp} extraScrollHeight={100} enableOnAndroid={true}>
        <View>
          {
            isEmptySplitBill ? 
              <View style={styles.emptyContainer}>
                <Image style={styles.iconSize} source={NoSplitBill}/>
                <Text style={styles.amountText}>{language.SPLITBILL_EMPTY_BILL_HEADER}</Text>
                <Text style={styles.emptyExplanation}>{language.SPLITBILL_EMPTY_BILL_SUBHEAD}</Text>
              </View>
              :
              <View>
                <View style={styles.buttonTopContainer}>
                  <SinarmasButton style={onScan ? styles.buttoTopBillActive : styles.buttoTopBill} onPress={scanPressed}>
                    <Text style={onScan ? styles.topButtonTextActive : styles.topButtonTex}>{language.SPLITBILL_TAB_YOUBILL}</Text>
                  </SinarmasButton>
                  <SinarmasButton style={onCode ? styles.buttoTopBillActiveMember : styles.buttoTopBillMember} onPress={codePressed}>
                    <Text style={onCode ? styles.topButtonTextActive : styles.topButtonTex}>{language.SPLITBILL_TAB_YOUOWE}</Text>
                  </SinarmasButton>
                </View>
                <View>
                  {onScan ?
                    <TabYouBill activeTab={activeTab} setCarouselReference={setCarouselReferenceFor('youBill')} splitBill={splitBill} clickedSplitBill={clickedSplitBill}
                      closeHandler={closeHandler} isLogin={isLogin} qrYouBill={qrYouBill} detailSplitBillMenu={detailSplitBillMenu} 
                      onSplitBillClick={onSplitBillClick} onYouBillClick={onYouBillClick}
                      tabLabel={language.SPLITBILL_TAB_YOUBILL} getListSender={getListSender} deleteYouBill={deleteYouBill} dataUser={dataUser} goDeleteYouBill={goDeleteYouBill} currentLanguage={currentLanguage} />
                    :
                    <TabYouOwe activeTab={activeTab} setCarouselReference={setCarouselReferenceFor('youOwe')} tabLabel={language.SPLITBILL_TAB_YOUOWE} youOweList={youOweList} goToMaps={goToMaps}
                      getListReceiver={getListReceiver} detailSplitBillMenuOwe={detailSplitBillMenuOwe} userMobileNumber={userMobileNumber} goRejectYouOwe={goRejectYouOwe} ownNumber={ownNumber} dataUser={dataUser}
                      currentLanguage={currentLanguage} getListSender={getListSender}
                    /> 
                  }
                </View>
              </View>
          }
          
        </View>
        <View style={styles.buttonContainer}>
          <SinarmasButton style={styles.buttonSpacing} onPress={validateStatus ? isNotCreateSplitBill(validateStatus) : createSplitBill}>
            <Text style={styles.nextButton}>{language.SPLITBILL__CREATE_BUTTON}</Text>
          </SinarmasButton>
        </View>  
      </KeyboardAwareScrollView>
    );
  }
}

export default SplitBillMenu;