import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, ActivityIndicator, Platform} from 'react-native';
import styles from './TabSimasPoin.styles';
import {language} from '../../config/language';
import Touchable from '../Touchable.component';
import Image from 'react-native-image-progress';
import Bar from 'react-native-progress/Bar';
import chunk from 'lodash/chunk';
import noop from 'lodash/noop';
import result from 'lodash/result';
import Poin from '../../assets/images/simaspoins.png';
import {currencyFormatter} from '../../utils/transformer.util';
import {listViewComparator, getBrandEgift} from '../../utils/transformer.util';
import isEmpty from 'lodash/isEmpty';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class Merchant extends React.Component {
  static propTypes = {
    egiftList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    goToDetail: PropTypes.func,
    getEgiftPage: PropTypes.func,
    getShoppingList: PropTypes.func,
    egiftListByConstructList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    egiftListPage: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    category: PropTypes.object,
    maximumNumberOfEachPage: PropTypes.string,
  }

  state = {
    pagination: 1,
    loading: false,
  }

  comparator = listViewComparator

  renderBrand = (object = []) => {
    const brandList = result(object, 'item.listByType');
    const itemChunk = chunk(brandList, 2);
    const brandType = result(object, 'item.brandType');
    return (
      <View style={styles.brandPadding}>
        <View style={styles.brandContainer}><Text style={styles.brand}>{brandType}</Text></View>
        {itemChunk.map(this.renderItems)}
      </View>
    );
  }

  renderItems = (items) => {
    const {goToDetail = noop} = this.props;
    return (
      <View style={styles.itemsContainer}>
        <Touchable onPress={goToDetail(items[0])} style={styles.item}>
          <View style={styles.imageContainer}>
            <Image source={{uri: items[0].image}} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: styles.red,
              size: 50,
              thickness: 2
            }} style={styles.imageSize} resizeMode='cover'/>
          </View>
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemName}>{items[0].itemName}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{currencyFormatter(items[0].value)} </Text>
            <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImage}/></View>
          </View>
        </Touchable>
        {
          items.length > 1 ?
            <Touchable onPress={goToDetail(items[1])} style={styles.item}>
              <View style={styles.imageContainer}>
                <Image source={{uri: items[1].image}} renderError={loadError} indicator={Bar} indicatorProps={{
                  showsText: true,
                  color: styles.red,
                  size: 50,
                  thickness: 2
                }} style={styles.imageSize} resizeMode='cover'/>
              </View>
              <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{items[1].itemName}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{currencyFormatter(items[1].value)} </Text>
                <View style={styles.poinContainer}><Image source={Poin} style={styles.poinImage}/></View>
              </View>
            </Touchable>
            :
            <View style={styles.item}/>
        }
      </View>
    );
  }


  getList = () => {
    const {egiftList, getEgiftPage, category, maximumNumberOfEachPage} = this.props;
    const pageList = Number(this.state.pagination) + 1;
    const ItemList = result(egiftList, 'egiftListByConstructList', []);
    const quantity = ItemList.length;
    if (quantity >= maximumNumberOfEachPage) {
      getEgiftPage(pageList, category);
      this.setState({pagination: pageList});
    }
  }

  renderFooter = () => {
    const {egiftList = {}} = this.props;
    const loading = result(egiftList, 'loading', false);
    return (
      <View>
        { loading ?
          <View style={styles.renderFooter}>
            <ActivityIndicator size='large' color={styles.red}/>
          </View>
          : null }
      </View>
    );
  };

  renderSeparator = () => (
    <View style={styles.Seperator}/>
  );

  render () {
    const {egiftList = {}, category} = this.props;
    const ItemList = result(egiftList, 'egiftListByConstructList', []);
    const filteredBrand = getBrandEgift(ItemList);
    
    const loading = result(egiftList, 'loading', false);
    const reload = result(egiftList, 'reload', false) || isEmpty(egiftList);
    return (
      <View style={styles.container}>
        { loading ?
          <View style={styles.errorContainer}>
            <ActivityIndicator size='large' color={styles.red}/>
          </View>
          : reload ?
            <View style={styles.nullContainer}>
              <Text style={styles.nulleVoucher}>{language.TAB_TITLE_LANDING__EVOUCHER} {category === '01' ? language.EGIFT__EVOUCHER_NAME_HNB : category === '02' ? language.EGIFT__EVOUCHER_NAME_FNG : category === '03' ? language.EGIFT__EVOUCHER_NAME_FNB : category === '04' ? language.EGIFT__EVOUCHER_NAME_SHOPPING : category === '05' ? language.EGIFT__EVOUCHER_NAME_TRANSPORTATION : language.EGIFT__EVOUCHER_NAME_MORE} </Text>
              <Text style={styles.nulleVoucher}>{language.TAB_TITLE_LANDING__EVOUCHER_NOT_AVAILABLE}</Text>
            </View>
            :
            <FlatList enableEmptySections
              data={filteredBrand}
              renderItem={this.renderBrand}
              onEndReached={this.getList}
              onEndReachedThreshold={0.01}
              ListFooterComponent={this.renderFooter}
              ItemSeparatorComponent={
                (Platform.OS === 'android' || Platform.OS === 'ios') &&
                (({highlighted}) => (
                  <View
                    style={[
                      styles.container,
                      highlighted && {marginLeft: 0}
                    ]}
                  />
                ))
              }
            />
        }
      </View>
    );
  }
}

export default Merchant;
