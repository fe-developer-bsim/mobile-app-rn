import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList, Image, TextInput} from 'react-native';
import styles from './MerchantDashboard.styles';
import {language} from '../../config/language';
import Touchable from '../../components/Touchable.component';
import BackgroundTimer from 'react-native-background-timer';
import {result, chunk, noop, size} from 'lodash';
import {currencyFormatter} from '../../utils/transformer.util';
import Bar from 'react-native-progress/Bar';
import Animated from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;

class AlfacartDashboard extends React.Component {
  static propTypes = {
    detailProduct: PropTypes.func,
    nav: PropTypes.object,
    navigateTo: PropTypes.func,
    categoryData: PropTypes.array,
    listAllProductData: PropTypes.array,
    goToDetailCategory: PropTypes.func,
    dataCategory: PropTypes.array,
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
    detailCategory: PropTypes.func,
    dispatch: PropTypes.func,
    addToCart: PropTypes.func,
    listAllProduct: PropTypes.func,
    maximumNumberOfEachPage: PropTypes.string,
    filterCartProduct: PropTypes.func,
    goTopUp: PropTypes.func,
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

  renderBrand = ({type} = []) => {
    const brandList = result(type, 'item.listAllProductData', []);
    const itemChunk = chunk(brandList, 2);
    return (
      <View style={styles.brandPadding}>
        <View style={styles.brandContainer}><Text style={styles.brand}>{type.brandType}</Text></View>
        {itemChunk.map(this.renderItems)}
      </View>
    );
  }

  renderItems = (items) => {
    const {detailProduct = noop, addToCart} = this.props;
    return (
      <View style={styles.itemsContainer}>

        <Touchable onPress={detailProduct(items[0])} style={styles.item}>
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
          </View>
          <View style={styles.buttonLogin}>
            <Touchable style={styles.buttonSpacing} onPress={addToCart(items[0])}>
              <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
            </Touchable>
          </View>
        </Touchable>
        {
          size(items) > 1 ?
            <Touchable onPress={detailProduct(items[1])} style={styles.item}>
              <View style={styles.imageContainer}>
                <Image source={{uri: items[1].urlImage}} renderError={loadError} indicator={Bar} indicatorProps={{
                  showsText: true,
                  color: styles.red,
                  size: 50,
                  thickness: 2
                }} style={styles.imageSize} resizeMode='cover'/>
              </View>
              <View style={styles.itemNameContainer}>
                <Text style={styles.itemName}>{items[1].productName}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>Rp. {currencyFormatter(result(items[1], 'price', ''))} </Text>
              </View>
              <View style={styles.buttonLogin}>
                <Touchable style={styles.buttonSpacing} onPress={addToCart(items[1])}>
                  <Text style={styles.textButton}>{language.ALFACART_DASHBOARD_ADD_TO_CART}</Text>
                </Touchable>
              </View>
            </Touchable>
            :
            <View style={styles.itemBlank}/>
        }
      </View>
    );
  }


  selectNoPolis = () => {
    this.bs.current.snapTo(1);
  }

  renderInner = () => {
    const {minusQuantity, addQuantity, quantity} = this.props;

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
            <View style={styles.greyLine2} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonLeftInner}>
              <TouchableOpacity style={styles.buttonSpacing} buttonType='secondary' onPress={''}>
                <Text style={styles.textBuy}>{language.ALFACART_DASHBOARD_SHEET_BUY_NOW}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRightInner}>
              <TouchableOpacity style={styles.buttonSpacing} onPress={''}>
                <Text style={styles.textAdd}>{language.ALFACART_DASHBOARD_SHEET_ADD_TO_CART}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render () {
    const {listAllProductData} = this.props;
    const item = {listAllProductData};
    const data = [item];
    return (
      <View>
        <View>
          <View onLayout={this.setContainerHeightStyle} style={[styles.halfWidth]}>
            <View style={styles.container2}>
              <Animated.View style={{
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 1)),
              }}>
                <View style={styles.containerScrollView}>
                  <View style={styles.containerRowServiceBillpay} >
                    <Text style={styles.styleMessage}>{language.ALFACART_DASHBOARD_CATEGORY}</Text>
                  </View>
                </View>

              </Animated.View>
            </View>
          </View>
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.containerProduct}>
            <FlatList data={data} renderItem={this.renderBrand}/>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default AlfacartDashboard;


// for merchant who need category
//   <ScrollView horizontal={true}>
//   <View style={styles.textBillPayStyleBL}>

//       {categoryData.map((transaction) => (
//       <Touchable onPress={filterCartProduct(result(transaction, 'categoryCode', ''))} style={styles.filterSelection}>
//           <Image source={{uri: 'https://cs1.alfacart.com/product/1/1_A09350004612_20190125154932104.jpg'}} size={50} style={styles.iconCategory}/>
//           <Text style={styles.filterSelection}>{result(transaction, 'name', '')}</Text>
//         </Touchable>
//               ))}
//     </View>
// </ScrollView>;
// { /* <BottomSheet
//           ref={this.bs}
//           snapPoints={['0%', '55%', '55%']}
//           renderContent={this.renderInner}
//           initialSnap={0}
//           callbackNode={this.fall}
// /> */ }
// { /* <View style={styles.textBillPayStyle} >
//                       <Touchable onPress={seeAllCategory}>
//                         <Text style={styles.styleMessageSeeAllBiller}>{language.OFFER__BANNER_SEEALL}</Text>
//                       </Touchable>
// </View> */ }
