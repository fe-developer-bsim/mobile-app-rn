import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, ScrollView, Image, Animated, Platform} from 'react-native';
import {language} from '../../config/language';
import {isEmpty, orderBy, map} from 'lodash';
import styles from './ScoreNilaiQ.styles';
import Touchable from '../../components/Touchable.component';
// import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AnimatedCircularProgress from './AnimatedCircularProgress';
import {Circle} from 'react-native-svg';
import moment from 'moment';
import {theme} from '../../styles/core.styles';
import Bar from 'react-native-progress/Bar';


const loadError = () => <Text>{language.ERROR_MESSAGE__IMAGE_LOAD}</Text>;
// const {width} = Dimensions.get('window');

class ScoreNilaiQ extends React.Component {
  static propTypes = {
    sumScore: PropTypes.number,
    scoreUpdate: PropTypes.number,
    maxScore: PropTypes.number,
    minScore: PropTypes.number,
    scoreDescription: PropTypes.string,
    offers: PropTypes.array,
    onOfferClick: PropTypes.func,
    dataScore: PropTypes.object,
    scoreCode: PropTypes.string,
  }


  scrollX = new Animated.Value(0) // this will be the scroll location of our ScrollView
  scrollLS = new Animated.Value(0)
  scrollProduct = new Animated.Value(0)


  render () {
    const {sumScore, scoreUpdate, maxScore, minScore, scoreDescription, offers, dataScore, scoreCode} = this.props;
    const todayDate = new Date();
    const totalScore = ((sumScore - minScore) / (maxScore - minScore)) * 100;
    const updateDate = new Date(scoreUpdate);
    const txDate = moment(updateDate).format('D MMMM YYYY, hh:mm');
    const naDate = moment(todayDate).format('D MMMM YYYY, hh:mm');
    const sortBanner = orderBy(offers, 'order', ['asc']);
    // let position = Animated.divide(this.scrollX, width * 0.50);
    // const textScoreValue = scoreDescription === 'Poor' ? styles.textPoorScoreValue : scoreDescription === 'Fair' ? styles.textFairScoreValue : scoreDescription === 'Good' ? styles.textGoodScoreValue : scoreDescription === 'Great' ? styles.textGreatScoreValue : styles.textExcellentScoreValue;
    // const lineColor = scoreDescription === 'Need Attention' || scoreDescription === 'Perlu Perhatian' ? theme.radicalRed : scoreDescription === 'Fair' || scoreDescription === 'Cukup' ? theme.textOrange : scoreDescription === 'Good' || scoreDescription === 'Baik' ? theme.textYellow : scoreDescription === 'Great' || scoreDescription === 'Sangat Baik' ? theme.textSoftGreen : theme.textLightGreen;
    const textDetailScore = scoreCode === 'Poor' ? styles.textDetailScorePoor : scoreCode === 'Fair' ? styles.textDetailScoreFair : scoreCode === 'Good' ? styles.textDetailScoreGood : scoreCode === 'Great' ? styles.textDetailScoreGreat : styles.textDetailScoreExcellent;
    let selectedCollor = [];
    if (scoreCode === 'Poor') {
      selectedCollor = ['#fa9d80', '#f66a77'];
    } else if (scoreCode === 'Good' || scoreCode === 'Fair') {
      selectedCollor = ['#aedba7', '#f9e68f', '#fa9d80', '#f66a77'];
    } else if (scoreCode === 'Great') {
      selectedCollor = ['#61cdee', '#98d8d1', '#aedba7', '#f9e68f', '#fa9d80', '#f66a77'];
    } else {
      selectedCollor = [
        '#61cdee',
        '#98d8d1',
        '#aedba7',
        '#f9e68f',
        '#fa9d80',
        '#f66a77',

      ];
    }
    return (
      <View style={styles.pinkBg}>
        <View style={styles.whiteBg}>
          <ScrollView extraHeight={120} showsVerticalScrollIndicator={false} style={styles.mt20}>
            
            {/* TAMPILAN SDK KIT */}
            <View style={styles.topDate}>
              {
                isEmpty(dataScore) || dataScore === null ?
                  <Text style={styles.textTopDate}>Updated on {naDate} </Text>
                  :
                  <Text style={styles.textTopDate}>Updated on {txDate} </Text>
              }

              {/* TAMPILAN UI UX */}
              {/* {
                isEmpty(dataScore) || dataScore === null ?
                  null :
                  <Text style={styles.textTopDate}>Updated on {txDate} </Text>
              } */}
              
            </View>
            
            <View style={styles.tesAja}>
              {/* TAMPILAN SDK KIT */}
              {
                isEmpty(dataScore) || dataScore === null ?
                  <View style={styles.circleContainer}>
                    <View style={styles.NotScorePoint}>
                      <Text style={styles.textNotAvailable}>{language.NILAI_Q_SCORE_NOT_AVAILABLE}</Text>
                    </View>
                  </View>
                  :
                  <AnimatedCircularProgress
                    size={260}
                    width={10}
                    duration={3000}
                    fill={totalScore}
                    arcSweepAngle={190}
                    rotation={265}
                    selectedCollor={selectedCollor}
                    backgroundColor= {theme.newLightGrey}
                    lineCap='round'
                    // eslint-disable-next-line react/jsx-no-bind
                    renderCap={isEmpty(dataScore) || dataScore === null ? null : ({center}) => <Circle cx={center.x} cy={center.y} r='8' fill='red' />}
                  >
                    {
                      () => (
                        <View style={Platform.OS === 'android' ? styles.circleContainer : styles.circleContainerIOS}>
                          <Text style={textDetailScore}> {scoreDescription} </Text>
                          <View style={styles.noScorePoint}>
                            <Text style={styles.sumScoreTextKit}>{sumScore}</Text>
                          </View>
                          <Text style={styles.textDateUpdate}>Updated on {txDate} </Text>
                          {/* <View style={styles.buttonDetail}>
                            <Text>See Details</Text>
                          </View> */}
                        </View>
                      )
                    }
                  </AnimatedCircularProgress>
              }


              {/* TAMPILAN UI UX */}
              {/* <AnimatedCircularProgress
                size={250}
                width={10}
                duration={3000}
                fill={totalScore}
                arcSweepAngle={190}
                rotation={265}
                backgroundColor= {theme.whiteGrey}
                lineCap='round'
                // eslint-disable-next-line react/jsx-no-bind
                renderCap={isEmpty(dataScore) || dataScore === null ? null : ({center}) => <Circle cx={center.x} cy={center.y} r='8' fill='red' />}
              >
                {
                  (fill) => (
                    <View style={styles.circleContainerUIUX}>
                      <View style={styles.scorePoint}>
                        <Text style={styles.sumScoreText}>{sumScore === 0 ? 'N/A' : sumScore}</Text>
                        <Text style={styles.pointsText}>points</Text>
                      </View>
                      
                      <View>
                        <Text style={styles.pointsText}> Your score perfomance</Text>
                        {
                          isEmpty(dataScore) || dataScore === null ?
                            <View style={styles.textNoScoreValue}>
                              <Text style={styles.NoscoreDesc}> N/A </Text>
                            </View>
                            : 
                            <View style={textScoreValue}>
                              <Text style={styles.scoreDesc}> {scoreDescription} </Text>
                            </View>
                        }
                      </View>
                    </View>
                  )
                }
              </AnimatedCircularProgress> */}

            </View>

            <View>
              <View style={styles.rowOffers}>
                <View style={styles.colorTextOffers}/>
                <Text style={styles.textOffers}> {language.NILAI_Q_SCORE_OFFERS}</Text>
              </View>
              {
                isEmpty(sortBanner) || sortBanner === [] ?
                  <View style={styles.emptyBannerKoperasi}>
                    <Text>{language.NILAI_Q_SCORE_OFFERS_NO_OFFER}</Text>
                  </View>
                  :
                  <ScrollView

                    // TAMPILAN SDK KIT TIDAK PAKE HORIZONTAL 

                    // TAMPILAN UI UX
                    // horizontal={true}

                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    onScroll ={
                      Animated.event([{nativeEvent: {contentOffset: {x: this.scrollX}}}], {useNativeDriver: true})
                    }
                    scrollEventThrottle={16}> 
                    {
                      map(sortBanner, (offers, i) => {
                        const {onOfferClick} = this.props;
                        // let offerDate = '';
                        // if (offers.validStartDate || offers.validEndDate) {
                        //   offerDate = offers.validStartDate === offers.validEndDate ? language.DAY__EVERY + getDayName(offers.validStartDate) :  `${moment(offers.validStartDate, 'DD-MM-YYYY').format('DD MMM YYYY')}${' - '}${moment(offers.validEndDate, 'DD-MM-YYYY').format('DD MMM YYYY')}`;
                        // }
                        const isSingle = sortBanner.length === 1;
                        return (
                          <View key={i}>
                            <Touchable style={isSingle ? styles.containerInnerOffer : styles.shortContainerInnerOffer} onPress={onOfferClick(offers)}>
                              <Image source={{uri: offers.imgUrl}} resizeMode={'stretch'} renderError={loadError} indicator={Bar} indicatorProps={{
                                showsText: true,
                                color: theme.brand,
                                size: 50,
                                thickness: 2
                              }} style={isSingle ? styles.bannerinnerOffer : styles.bannerLifestyleElse} />
                              {/* <View style={isSingle ? styles.containerAlfa : styles.containerAlfaSmall}>
                                <View>
                                  <View style={styles.offerDetails}>
                                    <View style={styles.iconContainer}><SimasIcon name='time-black' size={isSingle ? 30 : 20} style={styles.iconStyleBlack}/></View>
                                    <View>
                                      <Text style={isSingle ? styles.label : styles.labelSmall}>{language.OFFER__BANNER_VALID_DATE}</Text>
                                      <Text style={isSingle ? styles.labelValidDate : styles.labelSmall}>{offerDate}</Text>
                                    </View>
                                  </View>
                                </View>
                              </View> */}
                            </Touchable>
                          </View>
                        );
                      }
                      )
                    }
                  </ScrollView>
              }
                  
              {/* TAMPILAN SDK KIT TIDAK PAKE BULET KECIL */}

              {/* TAMPILAN UI UX */}
              {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                <View style={{flexDirection: 'row'}}>
                  {sortBanner.map((offers, i) => {
                    // const categoryName = result(offers, 'category', '');
                    // const categoryLifeStyle = categoryName === 'Lifestyle';
                    // const opacityLS = positionLifeStyle.interpolate({inputRange: [i - 1, i, i + 1], outputRange: [0.3, 1, 0.3], extrapolate: 'clamp'});
                    const opacityOffers = position.interpolate({inputRange: [i - 1, i, i + 1], outputRange: [0.3, 1, 0.3], extrapolate: 'clamp'});
                    // let opacity = categoryOffers === 'Lifestyle' ? opacityLS : opacityOffers;
                    // const nameLifestyle = result(offers, 'offersTitle', '');
                    // const toogleTouchableLifestyle = !!(nameLifestyle === 'UVOffer' &&  lowerCase(checkToogleMenuUV) === 'yes' || nameLifestyle === 'AlfaCartOffer' &&  lowerCase(checkToogleMenuAlfa) === 'yes' || nameLifestyle === 'KoperasiOffer' &&  lowerCase(checkToogleMenuKoperasi) === 'yes' || nameLifestyle === 'CMIOffer' &&  lowerCase(checkToogleMenuCMI) === 'yes' || nameLifestyle === 'UnipinOffer' &&  lowerCase(checkToggleMenuUnipin) === 'yes' || nameLifestyle === 'CMIOffer' &&  lowerCase(checkToogleMenuCMI) === 'yes');
                    return (
                      <View>
                        <Animated.View
                          key={i}
                          style={{opacityOffers, height: 7, width: 7, backgroundColor: theme.pinkBrand, margin: 5, borderRadius: 5}}/>
                      </View>
                    );
                  })}
                </View>
              </View> */}

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ScoreNilaiQ;