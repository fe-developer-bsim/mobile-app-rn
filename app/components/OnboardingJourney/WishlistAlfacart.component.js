import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, Image} from 'react-native';
import styles from './AlfacartDashboard.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {ScrollView} from 'react-native-gesture-handler';
import {result, chunk, noop, size, filter} from 'lodash';
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
    wishlistAlfacartData: PropTypes.array,
    wishlistCMI: PropTypes.array,
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
    itemsAll: PropTypes.array,
    dropFromWishlist: PropTypes.func,
    productAlreadyAlfacart: PropTypes.func,
    currentMerchant: PropTypes.array,
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
    const {detailProduct = noop, tickOverlay, tickOverlayCMI, dropFromWishlist, allCart, productAlreadyAlfacart, cartCMI, currentMerchant} = this.props;

    const merchant = result(currentMerchant, 'name', '');

    const grossPrice0 = result(items, '0.grossPrice', '');
    const grossPrice1 = result(items, '1.grossPrice', '');

    const productCodeItem0 = result(items, '0.productCode');
    const productCodeItem1 = result(items, '1.productCode');

    const alreadyCart0 = size(filter(allCart, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem0 === firstCounting;
    }));
    const alreadyCart1 = size(filter(allCart, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem1 === firstCounting;
    }));

    const alreadyCartCMI0 = size(filter(cartCMI, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem0 === firstCounting;
    }));
    const alreadyCartCMI1 = size(filter(cartCMI, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem1 === firstCounting;
    }));

    return (
      <View style={styles.itemsContainer}>
        <Touchable onPress={detailProduct(items[0])} style={styles.item}>
          <View styles={styles.container}>
            <Touchable onPress={dropFromWishlist(items[0])}>
              <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
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
            {
              grossPrice0 === '' ?
                <Text style={styles.price}>{''}</Text>
                :
                <Text style={styles.grossPrice}>Rp. {currencyFormatter(items[0].grossPrice)} </Text>
            }
          </View>
          {merchant === 'ALFACART' ?
            <View style={styles.buttonLogin}>
              {
                alreadyCart0 === 1 ?
                  <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[0].productId)}>
                    <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                  </SinarmasButton>
                  :
                  <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[0].productId)}>
                    <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                  </SinarmasButton>
              }
            </View>
            :
            <View style={styles.buttonLogin}>
              {
                alreadyCartCMI0 === 1 ?
                  <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[0].productId)}>
                    <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                  </SinarmasButton>
                  :
                  <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlayCMI(items[0].productId)}>
                    <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                  </SinarmasButton>
              }
            </View>
          }
          {/* <View style={styles.buttonLogin}>
            {
          alreadyCart0 === 1 ?
            <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[0].productId)}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </SinarmasButton>            
            :
            <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[0].productId)}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </SinarmasButton>            }
          </View> */}
        </Touchable>
        {
          items.length > 1 ?
            <Touchable onPress={detailProduct(items[1])} style={styles.item}>
              <View styles={styles.container}>
                <Touchable onPress={dropFromWishlist(items[1])}>
                  <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                </Touchable>
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
              {merchant === 'ALFACART' ?
                <View style={styles.buttonLogin}>
                  {
                    alreadyCart1 === 1 ?
                      <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[1].productId)}>
                        <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                      </SinarmasButton>
                      :
                      <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[1].productId)}>
                        <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                      </SinarmasButton>
                  }
                </View>
                :
                <View style={styles.buttonLogin}>
                  {
                    alreadyCartCMI1 === 1 ?
                      <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[1].productId)}>
                        <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                      </SinarmasButton>
                      :
                      <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlayCMI(items[1].productId)}>
                        <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                      </SinarmasButton>
                  }
                </View>
              }
              {/* <View style={styles.buttonLogin}>
                {
          alreadyCart1 === 1 ?
            <SinarmasButton style={styles.buttonSpacing} onPress={productAlreadyAlfacart(items[1].productId)}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </SinarmasButton>            :
            <SinarmasButton style={styles.buttonSpacing} onPress={tickOverlay(items[1].productId)}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </SinarmasButton>            }
              </View> */}
            </Touchable>
            :
            <View />
        }
      </View>

    );
  }



  render = () => {
    const {wishlistAlfacartData, addQuantity, visible, tickOnclose, quantity, minusQuantity, addToCart, buyNowDashboard, wishlistCMI, currentMerchant} = this.props;
    const data = getBrandEgift(wishlistAlfacartData);
    const dataCMI = getBrandEgift(wishlistCMI);
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
                <View style={styles.buttonLeftInner}>
                  <Touchable buttonType='secondary' onPress={buyNowDashboard}>
                    <Text style={styles.textBuy}>{language.ALFACART_DASHBOARD_SHEET_BUY_NOW}</Text>
                  </Touchable>
                </View>
                <View style={styles.buttonRightInner}>
                  <Touchable onPress={addToCart}>
                    <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
                  </Touchable>
                </View>
              </View>
            </View>
          </Overlay>
          <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
            <View style={styles.container2}>
              <ScrollView>
                <View style={styles.containerProduct}>
                  {merchant === 'ALFACART' ?
                    <FlatList data={data} renderItem={this.renderBrand} />
                    :
                    <FlatList data={dataCMI} renderItem={this.renderBrand} />

                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AlfacartDashboard;
