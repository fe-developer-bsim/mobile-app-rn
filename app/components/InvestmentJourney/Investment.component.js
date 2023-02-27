import React from 'react';
import PropTypes from 'prop-types';
import {Text, ScrollView, View} from 'react-native';
import styles from './Investment.styles';
import result from 'lodash/result';
import map from 'lodash/map';
import {textLightGreyStyle} from '../../styles/common.styles';
import {language} from '../../config/language';
import forEach from 'lodash/forEach';
import {isEmpty} from 'lodash';
import MSIGcardInfo from './MSIGcardInfo.component';
import MSIGdetailInfo from './MSIGdetailInfo.component';
import {Pagination} from 'react-native-snap-carousel';
import Carousel from '../Carousel/Carousel.component';

class InvestmentComponent extends React.Component {
  static propTypes = {
    navParams: PropTypes.object,
    dataMagnaLink: PropTypes.array,
    dataPrimeLink: PropTypes.array,
    changeDataMagna: PropTypes.func,
    nomorPolisMagna: PropTypes.array,
    nomorPolisPrime: PropTypes.array,
    detailList: PropTypes.array,
    detailListRemoveNull: PropTypes.array,
    currentLanguage: PropTypes.string,
  }

  state = {
    activeSlide: 0
  }

  get pagination () {
    const {detailListRemoveNull} = this.props;
    const {activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={detailListRemoveNull.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.dot}
        dotStyle={styles.activeDot}
        inactiveDotStyle={{
        // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  renderCard = (cardData) => {
    const {navParams = {}, nomorPolisMagna, nomorPolisPrime, currentLanguage} = this.props;
    const cardDataInfo = result(cardData, 'item', {});
    return (
      <MSIGcardInfo
        cardDataInfo={cardDataInfo}
        navParams={navParams}
        nomorPolisMagna={nomorPolisMagna}
        nomorPolisPrime={nomorPolisPrime}
        currentLanguage={currentLanguage}
      />
    );
  }

  snapItem = (index) => this.setState({activeSlide: index});

  render () {
    const {navParams = {}, currentLanguage, detailListRemoveNull} = this.props;
    const cardInfo = result(detailListRemoveNull, this.state.activeSlide, {});
    const type = result(navParams, 'type', '');
    const code = result(navParams, 'code', '');
    const portfolio1 = result(navParams, 'wealthManagementMap.portfolio1', {});
    const headerPortfolio1 = result(portfolio1, 'header', []);
    const dataPortfolio1 = result(portfolio1, 'data', []);
    const portfolio2 = result(navParams, 'wealthManagementMap.portfolio2', {});
    const headerPortfolio2 = result(portfolio2, 'header', []);
    const dataPortfolio2 = result(portfolio2, 'data', []);
    const dataSimpolParse = JSON.parse(result(navParams, 'wealthManagementJson', '{}'));
    let allData = [];
    forEach(dataSimpolParse, (value) => {
      allData = [...allData, value];
    });

    return (
      <ScrollView>
        {type === 'portofolio_mutualfund' &&
          <View>
            <View>
              <View><Text style={styles.titleBlack}>{result(navParams, 'portfolio1.productTitle', '')}</Text></View>
              {map(dataPortfolio1, (value, j) => (
                <View key={j}>
                  {map(value, (value2, i) => (
                    <View key={i} style={styles.content}>
                      <View><Text style={textLightGreyStyle}>{headerPortfolio1[i]}</Text></View>
                      <View><Text style={styles.valueBlack}>{value2}</Text></View>
                    </View>
                  ))}
                  <View style={styles.greyLine} />
                </View>
              ))
              }
            </View>

            <View>
              <View><Text style={styles.titleBlack}>{result(navParams, 'portfolio2.productTitle', '')}</Text></View>
              {map(dataPortfolio2, (value, j) => (
                <View key={j}>
                  {map(value, (value2, i) => (
                    <View key={i} style={styles.content}>
                      <View><Text style={textLightGreyStyle}>{headerPortfolio2[i]}</Text></View>
                      <View><Text style={styles.valueBlack}>{value2}</Text></View>
                    </View>

                  ))}
                  <View style={styles.greyLine} />
                </View>
              ))
              }
            </View>
          </View>
        }
        {type === 'portofolio_bancassurance' &&
        <View>
          {!isEmpty(detailListRemoveNull) ?
            <View>
              <View style={styles.containerCarousel}>
                <Carousel data={detailListRemoveNull} renderCard={this.renderCard} onSnapToItem={this.snapItem}/>
              </View>
              <View style={styles.pagination}>
                {this.pagination}
              </View>
            </View>
            : null }
          <View style={{marginHorizontal: 15}}>
            {!isEmpty(cardInfo) ?
              <MSIGdetailInfo index={this.state.activeSlide} cardInfo={cardInfo} currentLanguage={currentLanguage}/>
              : null }
          </View>
        </View>
        }
        {type === 'portofolio_bancassurance' && code === 'sinarmasMSIGNew' ? 
          null :
          <View>
            <View style={styles.rowGray}><Text style={styles.titleTC}>{language.INVESTMENT__TERMANDCONDITION_HEADER}</Text></View>
            <View style={styles.content}><Text style={styles.valueTC}>{language.INVESTMENT__TERMANDCONDITION}</Text></View>
          </View> }
      </ScrollView>
    );
  }
}

export default InvestmentComponent;
