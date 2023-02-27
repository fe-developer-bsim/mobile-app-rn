import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Dimensions, FlatList} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './ShareReferralCodeMgm.styles';
import Touchable from '../Touchable.component';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {isEmpty, result, size, filter, lowerCase} from 'lodash';
import {RadioButtonFilterDateMgm, SinarmasButton} from '../FormComponents';
import {Field} from 'redux-form';
import {listViewComparator} from '../../utils/transformer.util';
import others from '../../assets/images/profileBG.png';
import People from '../../assets/images/People.png';
import Modal from 'react-native-modal';
import TransactionItemMgm from './TransactionItemPageMgm.component';
import {language} from '../../config/language';

export const fields = {
  FILTERMODE: 'selectedRange',
};

class MyInvitingRecord extends React.Component {
  static propTypes = {
    profilePicture: PropTypes.object,
    profile: PropTypes.object,
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    radioOptions: PropTypes.array,
    formFilterValue: PropTypes.object,
    continueToCalendarPage: PropTypes.func,
    filterDate: PropTypes.string,
    filterStarDate: PropTypes.string,
    filterEndDate: PropTypes.string,
    transactions: PropTypes.array,
    goToDetailTransaction: PropTypes.func,
    getFilterDate: PropTypes.func,
  }

  state = {
    isModalVisible: false,
    isSeeMore: false,
  }

  comparator = listViewComparator

  openModal = () => {
    this.setState({isModalVisible: true});
  }

  closeModal = () => {
    this.setState({isModalVisible: false});
  }

  openHistory = () => {
    const {isSeeMore} = this.state;
    if (isSeeMore) {
      this.setState({isSeeMore: false});
    } else {
      this.setState({isSeeMore: true});
    }
  }

  goToPageCalendar = () => (formFilterValue) => {
    const {dispatch} = this.props;
    const getFilterValue = result(formFilterValue, 'value', '');
    const formMyInvitingRecord = 'myInvitingRecord';
    if (getFilterValue === 'custom') {
      dispatch(NavigationActions.navigate({routeName: 'FilterCalendarPicker', params: {formMyInvitingRecord}}));
      this.closeModal();
    }
  }

  goTomyReferralList = () => {
    const {dispatch, getFilterDate} = this.props;
    dispatch(getFilterDate);
    this.closeModal();
  }

  renderListItemDetailTransaction = () => {
    const {goToDetailTransaction = {}} = this.props;
    return goToDetailTransaction ? goToDetailTransaction : {};
  }

  renderListItem = ({item}, index) => {
    const {transactions} = this.props;
    const transactionLength = size(transactions);
    return (<TransactionItemMgm {...item} index={index}
      getDetailTransactionHistory={this.renderListItemDetailTransaction()} key={index}
      transactionLength={transactionLength}/>);
  }

  render () {
    const {profilePicture, profile, radioOptions, formFilterValue, filterDate, filterStarDate, filterEndDate,
      transactions} = this.props;
    const genderDiv = others;
    const picture = result(profilePicture, 'base64', '');
    const renderImage = `data:image/jpeg;base64,${picture}`;
    const name = result(profile, 'name', '');
    const {width} = Dimensions.get('window');
    const disableButton = isEmpty(formFilterValue);
    const filterTimeLabel = result(filterDate, 'label', '');
    const filterTimeValue = result(filterDate, 'value', '');
    const filterTimeSubLabel = result(filterDate, 'sublabel', '');
    const transactionSuccess = filter(transactions, (item) => lowerCase(item.status) === 'success');
    const transactionLength = size(transactionSuccess);
    let arrayTwo = [];
    if (!isEmpty(transactions)) {
      arrayTwo = transactions.slice(0, 2);
    }
    
  
    return (
      <ScrollView style={styles.flex}>
        <View style={styles.backgroundColorProfile}/>
        <View style={styles.containerBanner}>
          <View style={[styles.contentProfile, styles.row]}>
            <View style={styles.wrapProfile}>
              <View style={styles.shadowImage}>
                <Image source={picture === null || picture === '' ? genderDiv : {uri: renderImage}} style={styles.picture}/>
              </View>
            </View>
            <Touchable style={styles.wrapContentProfile}>
              <Text style={styles.textFilterName}>{name}</Text>
              <View style={styles.rowInviting}>
                <Touchable>
                  <View style={styles.invitingSucess}>
                    <Image source={People} style={styles.people} />
                    <Text style={styles.textRewardYou}>{language.MGM__INVITING_SUCCESS}</Text>
                  </View>
                </Touchable>
                <Touchable>
                  <View style={styles.invitingFriends}>
                    <Text style={styles.textRewardLengthYouFriend}>{transactionLength}</Text>
                    <Text style={styles.textRewardYouFriend}>{language.MGM__INVITING_PRODUCTS}</Text>
                  </View>
                </Touchable>
              </View>
            </Touchable>
          </View>
        </View>

        <View style={styles.containerBannerFilter}>
          <Text style={styles.textFilterDate}>{language.MGM__INVITING_SET_FILTER_DATE}</Text>
          <View style={styles.containerLeft}>
            <Touchable style={[styles.swiftCodeField1, styles.rowCenter]} onPress={this.openModal}>
              <View style={styles.rowCenter}>
                <View>
                  <Text style={styles.timeLabel}>{filterTimeLabel}</Text>
                  <Text style={styles.timeSubLabel}>{filterTimeValue === 'custom' ? filterStarDate + ' - ' + filterEndDate : filterTimeSubLabel}</Text>
                </View>
              </View>
              <View style={styles.rowCenter}>
                <SimasIcon style={styles.couponOutline} name='arrow' size={10}/>
              </View>
            </Touchable>
            <Modal
              animationType='slide'
              swipeDirection='down'
              backdropColor='black'
              isVisible={this.state.isModalVisible}
              style={{backgroundColor: 'white', marginTop: Dimensions.get('window').height / 7, justifyContent: 'flex-end', margin: 0, paddingHorizontal: 0, width: width, borderTopRightRadius: 20, borderTopLeftRadius: 20}}>
              <View style={{flexGrow: 1, height: Dimensions.get('window').height / 2, paddingHorizontal: 30, marginTop: 30}}>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Touchable onPress={this.closeModal} style={{height: 30}}>
                      <SimasIcon name='fail' size={20} style={{marginRight: 10}}/>
                    </Touchable>
                    <Text style={styles.chooseFilter}>{language.MGM__CHOOSE_FILTER_TIME}</Text>
                  </View>
                  <View style={{marginTop: 20}}>
                    <Field name={fields.FILTERMODE}
                      component={RadioButtonFilterDateMgm}
                      options={radioOptions}
                      onChange={this.goToPageCalendar(formFilterValue)}
                    />
                  </View>
                </View>
                <View style={{justifyContent: 'flex-end', marginBottom: 20}}>
                  <SinarmasButton onPress={this.goTomyReferralList} disabled={disableButton}>
                    <Text style={{color: 'white'}}>{language.MGM__CHOOSE_SET_FILTER}</Text>
                  </SinarmasButton>
                </View>
              </View>
            </Modal>
          </View>
        </View>
              
        <View style={styles.valueReferralList}>
          <Text style={styles.textLastReward}>{language.MGM__INVITING__MY_REFERRAL_LIST}</Text>
          {isEmpty(arrayTwo) ?
            <Text style={styles.textEmptyInviting}>No Content</Text> :
            <FlatList enableEmptySections
              data={this.state.isSeeMore ? transactions : arrayTwo}
              renderItem={this.renderListItem}
            />
          }
          {isEmpty(arrayTwo) ? null : this.state.isSeeMore ?
            <Text onPress={this.openHistory} style={styles.textSeeMore}>{language.MGM__HISTORY_LIST_HIDE}</Text>
            : 
            <Text onPress={this.openHistory} style={styles.textSeeMore}>{language.MGM__HISTORY_LIST_SEE_MORE}</Text>
          }
        </View>
      </ScrollView>
    );
  }
}

export default (MyInvitingRecord);