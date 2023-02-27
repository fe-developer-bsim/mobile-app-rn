import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, TextInput} from 'react-native';
import styles from './TabNearby.component.styles';
import {result} from 'lodash';
import {language} from '../../config/language';
import {listViewComparator} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import Bar from 'react-native-progress/Bar';
import Image from 'react-native-image-progress';
import SimasIcon from '../../assets/fonts/SimasIcon';
import searchIcon from '../../assets/images/search.png';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class MerchantDeals extends React.Component {
  static propTypes = {
    qrMerchantListByCity: PropTypes.array,
    getMerchantListByCity: PropTypes.func,
    getMerchantListByTitle: PropTypes.func,
    searchMerchantDiscountByCity: PropTypes.func,
    onCityNamePress: PropTypes.func,
    isLoadingQRListAll: PropTypes.bool,
    goToDiscountMerchantDetail: PropTypes.func,
    navigation: PropTypes.object,
    city: PropTypes.object,
  }

  state = {
    city: {},
    title: '',
    visible: false,
  }

  getListByCity = () => {
    const {getMerchantListByCity} = this.props;
    const {city} = this.state;
    const data = {page: 1, cityCode: result(city, 'code', '')};
    getMerchantListByCity(data);
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({loading: false});
    }, 5000);
  }

  componentWillMount () {
    this.getListByCity();
  }

  onChangeInput = (val) => {
    this.setState({title: val});
  };

  setVisible = () => {
    const con = this.state.visible;
    this.setState({visible: !con});
  };

  getList = () => {
    const {getMerchantListByCity, qrMerchantListByCity, isLoadingQRListAll} = this.props;
    const page = (qrMerchantListByCity.length / 20) + 1;
    const {city, title} = this.state;
    const data = {page, title, cityCode: result(city, 'code', '')};
    if (qrMerchantListByCity.length !== 0 && qrMerchantListByCity.length % 20 === 0 && !isLoadingQRListAll) {
      getMerchantListByCity(data);
    }
  }

  changeCity = (selected) => {
    const {getMerchantListByCity} = this.props;
    const data = {page: 1, cityCode: result(selected, 'code', '')};
    getMerchantListByCity(data);
    this.setState({visible: false, city: selected});
  }

  searchBytitle = () => {
    const {searchMerchantDiscountByCity, city} = this.props;
    const {title} = this.state;
    searchMerchantDiscountByCity({page: 1, title, cityCode: result(city, 'code', '')});
  }

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
    const {qrMerchantListByCity = {}, city} = this.props;
    const noData = result(qrMerchantListByCity[0], 'errmsg', '').length;
    
    const cityName = (result(city, 'name', '') !== 'All') && (result(city, 'name', '') !== '') ? result(city, 'name', '') : language.QR_DISCOUNT__SEARCH;
    return (
      <View style={styles.listViewContainerAll}>
        <View style={styles.listViewContainerAllSmall}>
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
          {noData < 1 ?
            <View>
              <FlatList
                data={qrMerchantListByCity}
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
        <View style={styles.footerContainer}>
          <View style={[styles.borderedContainer]}>
            <Touchable onPress={this.props.onCityNamePress} >
              <View style={styles.filterContainer}>
                <Text style={styles.findNearby}>{cityName}</Text>
                <SimasIcon name={'find-deals'} size={25} style={styles.iconDiscount}/>
              </View>
            </Touchable>
          </View>    
        </View>
        
      </View>
    );
  }
}

export default MerchantDeals;
