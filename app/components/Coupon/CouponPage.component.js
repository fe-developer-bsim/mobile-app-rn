import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, ScrollView, Image} from 'react-native';
import OwnCoupon from './Coupon.component';
import PublicCoupon from './PublicCoupon.component';
import {listViewComparator} from '../../utils/transformer.util';
import styles from './CouponPage.styles';
import size from 'lodash/size';
import {language} from '../../config/language';
import EmptyLable from '../../assets/images/no-coupon.png';

class Transactions extends React.Component {
  static propTypes = {
    transactions: PropTypes.array,
    header: PropTypes.string,
    selectedFilters: PropTypes.string,
    filterValue: PropTypes.string,
    currency: PropTypes.string,
    goToDetailTransaction: PropTypes.func,
    isShariaAccount: PropTypes.bool,
    navigation: PropTypes.object,
    publicCoupon: PropTypes.array,
    ownCoupon: PropTypes.array,
    isAvailable: PropTypes.bool,
    goToUseCoupon: PropTypes.func,
    viewCouponDetail: PropTypes.func,
    currentLanguage: PropTypes.string
  }
  comparator = listViewComparator
  renderListItemLable = () => {
    const {isAvailable} = this.props;
    return isAvailable === true ? isAvailable : false; 
  }
  renderListItemCurrentLanguage = () => {
    const {currentLanguage} = this.props;
    return currentLanguage === true ? currentLanguage : ''; 
  }                                     
  renderUseCoupon = () => {
    const {goToUseCoupon = {}} = this.props;
    return goToUseCoupon ? goToUseCoupon : {};
  }

  renderCouponDetailTransaction = () => {
    const {viewCouponDetail = {}} = this.props;
    return viewCouponDetail ? viewCouponDetail : {};
  }

  renderListItem = ({item}) => (<OwnCoupon {...item} renderListItemLable={this.renderListItemLable()} renderUseCoupon={this.renderUseCoupon()} renderCouponDetailTransaction={this.renderCouponDetailTransaction()} renderListItemCurrentLanguage={this.renderListItemCurrentLanguage()} />)

  renderListItemPublic = ({item}) => (<PublicCoupon {...item} renderListItemLable={this.renderListItemLable()} renderUseCoupon={this.renderUseCoupon()} renderCouponDetailTransaction={this.renderCouponDetailTransaction()} renderListItemCurrentLanguage={this.renderListItemCurrentLanguage()}/>)

  render () {
    const {ownCoupon, publicCoupon} = this.props;
    
    
    const ownCouponCount = size(ownCoupon);
    const publicCouponCount = size(publicCoupon);
    return (
      <ScrollView style={styles.container}>
        {publicCouponCount !== 0 ||  ownCouponCount !== 0 ? 
          <View>
            <FlatList enableEmptySections data={publicCoupon} renderItem={this.renderListItemPublic} removeClippedSubviews={false}/>
            <FlatList enableEmptySections data={ownCoupon} renderItem={this.renderListItem} removeClippedSubviews={false}/>
            <View style={styles.padBottom}/>
          </View>
          :
          <View style={styles.alignCenterContent}>
            <Image source={EmptyLable} style={styles.emptyBackGround}/>
            <Text style={styles.textEmpty}> {language.GENERIC__EMPTY_COUPON}</Text>
          </View>
        }
      </ScrollView>
    );
  }
}

export default Transactions;
