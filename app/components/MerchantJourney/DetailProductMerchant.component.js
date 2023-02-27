import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TextInput} from 'react-native';
import styles from './DetailProductMerchant.styles';
import {language} from '../../config/language';
import SimasIcon from '../../assets/fonts/SimasIcon';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {ScrollView} from 'react-native-gesture-handler';
import {result} from 'lodash';
import {currencyFormatter} from '../../utils/transformer.util';
import Animated from 'react-native-reanimated';
import {ScrollableTabView, ScrollableTabBar} from '@valdio/react-native-scrollable-tabview';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import {theme} from '../../styles/core.styles';
import TabDescription from './TabDescription.component';
import TabSpesification from './TabSpecification.component';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';

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
    detailProductData: PropTypes.object,
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
    goToCheckout: PropTypes.func,
    dispatch: PropTypes.func
  }

  state = {
    catagory: '',
    disabled: false,
    containerHeightStyle: {minHeight: 0},
    showExpand: false,
    summaryCollapsed1: true,
  }

  fall = new Animated.Value(1);
  bs = React.createRef();

  fall2 = new Animated.Value(1);
  bs2 = React.createRef();

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

  selectNoPolis = () => {
  }

  selectNoPolis2 = () => {
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar style={{borderWidth: 0}}/>)

  renderInner = () => {
    const {minusQuantity, addQuantity, quantity, detailProductData, addToCart} = this.props;

    return (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View style={styles.subPanelHandle} />
          <View style={styles.panelHandle} />
        </View>
        <View>
          <Text style={styles.styleMessage}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
          <View style={styles.itemCart}>
            <View>
              <Text>{language.ALFACART_DASHBOARD_QUANTITY}</Text>
            </View>
            <View style={styles.qtyContainer}>
              <View style={styles.amountContainer}>
                <View style={styles.borderedContainer}>
                  <TouchableOpacity disabled={quantity < 2} onPress={minusQuantity}>
                    <View style={styles.plusminBorder}>
                      <Text style={quantity > 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.centerQty}>
                    <Text>{quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={addQuantity}>
                    <View style={styles.plusminBorder}>
                      <Text style={styles.largeText}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.greyLine2} />
          </View>
          <View style={styles.itemCart}>
            <TextInput
              underlineColorAndroid='transparent'
              maxLength={20}
              placeholder={language.ALFACART_DASHBOARD_NOTES}
              style={styles.filterTextInput}/>
            <View style={styles.greyLineNotes} />
          </View>
          <View style={styles.buttonContainer2}>
            <View style={styles.buttonLeftInner}>
              <TouchableOpacity style={styles.buttonSpacing} buttonType='secondary' onPress={this.selectNoPolis2}>
                <Text style={styles.textBuy}>{language.ALFACART_DASHBOARD_SHEET_BUY_NOW}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRightInner}>
              <TouchableOpacity style={styles.buttonSpacing} onPress={addToCart(detailProductData)}>
                <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderItems = (items) => {
    const {minusQuantity, addQuantity} = this.props;
    const itemsDetail = result(items, 'items', {});

    return (
      <View>
        <View style={styles.itemCart2}>
          <View style={styles.rowCart}>
            <View style={styles.imageContainer}>
              <Image source={{uri: itemsDetail.urlImage}} renderError={loadError} style={styles.imageCartSize}/>
            </View>
          </View>
          <View>
            <View style={styles.rowCart2}>
              <View style={styles.itemPrice}>
                <Text style={styles.captionBold}>{itemsDetail.productName}</Text>
                <Text>Rp. {currencyFormatter(itemsDetail.price)}</Text>
                <View>
                  <View style={styles.qtyContainerCart}>
                    <View style={styles.amountContainerCart}>
                      <View style={styles.borderedContainerCart}>
                        <Touchable disabled={items.quantity < 2} onPress={minusQuantity}>
                          <View style={styles.rightBorderCart}>
                            <Text style={items.quantity > 1 ? styles.largeTextCart : styles.largeTextDisabledCart}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorderCart}>
                          <Text style={styles.timesTextCart}>{items.quantity}</Text>
                        </View>
                        <Touchable onPress={addQuantity}>
                          <View style={styles.centerCart}>
                            <Text style={styles.largeTextCart}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                  <View style={styles.loveContainer}>
                    <Touchable onPress={''}>
                      <SimasIcon name={'love-stroke'} size={20} style={styles.iconLove}/>
                    </Touchable>
                  </View>
                  <View style={styles.buttonDelete}>
                    <Touchable onPress={''}>
                      <SimasIcon name={'trash'} size={20} style={styles.iconLove}/>
                    </Touchable>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.greyLine2} />
        </View>
      </View>
    );
  }

  backToMenu=() => {
    this.props.dispatch(NavigationActions.back());
  }

  renderCart = () => {
    const {cartAlfacart, goToCheckout} = this.props;

    return (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View style={styles.subPanelHandle} />
          <View style={styles.panelHandle} />
        </View>
        <View>
          <Text style={styles.styleMessage}>{language.ALFACART_CART_BOTTOM_SHEET_CART}</Text>
          <View>
            <View style={styles.styleCart}>
              {cartAlfacart.map(this.renderItems)}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.totalCart}>
            <Text style={styles.totalCaption}>{language.ALFACART_CART_BOTTOM_SHEET_TOTAL}</Text>
            <Text style={styles.totalItems}>{'items'} ({language.ALFACART_CART_BOTTOM_SHEET_ITEMS})</Text>
            <Text style={styles.totalPrice}>Rp. {currencyFormatter('price')}</Text>
          </View>
          <View style={styles.buttonContainerCart}>
            <View style={styles.buttonRightInner}>
              <TouchableOpacity style={styles.buttonSpacing} buttonType='secondary' onPress={goToCheckout}>
                <Text style={styles.textAdd}>{language.ALFACART_CART_BOTTOM_SHEET_CHECKOUT}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {detailProductData, onChangeTab, initialTab, addToCart} = this.props;
    const urlImage = result(detailProductData, 'urlImage', '');
    const price = result(detailProductData, 'price', '');
    const name = result(detailProductData, 'productName', '');

    return (
      <View>
        <ScrollView>
          <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
            <View style={styles.container2}>
              <View style={styles.containerDetailProduct}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: urlImage}} renderError={loadError} style={styles.imageSize}/>
                </View>
                <View styles={styles.iconContainer}>
                  <View style={styles.itemNameContainer}>
                    <Text style={styles.itemName} />
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.itemName}>{name}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>Rp. {currencyFormatter(price)} </Text>
                  </View>
                </View>
              </View>
              <View style={styles.greyLine}/>
              <View style={styles.containerDetailProduct}>
                <ScrollableTabView {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={onChangeTab} initialPage={initialTab}>
                  <TabDescription tabLabel={language.ALFACART_DETAIL_PRODUCT_DESCRIPTION} detailProductData={detailProductData}/>
                  <TabSpesification tabLabel={language.ALFACART_DETAIL_PRODUCT_SPESIFICATION} detailProductData={detailProductData}/>
                </ScrollableTabView>
              </View>
              <View style={styles.greyLine}/>
              <View style={styles.containerDetailProduct}>
                <View style={styles.buttonContainer}>
                  <Touchable style={styles.buttonLeftInner} buttonType='secondary' onPress={this.backToMenu}>
                    <View style={styles.buttonSpacing} >
                      <Text style={styles.textBuy}>{language.DIGISTORE__BUTTON__BACK}</Text>
                    </View>
                  </Touchable>
                  <Touchable style={styles.buttonRightInner} onPress={addToCart(detailProductData)}>
                    <View style={styles.buttonSpacing}>
                      <Text style={styles.textAdd}>{language.DIGISTORE__BUTTON__ADD_CART}</Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AlfacartDashboard;
