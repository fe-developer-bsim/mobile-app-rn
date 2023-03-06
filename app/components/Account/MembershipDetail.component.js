import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, ScrollView, Animated, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './MembershipDetail.styles';
import {language} from '../../config/language';
import silver from '../../assets/images/silver.png';
import gold from '../../assets/images/gold.png';
import diamond from '../../assets/images/diamond.png';
import platinum from '../../assets/images/platinum.png';
import result from 'lodash/result';
import evoucher from '../../assets/images/benefitEvoucher.png';
import birthday from '../../assets/images/benefitBirthday.png';
import {currencyFormatter} from '../../utils/transformer.util';
import newdone from '../../assets/images/newdone.png';
import Touchable from '../../components/Touchable.component';
import locked from '../../assets/images/locked.png';
import sortBy from 'lodash/sortBy';
import {theme} from '../../styles/core.styles';
import PaginationDot from 'react-native-animated-pagination-dot';

const {width} = Dimensions.get('window');


class MembershipDetail extends React.Component {
  static propTypes = {
    statusMember: PropTypes.string,
    goToMembership: PropTypes.func,
    openInbox: PropTypes.func,
    configCustSegment: PropTypes.array,
    goToTncSimasCatalog: PropTypes.func,
    goToMyCoupon: PropTypes.func,
    lang: PropTypes.string,
  }

  scrollProduct = new Animated.Value(0)

  renderProduct = (data = []) => {
    const {statusMember, goToTncSimasCatalog, goToMyCoupon, lang} = this.props;
    const dataType = result(data, 'no', 0);
    const type = dataType === 1 ? 'silver' : dataType === 2 ? 'gold' : dataType === 3 ? 'platinum' : dataType === 4 ? 'diamond' : null;
    const imageMember = type === 'silver' ? silver : type === 'gold' ? gold : type === 'diamond' ? diamond : type === 'platinum' ? platinum : null;
    const textMember = type === 'silver' ? language.MEMBERSHIP__SILVER : type === 'gold' ? language.MEMBERSHIP__GOLD : type === 'diamond' ? language.MEMBERSHIP__DIAMOND : type === 'platinum' ? language.MEMBERSHIP__PLATINUM : null;
    const minimum = result(data, 'minimum', 0);
    const display = result(data, 'tampilan', 0);
    const rp = lang === 'en' ? 'IDR ' : 'Rp ';
    const benefit = result(data, 'benefit', []);
    return (
      <View>
        <View style={styles.mediaFilling}>
          <View style={styles.profileHeader}>
            <View style={styles.rowHeader2}>
              <Text style={[styles.menuTitle, styles.roboto]}>{textMember}</Text>
            </View>
            <View style={styles.rowHeader}>
              { statusMember === 'silver' && type === 'silver' || statusMember === 'gold' && type === 'gold' || statusMember === 'diamond' && type === 'diamond' || statusMember === 'platinum' && type === 'platinum' ?
                <Image source={newdone} style={styles.picture}/>
                :  statusMember === 'diamond' ?
                  <Text style={[styles.menuTitlePassed, styles.robotoPassed]}>{language.MEMBERSHIP__MEMBER_STATUS_TITLE}</Text>
                  : statusMember === 'platinum' && type === 'silver' || statusMember === 'platinum' && type === 'gold'  ?
                    <Text style={[styles.menuTitlePassed, styles.robotoPassed]}>{language.MEMBERSHIP__MEMBER_STATUS_TITLE}</Text>
                    : statusMember === 'gold' && type === 'silver' ?
                      <Text style={[styles.menuTitlePassed, styles.robotoPassed]}>{language.MEMBERSHIP__MEMBER_STATUS_TITLE}</Text>
                      :
                      <Image source={locked} style={styles.picture2}/>
              }
            </View>
          </View>
          <View style={[styles.menu1, styles.rowCenter]}>
            <View style={styles.rowCenter}>
              <View style={styles.width2}>
                <Image source={imageMember} style={styles.pictureIconnew}/>
              </View>
              <View style={styles.padding}>
                { statusMember === 'silver' && type === 'silver' || statusMember === 'gold' && type === 'gold' || statusMember === 'diamond' && type === 'diamond' || statusMember === 'platinum' && type === 'platinum' ?
                  <View>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_1 + textMember}</Text>
                    {statusMember === 'silver' ?
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTxt2, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_2}</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[styles.menuTxt22, styles.roboto, styles.bold]}>{rp + currencyFormatter(display)}</Text>
                          <Text style={[styles.menuTxt22, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_3}</Text>
                        </View>
                      </View>
                      :
                      <View style={styles.textTittle}>
                        <Text style={[styles.menuTxt2, styles.roboto]}>{language.MEMBERSHIP__MIN_DESC_1}</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={[styles.menuTxt22, styles.roboto, styles.bold]}>{rp + currencyFormatter(minimum)}</Text>
                          <Text style={[styles.menuTxt22, styles.roboto]}>{language.MEMBERSHIP__MIN_DESC_2}</Text>
                        </View>
                        <Text style={[styles.menuTxt22, styles.roboto]}>{textMember}</Text>
                      </View>
                    }
                  </View>
                  : statusMember === 'diamond' ?
                    <View>
                      <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_PASSED_1}</Text>
                    </View>
                    : statusMember === 'platinum' && type === 'silver' || statusMember === 'platinum' && type === 'gold'  ?
                      <View>
                        <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_PASSED_1}</Text>
                      </View>
                      : statusMember === 'gold' && type === 'silver' ?
                        <View>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_PASSED_1}</Text>
                        </View>
                        :
                        <View style={styles.textTittle}>
                          <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__MINIMUM}</Text>
                          <Text style={[styles.menuTitle, styles.roboto]}>{rp + currencyFormatter(minimum)}</Text>
                          <Text style={[styles.menuTxt2, styles.roboto]}>{language.MEMBERSHIP__MEMBER_STATUS_UPGRADE_1 + textMember + language.MEMBERSHIP__MEMBER_STATUS_UPGRADE_2}</Text>
                          <Text style={[styles.menuTxt22, styles.roboto, styles.bold]}>{rp + currencyFormatter(minimum)}</Text>
                        </View> }
              </View>
            </View>
          </View>
        </View>

        <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
          <PaginationDot activeDotColor={theme.brand} containerWidth={90} curPage={dataType - 1} maxPage={4}/>
        </View>


        <View style={styles.mediaFilling2}>
          <Text style={[styles.menuTitle, styles.roboto]}>{language.MEMBERSHIP__BEFEFITS_TITLE}</Text>
          <Text style={styles.transparent}>{textMember}</Text>
          <View style={[styles.menu, styles.rowCenter1]}>
            <View style={styles.rowCenter1}>
              <View style={styles.width}>
                <Image source={evoucher} style={styles.pictureIcon2}/>
              </View>
              <View>
                <Text style={[styles.menuTitle, styles.roboto]}>{language.MEMBERSHIP__BEFEFITS_EVOUCHER_TITLE}</Text>
                <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__BEFEFITS_EVOUCHER + textMember + language.MEMBERSHIP__BEFEFITS_EVOUCHER_2}</Text>
                <Touchable style={styles.buttonNew} onPress={goToTncSimasCatalog}>
                  <Text style={styles.menuTxt3}>{language.MEMBERSHIP__BEFEFITS_EVOUCHER_BUY}</Text>
                </Touchable>
              </View>
            </View>
          </View>

          <View style={benefit.length > 1 ? styles.greyLine : null} />

          <View>
            { benefit.length > 1 ?
              <View style={[styles.menu, styles.rowCenter1]}>
                <View style={styles.rowCenter1}>
                  <View style={styles.width}>
                    <Image source={birthday} style={styles.pictureIcon2}/>
                  </View>
                  <View>
                    <Text style={[styles.menuTitle, styles.roboto]}>{language.MEMBERSHIP__BEFEFITS_BIRTHDAY_TITLE}</Text>
                    <Text style={[styles.menuTxt, styles.roboto]}>{language.MEMBERSHIP__BEFEFITS_BIRTHDAY}</Text>
                    <Touchable style={styles.buttonNew} onPress={goToMyCoupon}>
                      <Text style={styles.menuTxt3}>{language.MEMBERSHIP__BEFEFITS_EVOUCHER_CLAIM}</Text>
                    </Touchable>
                  </View>
                </View>
              </View> : null}
          </View>

        </View>

      </View>
    );
  }


  render () {
    const {configCustSegment} = this.props;
    // const data = Object.entries(configCustSegment);
    let positionProd = Animated.divide(this.scrollProduct, width);
    const data = sortBy(configCustSegment, 'no');
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'  contentContainerStyle={styles.container} extraHeight={120}>
        <View>
          <View>
            <View style={styles.header}/>
            <View style={styles.media}>
              <ScrollView horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.scrollProduct}}}]), {useNativeDriver: true}}
                scrollEventThrottle={16}>
                {data.map(this.renderProduct)}
              </ScrollView>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                <View style={{flexDirection: 'row'}}>
                  {data.map((_, i) => {
                    let opacity = positionProd.interpolate({
                      inputRange: [i - 1, i, i + 1],
                      outputRange: [0.3, 1, 0.3],
                      extrapolate: 'clamp'});
                    return (
                      <Animated.View
                        key={i}
                        style={{opacity, height: 7, width: 7, backgroundColor: 'transparent', margin: 5, borderRadius: 5}}/>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default MembershipDetail;
