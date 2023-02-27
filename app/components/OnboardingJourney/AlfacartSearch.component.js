import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, Image, TextInput} from 'react-native';
import styles from './AlfacartSearch.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {ScrollView} from 'react-native-gesture-handler';
import {result, chunk, noop, size, ceil} from 'lodash';
import {SinarmasButton} from '../../components/FormComponents';
import {getBrandEgift, currencyFormatter} from '../../utils/transformer.util';
import Bar from 'react-native-progress/Bar';
import Overlay from '../Overlay/OverlayRadius.component';



const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class AlfacartDashboard extends React.Component {
  static propTypes = {
    detailProduct: PropTypes.func,
    nav: PropTypes.object,
    navigateTo: PropTypes.func,
    categoryData: PropTypes.array,
    listAllProductData: PropTypes.array,
    saleproductAlfacart: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    dataCategory: PropTypes.string,
    seeAllCategory: PropTypes.func,
    selectNoPolis: PropTypes.func,
    inquiryData: PropTypes.object,
    changeData: PropTypes.func,
    infoPolis: PropTypes.object,
    summaryPolis: PropTypes.object,
    goToEmFund: PropTypes.func,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    goToAlfacart: PropTypes.func,
    listProduct: PropTypes.func,
    detailCategory: PropTypes.func,
    dispatch: PropTypes.func,
    addToCart: PropTypes.func,
    buyNowDashboard: PropTypes.func,
    listAllProduct: PropTypes.func,
    maximumNumberOfEachPage: PropTypes.string,
    visible: PropTypes.object,
    tickOverlay: PropTypes.object,
    tickOnclose: PropTypes.object,
    addToWishlist: PropTypes.func,
    allCart: PropTypes.array,
    goToCartAlfacart: PropTypes.func,
    wishlistDetailAlfacart: PropTypes.func,
    categoryDashboard: PropTypes.func,
    goToSearchAlfacart: PropTypes.func,
    paginationAlfaDashboard: PropTypes.object,
    goToPage: PropTypes.func,
    searchDashboard: PropTypes.func
  }

  state = {
    catagory: '',
    disabled: false,
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed1: true,
    keyword: ''
  }

  tick = () => {
    const {nav} = this.props;
    if (nav.routes[0].routes[0].key === 'Init') {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
      this.setState({disabled: true});
      if (this.state.secondsRemaining <= 0) {
        this.setState({disabled: false});
      } else {
        this.setState({disabled: true});
      }
    }
  }

  componentDidMount = () => {
    this.setState({disabled: false});
  }

  componentWillUnmount = () => {
    BackgroundTimer.clearInterval(this.interval);
  }

  renderSale = (type = []) => {
    const brandList = result(type, 'item.listByType', []);
    const itemChunk = chunk(brandList, 1);
    return (
      <View>
        <View><Text style={styles.brand}>{type.brandType}</Text></View>
        {itemChunk.map(this.renderSaleProduct)}
      </View>
    );
  }

  renderSaleProduct = (items) => {
    const {detailProduct = noop, tickOverlay} = this.props;
    return (
      <View style={styles.itemsContainer}>
        <Touchable onPress={detailProduct(items[0])} style={styles.item}>
          <View styles={styles.container}>
            <Touchable onPress={''}>
              <SimasIcon name={'love-fill'} size={20} style={styles.burger}/>
            </Touchable>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: items[0].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: styles.red,
              size: 50,
              thickness: 2
            }} style={styles.imageSize} resizeMode='cover'/>
          </View>
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemName}>{items[0].productName}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Rp. {currencyFormatter(items[0].price)} </Text>
            <Text style={styles.itemName}>Rp. {currencyFormatter(items[0].grossPrice)} </Text>
          </View>
          <View style={styles.buttonLogin}>
            <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </SinarmasButton>
          </View>
        </Touchable>

      </View>

    );
  }

  renderBrand = (type = []) => {
    const brandList = result(type, 'item.listByType', []);
    const itemChunk = chunk(brandList, 2);
    return (
      <View>
        <View><Text style={styles.brand}>{type.brandType}</Text></View>
        {itemChunk.map(this.renderItems)}
      </View>
    );
  }

  addToWishlistFunc = (items) => {
    const {addToWishlist} = this.props;
    addToWishlist(items);
  }

  renderItems = (items) => {
    const {detailProduct = noop, tickOverlay} = this.props;
    const grossPrice0 = result(items, '0.grossPrice', '');
    const grossPrice1 = result(items, '1.grossPrice', '');

    return (
      <View style={styles.itemsContainer}>
        <Touchable onPress={detailProduct(items[0])} style={styles.item}>
          <View styles={styles.container}>
            <Touchable onPress={''}>
              <SimasIcon name={'love-fill'} size={20} style={styles.burger}/>
            </Touchable>
          </View>
          <View style={styles.imageContainer}>
            <Touchable onPress={detailProduct(items[0])}>
              <Image source={{uri: items[0].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                showsText: true,
                color: styles.red,
                size: 50,
                thickness: 2
              }} style={styles.imageSize} resizeMode='cover'/>
            </Touchable>
          </View>
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemName}>{items[0].productName}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>Rp. {currencyFormatter(items[0].price)} </Text>
            {
              grossPrice0 === '' ?
                <Text style={styles.price}>{''}</Text>
                :
                <Text style={styles.grossPrice}>Rp. {currencyFormatter(items[0].grossPrice)} </Text>
            }
          </View>
          <View style={styles.buttonLogin}>
            <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[0].productId)}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </SinarmasButton>
          </View>
        </Touchable>
        {
          result(items, 'length', 0) > 1 ?
            <Touchable onPress={detailProduct(items[1])} style={styles.item}>
              <View styles={styles.container}>
                <Touchable onPress={''}>
                  <SimasIcon name={'love-fill'} size={20} style={styles.burger}/>
                </Touchable>
              </View>
              <View style={styles.imageContainer}>
                <Touchable onPress={detailProduct(items[1])}>
                  <Image source={{uri: items[1].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                    showsText: true,
                    color: styles.red,
                    size: 50,
                    thickness: 2
                  }} style={styles.imageSize} resizeMode='cover'/>
                </Touchable>
              </View>
              <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{items[1].productName}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>Rp. {currencyFormatter(result(items[1], 'price', ''))} </Text>
                {
                  grossPrice1 === '' ?
                    <Text style={styles.price}>{''}</Text>
                    :
                    <Text style={styles.grossPrice}>Rp. {currencyFormatter(result(items[1], 'grossPrice', ''))} </Text>
                }
              </View>
              <View style={styles.buttonLogin}>
                <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[1].productId)}>
                  <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                </SinarmasButton>
              </View>
            </Touchable>
            :
            <View/>
        }
      </View>

    );
  }

  onChangeInput=(keyword) => {
    this.setState({keyword});
  }
  onSearch=() => {
    this.props.searchDashboard(this.state.keyword);
  }

  render = () => {
    const {listProduct, goToPage, paginationAlfaDashboard, addQuantity, visible, tickOnclose, quantity, minusQuantity, addToCart, buyNowDashboard} = this.props;
    const data = getBrandEgift(listProduct);
    const countCurrentPage = result(paginationAlfaDashboard, 'countCurrentPage', 0);
    const productInPage = result(paginationAlfaDashboard, 'productInPage', 0);
    const allTotalData = result(paginationAlfaDashboard, 'allTotalData', 0);
    const currentPage = Number(allTotalData - countCurrentPage);
    return (
      <View>
        <ScrollView>
          <Overlay closeOnTouchOutside visible={visible} onClose={tickOnclose}>
            <View>
              <Touchable onPress={tickOnclose}>
                <SimasIcon name='close-black' size={15} style={styles.closePopUp}/>
              </Touchable>
              <View style={styles.itemHeader}>
                <Text style={styles.styleMessage}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
              </View>

              <View style={styles.itemCart}>
                <View>
                  <Text>{language.ALFACART_DASHBOARD_QUANTITY}</Text>
                </View>
                <View style={styles.qtyContainer}>
                  <View style={styles.amountContainer}>
                    <View style={styles.borderedContainer}>
                      <Touchable disabled={quantity < 2} onPress={minusQuantity}>
                        <View style={styles.plusminBorder}>
                          <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                        </View>
                      </Touchable>
                      <View style={styles.centerQty}>
                        <Text>{quantity}</Text>
                      </View>
                      <Touchable onPress={addQuantity}>
                        <View style={styles.plusminBorder}>
                          <Text style={styles.largeText}>+</Text>
                        </View>
                      </Touchable>
                    </View>
                  </View>
                </View>
                <View style={styles.greyLine2} />
              </View>
              <View style={styles.buttonContainer}>
                <Touchable buttonType='secondary' onPress={buyNowDashboard} style={styles.buttonLeftInner}>
                  <Text style={styles.textBuy}>{language.ALFACART_DASHBOARD_SHEET_BUY_NOW}</Text>
                </Touchable>
                <Touchable onPress={addToCart} style={styles.buttonRightInner}>
                  <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
                </Touchable>
              </View>
            </View>
          </Overlay>
          <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
            <View style={styles.container2}>
              <View style={styles.containerScrollView}>
                <View style={styles.containerRowServiceBillpay} >
                  <Text style={styles.styleMessage}>{language.ALFACART_SERACH__PRODUCT}</Text>
                </View>
              </View>
              <View style={styles.rowSearch}>
                <View style={styles.filterBox}>
                  <TextInput underlineColorAndroid='transparent'
                    onChangeText={this.onChangeInput}
                    maxLength={20}
                    placeholder={language.ALFACART_SEARCH}
                    style={styles.filterTextInput}/>
                </View>

                <View style={styles.buttonLogin2}>
                  <Touchable style={styles.buttonSearch} onPress={this.onSearch}>
                    <Text style={styles.searchTextInput}>{language.QR_DISCOUNT__SEARCH2}</Text>
                  </Touchable>
                </View>
              </View>
              {size(listProduct) > 0 ?
                <View>
                  <ScrollView>
                    <View style={styles.containerProduct}>
                      <FlatList  data={data} renderItem={this.renderBrand}/>
                    </View>
                  </ScrollView>

                  <View style={styles.rowPagination}>
                    {countCurrentPage !== 0 ?
                      <Touchable onPress={goToPage(-productInPage)}>
                        <SimasIcon name='arrow' size={15} style={styles.leftPagination}/>
                      </Touchable> : <View/>}
                    <View>
                      <Text>
                        {countCurrentPage === 0 ? 1 : ceil(countCurrentPage / productInPage + 1)}
                      </Text>
                    </View>
                    {currentPage < productInPage || currentPage === productInPage ?
                      <View/> :
                      <Touchable onPress={goToPage(productInPage)}>
                        <SimasIcon name='arrow' size={15} style={styles.rightPagination}/>
                      </Touchable>}
                  </View>
                </View>
                : null}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AlfacartDashboard;
