import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TextInput} from 'react-native';
import styles from './TabNearby.component.styles';
import {language} from '../../config/language';
import {listViewComparator} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import Bar from 'react-native-progress/Bar';
import Image from 'react-native-image-progress';
import searchIcon from '../../assets/images/search.png';
import {result, isEmpty} from 'lodash';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class MerchantDeals extends React.Component {
  static propTypes = {
    discountMerchant: PropTypes.array,
    getMerchantDiscount: PropTypes.func,
    isLoadingQRListNearby: PropTypes.bool,
    getMerchantListByTitle: PropTypes.func,
    goToDiscountMerchantDetail: PropTypes.func,
  }

  getList = () => {
    const {getMerchantDiscount, discountMerchant, isLoadingQRListNearby} = this.props;
    const page = (discountMerchant.length / 20) + 1;
    const title = this.state.title;
    if (discountMerchant.length !== 0 && discountMerchant.length % 20 === 0 && !isLoadingQRListNearby) {
      getMerchantDiscount({page, title});
    }
  }

  searchBytitle = () => {
    const {getMerchantListByTitle} = this.props;
    const title = this.state.title;
    getMerchantListByTitle({page: 1, title});
  }

  state = {
    title: ''
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({loading: false});
    }, 5000);
  }

  onChangeInput = (val) => {
    this.setState({title: val});
  };

  comparator = listViewComparator

  renderMerchant = ({item}) => {
    const {goToDiscountMerchantDetail} = this.props;
    return (
      <Touchable onPress={goToDiscountMerchantDetail(item)} style={styles.offerContainer}>
        <View>
          <Image source={{uri: item.visual.value}} renderError={loadError} indicator={Bar} indicatorProps={{
            showsText: true,
            color: styles.red,
            size: 50,
            thickness: 2
          }} style={styles.offerImage} resizeMode='cover'/>
        </View>
        <View style={styles.offerDetails}>
          <Text style={styles.textstyle}>{item.nama}</Text>
          {item.disc === '' ? 
            <Text style={styles.textstyleBold}>{language.QR_DISCOUNT__GET_PROMO}</Text>
            :
            <Text style={styles.textstyleBold}>{language.QR_DISCOUNT__GET}{item.disc}{language.QR_DISCOUNT__PERCENT_DISCOUNT}</Text>
          }
        </View>
      </Touchable>
    );
  }

  render () {
    const {discountMerchant = {}} = this.props;
    
    const noData = result(discountMerchant[0], 'errmsg', '').length;
    return (
      <View style={styles.listViewContainer}>
        <View style={styles.searchBox}>
          <View style={styles.searchBoxInput}>
            <View style={styles.searchTxtInput}>
              <TextInput
                style={styles.searchInput}
                underlineColorAndroid={'transparent'}
                label={language.QR_DISCOUNT__SEARCH2}
                placeholder={language.QR_DISCOUNT__SEARCH_HINTTEXT2}
                onChangeText={this.onChangeInput}
                placeholderTextColor='#848484'
              />
            </View>
          </View>
          <Touchable style={styles.searchBoxIcon} onPress={this.searchBytitle}>
            <Image style={styles.searchIcon} source={searchIcon}/>
          </Touchable>
        </View>

        {noData < 1 && !isEmpty(discountMerchant) ?
          <View>
            <FlatList
              data={discountMerchant}
              renderItem={this.renderMerchant}
              onEndReached={this.getList}
              onEndReachedThreshold={0.01}/>
          </View>
          :
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{language.QR_DISCOUNT__ERROR_MESSAGE}</Text>
          </View>
        }
      </View>
    );
  }
}

export default MerchantDeals;