import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';
import styles from './DetailProductAlfacart.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {ScrollView} from 'react-native-gesture-handler';
import {result, size, filter} from 'lodash';
import {currencyFormatter} from '../../utils/transformer.util';
import {ScrollableTabView, ScrollableTabBar} from '@valdio/react-native-scrollable-tabview';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import {theme} from '../../styles/core.styles';
import TabDescription from './TabDescription.component';
import TabSpesification from './TabSpesification.component';
import Overlay from '../Overlay/OverlayRadius.component';
import alfamart from '../../assets/images/alfamart-new.jpg';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand,
    borderRadius: 5
  },
  tabBarTextStyle: styles.tabText
};

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class AlfacartDashboard extends React.Component {
  static propTypes = {
    detailProductData: PropTypes.array,
    cartAlfacart: PropTypes.array,
    nav: PropTypes.object,
    selectNoPolis: PropTypes.func,
    selectNoPolis2: PropTypes.func,
    minusQuantity: PropTypes.func,
    addQuantity: PropTypes.func,
    quantity: PropTypes.number,
    quantityCart: PropTypes.number,
    onChangeTab: PropTypes.func,
    initialTab: PropTypes.number,
    addToCart: PropTypes.func,
    buyNow: PropTypes.func,
    goToCheckout: PropTypes.func,
    goToCartAlfacart: PropTypes.func,
    visible: PropTypes.object,
    tickOverlay: PropTypes.object,
    tickOverlayCMI: PropTypes.object,
    tickOnclose: PropTypes.object,
    wishlistDetailAlfacart: PropTypes.func,
    wishlistAlfacart: PropTypes.array,
    allCart: PropTypes.array,
    dropFromWishlist: PropTypes.array,
    productAlreadyAlfacart: PropTypes.func,
    currentMerchant: PropTypes.array,
    wishlistCMI: PropTypes.array,
    cartCMI: PropTypes.array

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

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar style={{borderWidth: 0}} />)

  render () {
    const {detailProductData, onChangeTab, initialTab, buyNow, tickOverlay, tickOverlayCMI, wishlistDetailAlfacart, visible, tickOnclose, quantity, minusQuantity, addQuantity, addToCart, wishlistAlfacart, allCart, dropFromWishlist, productAlreadyAlfacart, currentMerchant, wishlistCMI, cartCMI} = this.props;

    const urlImage = result(detailProductData, 'urlImage', '');
    const price = result(detailProductData, 'price', '');
    const grossprice = result(detailProductData, 'grossPrice', '');
    const name = result(detailProductData, 'productName', '');
    const store = result(detailProductData, 'sellerName', '');
    const code = result(detailProductData, 'productId', '');
    const merchant = result(currentMerchant, 'name', '');

    const productCodeItem = result(detailProductData, 'productCode');

    const wishlistColor = size(filter(wishlistAlfacart, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem === firstCounting;
    }));

    const wishlistColorCMI = size(filter(wishlistCMI, function (val) {
      const firstCounting = result(val, 'productCode', '');
      return productCodeItem === firstCounting;
    }));

    const alreadyCart = size(filter(allCart, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem === firstCounting;
    }));
    const alreadyCartCMI = size(filter(cartCMI, function (val) {
      const firstCounting = result(val, 'items.productCode', '');
      return productCodeItem === firstCounting;
    }));

    return (
      <View>
        <ScrollView>
          <Overlay closeOnTouchOutside visible={visible} onClose={tickOnclose}>
            <View>
              <SimasIcon name='' size={15} style={styles.closePopUp} />
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

              <View style={styles.buttonContainerPopUp}>
                <View style={styles.buttonLeftInnerPopUp}>
                  <Touchable buttonType='secondary' onPress={tickOnclose}>
                    <Text style={styles.textCancel}>{language.GENERIC__CANCEL}</Text>
                  </Touchable>
                </View>
                <View style={styles.buttonRightInnerPopUp}>
                  <Touchable onPress={addToCart(detailProductData)}>
                    <Text style={styles.textOkay}>{language.ONBOARDING__OKAY}</Text>
                  </Touchable>
                </View>
              </View>
            </View>
          </Overlay>
          <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
            <View style={styles.container2}>
              <View style={styles.containerDetailProduct}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: urlImage}} renderError={loadError} style={styles.imageSize} />
                </View>
                <View styles={styles.iconContainer} horizontal={true}>
                  {
                    merchant === 'ALFACART' ?
                      <View style={styles.textAlfacart}>
                        <Image source={alfamart} style={styles.alfaIcon} />
                        <View style={styles.textStore}>
                          <Text>{language.ALFACART_DETAIL_PRODUCT_STORE}{store}</Text>
                        </View>

                        <View style={styles.textStore}>
                          {
                            wishlistColor === 1 ?
                              <Touchable onPress={dropFromWishlist(detailProductData)}>
                                <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                              </Touchable>
                              :
                              <Touchable onPress={wishlistDetailAlfacart(detailProductData)}>
                                <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
                              </Touchable>
                          }
                          <SimasIcon name={'sharebutton'} size={20} style={styles.shareIcon} />
                        </View>
                      </View>
                      :
                      <View style={styles.textAlfacart}>
                        <Image source={''} style={styles.alfaIcon} />
                        <View style={styles.textStore}>
                          <Text>{language.ALFACART_DETAIL_PRODUCT_STORE}{store}</Text>
                        </View>

                        <View style={styles.textStore}>
                          {
                            wishlistColorCMI === 1 ?
                              <Touchable onPress={dropFromWishlist(detailProductData)}>
                                <SimasIcon name={'love-fill'} size={20} style={styles.burgerRed} />
                              </Touchable>
                              :
                              <Touchable onPress={wishlistDetailAlfacart(detailProductData)}>
                                <SimasIcon name={'love-fill'} size={20} style={styles.burger} />
                              </Touchable>
                          }
                          <SimasIcon name={'sharebutton'} size={20} style={styles.shareIcon} />
                        </View>
                      </View>
                  }

                </View>

                <View styles={styles.iconContainer}>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName} />
                  </View>

                  <View style={styles.nameContainer}>
                    <Text style={styles.itemName}>{name}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>Rp. {currencyFormatter(price)} </Text>
                    {
                      grossprice === '' ?
                        <Text style={styles.price}>{''}</Text>
                        :
                        <Text style={styles.grossPrice}>Rp. {currencyFormatter(grossprice)} </Text>
                    }
                  </View>
                </View>
              </View>
              <View style={styles.greyLine} />
              <View style={styles.containerDetailProduct}>
                <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={onChangeTab} initialPage={initialTab}>
                  <TabDescription tabLabel={language.ALFACART_DETAIL_PRODUCT_DESCRIPTION} detailProductData={detailProductData} currentMerchant={currentMerchant} />
                  <TabSpesification tabLabel={language.ALFACART_DETAIL_PRODUCT_SPESIFICATION} detailProductData={detailProductData} currentMerchant={currentMerchant}/>
                </ScrollableTabView>
              </View>
              <View style={styles.greyLine} />
              <View style={styles.containerDetailProduct}>
                {
                  merchant === 'ALFACART' ?
                    <View style={styles.buttonContainer}>
                      <View style={styles.buttonLeftInner}>
                        <Touchable style={styles.buttonSpacing} buttonType='secondary' onPress={buyNow(detailProductData)}>
                          <Text style={styles.textBuy}>{language.ALFACART_DASHBOARD_SHEET_BUY_NOW}</Text>
                        </Touchable>
                      </View>
                      <View style={styles.buttonRightInner}>
                        {
                          alreadyCart === 1 ?
                            <Touchable style={styles.buttonSpacing} onPress={productAlreadyAlfacart(code)}>
                              <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
                            </Touchable>
                            :
                            <Touchable style={styles.buttonSpacing} onPress={tickOverlay(code)}>
                              <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
                            </Touchable>
                        }

                      </View>
                    </View>
                    :
                    <View style={styles.buttonContainer}>
                      <View style={styles.buttonLeftInner}>
                        <Touchable style={styles.buttonSpacing} buttonType='secondary' onPress={buyNow(detailProductData)}>
                          <Text style={styles.textBuy}>{language.ALFACART_DASHBOARD_SHEET_BUY_NOW}</Text>
                        </Touchable>
                      </View>
                      <View style={styles.buttonRightInner}>
                        {
                          alreadyCartCMI === 1 ?
                            <Touchable style={styles.buttonSpacing} onPress={productAlreadyAlfacart(code)}>
                              <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
                            </Touchable>
                            :
                            <Touchable style={styles.buttonSpacing} onPress={tickOverlayCMI(code)}>
                              <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
                            </Touchable>
                        }

                      </View>
                    </View>
                }

              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AlfacartDashboard;