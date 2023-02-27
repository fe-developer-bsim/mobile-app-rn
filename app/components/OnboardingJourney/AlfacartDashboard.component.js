import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './AlfacartDashboard.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {ScrollView} from 'react-native-gesture-handler';
import {result, chunk, noop, sumBy, size, filter, ceil} from 'lodash';
import {SinarmasButton} from '../../components/FormComponents';
import {getBrandEgift, currencyFormatter, getCategoryAlfacart} from '../../utils/transformer.util';
import Bar from 'react-native-progress/Bar';
import Overlay from '../Overlay/OverlayRadius.component';
import LinearGradient from 'react-native-linear-gradient';


const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class AlfacartDashboard extends React.Component {
  static propTypes = {
    detailProduct: PropTypes.func,
    nav: PropTypes.object,
    navigateTo: PropTypes.func,
    category: PropTypes.array,
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
    tickOverlayCMI: PropTypes.object,
    tickOnclose: PropTypes.object,
    addToWishlist: PropTypes.func,
    allCart: PropTypes.array,
    goToCartAlfacart: PropTypes.func,
    wishlistDetailAlfacart: PropTypes.func,
    categoryDashboard: PropTypes.func,
    goToSearchAlfacart: PropTypes.func,
    paginationAlfaDashboard: PropTypes.object,
    goToPage: PropTypes.func,
    listAllProductAlfacart: PropTypes.func,
    wishlistAlfacart: PropTypes.array,
    dropFromWishlist: PropTypes.func,
    productAlreadyAlfacart: PropTypes.func,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,
    cartCMI: PropTypes.array,

  }

  state = {
    catagory: '',
    disabled: false,
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed1: true,
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

  renderDataCategory = (type = []) => {
    const brandList = result(type, 'item.listByType', []);
    const itemChunk = chunk(brandList, 1);
    return (
      <View>
        <View>
          <Text style={styles.brand}>{type.brandType}</Text>
        </View>
        <ScrollView horizontal={true}>
          {itemChunk.map(this.renderCategory)}
        </ScrollView>
      </View>
    );
  }

  renderCategory = (data) => {
    const {categoryDashboard, currentMerchant} = this.props;
    const merchant = result(currentMerchant, 'name', '');

    return (

      <View style={styles.textBillPayStyleBL}>
        {
          merchant === 'ALFACART' ?
            <LinearGradient colors={['#FF7B7B', '#B31F1F']} style={styles.gradientColor} locations={[0.2, 1, 1]}
              start={{x: 0.0, y: -0.2}} end={{x: 1.0, y: 0.0}}>
              <Touchable onPress={categoryDashboard(data[0].categoryCode)}>
                <SimasIcon name={getCategoryAlfacart(data[0].shortname)} size={50} style={styles.iconCategory} />
                <Text style={styles.nameCategory}>{data[0].name}</Text>
              </Touchable>
            </LinearGradient>
            : null
        }
      </View>
    );
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
              <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
            </Touchable>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: items[0].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: styles.red,
              size: 50,
              thickness: 2
            }} style={styles.imageSize} resizeMode='cover' />
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
    const brandList = result(type, 'item', []);
    const itemChunk = chunk(brandList, 2);
    return (
      <View>
        <View><Text style={styles.brand}>{type.brandType}</Text></View>
        {itemChunk.map(this.renderItems)}
      </View>
    );
  }

  renderBrandCMI = (type = []) => {
    const brandList = result(type, 'item', []);
    const itemChunk = chunk(brandList, 2);
    return (
      <View>
        <View><Text style={styles.brand}>{type.brandType}</Text></View>
        {itemChunk.map(this.renderItemsCMI)}
      </View>
    );
  }

  addToWishlistFunc = (items) => {
    const {addToWishlist} = this.props;
    addToWishlist(items);
  }

  renderItems = (items) => {
    const {wishlistAlfacart, allCart, detailProduct = noop, tickOverlay, wishlistDetailAlfacart, dropFromWishlist, productAlreadyAlfacart} = this.props;
    const grossPrice0 = result(items, '0.grossPrice', '');
    const grossPrice1 = result(items, '1.grossPrice', '');

    const productCodeItem0 = result(items, '0.productCode');
    const productCodeItem1 = result(items, '1.productCode');

    const wishlistColor0 = size(filter(wishlistAlfacart, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem0 === firstCounting;
    }));
    const wishlistColor1 = size(filter(wishlistAlfacart, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem1 === firstCounting;
    }));

    const alreadyCart0 = size(filter(allCart, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem0 === firstCounting;
    }));
    const alreadyCart1 = size(filter(allCart, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem1 === firstCounting;
    }));

    return (
      <View style={styles.itemsContainer}>
        <Touchable onPress={detailProduct(items[0])} style={styles.item}>
          <View styles={styles.container}>
            {
              wishlistColor0 === 1 ?
                <Touchable onPress={dropFromWishlist(items[0])}>
                  <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                </Touchable>
                :
                <Touchable onPress={wishlistDetailAlfacart(items[0])}>
                  <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
                </Touchable>
            }
          </View>
          <View style={styles.imageContainer}>
            <Image source={{uri: items[0].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: styles.red,
              size: 50,
              thickness: 2
            }} style={styles.imageSize} resizeMode='cover' />
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
            {
              alreadyCart0 === 1 ?
                <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[0].productId)}>
                  <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                </SinarmasButton> :
                <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[0].productId)}>
                  <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                </SinarmasButton>}
          </View>
        </Touchable>
        {
          items.length > 1 ?
            <Touchable onPress={detailProduct(items[1])} style={styles.item}>
              <View styles={styles.container}>
                {
                  wishlistColor1 === 1 ?
                    <Touchable onPress={dropFromWishlist(items[1])}>
                      <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                    </Touchable>
                    :
                    <Touchable onPress={wishlistDetailAlfacart(items[1])}>
                      <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
                    </Touchable>
                }
              </View>
              <View style={styles.imageContainer}>
                <Image source={{uri: items[1].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                  showsText: true,
                  color: styles.red,
                  size: 50,
                  thickness: 2
                }} style={styles.imageSize} resizeMode='cover' />
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
                {
                  alreadyCart1 === 1 ?
                    <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[1].productId)}>
                      <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                    </SinarmasButton> :
                    <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[1].productId)}>
                      <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                    </SinarmasButton>}
              </View>
            </Touchable>
            :
            <View />
        }
      </View>

    );
  }

  renderItemsCMI = (items) => {
    const {wishlistCMI, cartCMI, detailProduct = noop, tickOverlayCMI, wishlistDetailAlfacart, dropFromWishlist, productAlreadyAlfacart} = this.props;
    const grossPrice0 = result(items, '0.grossPrice', '');
    const grossPrice1 = result(items, '1.grossPrice', '');

    const productCodeItem0 = result(items, '0.productCode');
    const productCodeItem1 = result(items, '1.productCode');

    const wishlistColor0 = size(filter(wishlistCMI, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem0 === firstCounting;
    }));
    const wishlistColor1 = size(filter(wishlistCMI, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem1 === firstCounting;
    }));

    const alreadyCart0 = size(filter(cartCMI, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem0 === firstCounting;
    }));
    const alreadyCart1 = size(filter(cartCMI, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem1 === firstCounting;
    }));

    return (
      <View style={styles.itemsContainer}>
        <Touchable onPress={detailProduct(items[0])} style={styles.item}>
          <View styles={styles.container}>
            {
              wishlistColor0 === 1 ?
                <Touchable onPress={dropFromWishlist(items[0])}>
                  <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                </Touchable>
                :
                <Touchable onPress={wishlistDetailAlfacart(items[0])}>
                  <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
                </Touchable>
            }

          </View>

          <View style={styles.imageContainer}>
            <Image source={{uri: items[0].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
              showsText: true,
              color: styles.red,
              size: 50,
              thickness: 2
            }} style={styles.imageSize} resizeMode='cover' />
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
            {
              alreadyCart0 === 1 ?
                <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[0].productId)}>
                  <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                </SinarmasButton> :
                <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlayCMI(items[0].productId)}>
                  <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                </SinarmasButton>}
          </View>
        </Touchable>
        {
          items.length > 1 ?
            <Touchable onPress={detailProduct(items[1])} style={styles.item}>
              <View styles={styles.container}>
                {
                  wishlistColor1 === 1 ?
                    <Touchable onPress={dropFromWishlist(items[1])}>
                      <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                    </Touchable>
                    :
                    <Touchable onPress={wishlistDetailAlfacart(items[1])}>
                      <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
                    </Touchable>
                }
              </View>

              <View style={styles.imageContainer}>
                <Image source={{uri: items[1].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                  showsText: true,
                  color: styles.red,
                  size: 50,
                  thickness: 2
                }} style={styles.imageSize} resizeMode='cover' />
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
                {
                  alreadyCart1 === 1 ?
                    <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[1].productId)}>
                      <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                    </SinarmasButton> :
                    <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlayCMI(items[1].productId)}>
                      <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                    </SinarmasButton>}
              </View>
            </Touchable>
            :
            <View />
        }
      </View>

    );
  }
  render = () => {
    const {category = [], listAllProductData, goToPage, paginationAlfaDashboard, seeAllCategory, addQuantity, visible, tickOnclose, quantity, minusQuantity, addToCart, buyNowDashboard, allCart, goToCartAlfacart, currentMerchant, cartCMI} = this.props;
    // const data = getBrandEgift(listAllProductData);
    const data = chunk(listAllProductData, 2);
    const dataCategory = getBrandEgift(category);
    const totalamount = sumBy(allCart, 'items.price');
    const totalamountCMI = sumBy(cartCMI, 'items.price');

    const totalitems = allCart.length;
    const totalitemsCMI = cartCMI.length;

    const countCurrentPage = result(paginationAlfaDashboard, 'countCurrentPage', 0);
    const productInPage = result(paginationAlfaDashboard, 'productInPage', 0);
    const allTotalData = result(paginationAlfaDashboard, 'allTotalData', 0);
    const currentPage = Number(allTotalData - countCurrentPage);
    const merchant = result(currentMerchant, 'name', '');


    return (
      <View>
        <ScrollView>
          <Overlay closeOnTouchOutside visible={visible} onClose={tickOnclose}>
            <View>
              <Touchable onPress={tickOnclose}>
                <SimasIcon name='close-black' size={15} style={styles.closePopUp} />
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
              {merchant === 'ALFACART' ?
                <View style={styles.containerScrollView}>
                  <View style={styles.containerRowServiceBillpay} >
                    <Text style={styles.styleMessage}>{language.ALFACART_DASHBOARD_CATEGORY}</Text>
                    <View style={styles.textBillPayStyle} >
                      <Touchable onPress={seeAllCategory}>
                        <Text style={styles.styleMessageSeeAllBiller}>{language.OFFER__BANNER_SEEALL}</Text>
                      </Touchable>
                    </View>
                  </View>
                </View>
                : null
              }
              <View style={styles.containerCategory}>
                <FlatList data={dataCategory} renderItem={this.renderDataCategory} />
              </View>
              <View style={styles.containerScrollView}>
                <View style={styles.containerRowServiceBillpay} >
                  <Text style={styles.styleMessage}>{language.ALFACART_DASHBOARD_ALL}</Text>
                  <View style={styles.textBillPayStyle} >
                    <Touchable onPress={''}>
                      <Text style={styles.styleMessageSeeAllBiller}>{''}</Text>
                    </Touchable>
                  </View>
                </View>
              </View>
              <ScrollView>
                {
                  merchant === 'ALFACART' ?
                    <View style={styles.containerProduct}>
                      <FlatList data={data} renderItem={this.renderBrand} />
                    </View>
                    : <View style={styles.containerProduct}>
                      <FlatList data={data} renderItem={this.renderBrandCMI} />
                    </View>
                }

              </ScrollView>
              <View style={styles.rowPagination}>
                {countCurrentPage !== 0 ?
                  <Touchable onPress={goToPage(-productInPage)}>
                    <SimasIcon name='arrow' size={15} style={styles.leftPagination} />
                  </Touchable> : <View />}
                <View >
                  <Text style={styles.numberPaging}>
                    {countCurrentPage === 0 ? 1 : ceil(countCurrentPage / productInPage + 1)}
                  </Text>
                </View>
                {currentPage < productInPage || currentPage === productInPage ? 
                  <View /> :
                  <Touchable onPress={goToPage(productInPage)}>
                    <SimasIcon name='arrow' size={15} style={styles.rightPagination} />
                  </Touchable>}
              </View>
              {
                merchant === 'ALFACART' ?
                  <View style={styles.rowOngkir}>
                    <Touchable onPress={goToCartAlfacart}>
                      <View style={styles.ph20}>
                        <View style={styles.rowEndOngkir}>
                          <View style={styles.borderedContainerOngkir}>
                            <View style={styles.iconOngkir}>

                              <SimasIcon name={'cart'} size={30} style={styles.cartWhite} />
                            </View>
                            <View style={styles.textOngkir}>
                              <Text style={styles.textButton}>{totalitems} items | Rp {currencyFormatter(totalamount)}</Text>
                              <Text style={styles.textAlfa}>{'Alfacart'}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Touchable>
                  </View>
                  : <View style={styles.rowOngkir}>
                    <Touchable onPress={goToCartAlfacart}>
                      <View style={styles.ph20}>
                        <View style={styles.rowEndOngkir}>
                          <View style={styles.borderedContainerOngkir}>
                            <View style={styles.iconOngkir}>

                              <SimasIcon name={'cart'} size={30} style={styles.cartWhite} />
                            </View>
                            <View style={styles.textOngkir}>
                              <Text style={styles.textButton}>{totalitemsCMI} items | Rp {currencyFormatter(totalamountCMI)}</Text>
                              <Text style={styles.textAlfa}>{'Muara Mas'}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Touchable>
                  </View>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AlfacartDashboard;
