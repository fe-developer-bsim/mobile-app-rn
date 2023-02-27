import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Text} from 'react-native';
import {SinarmasPickerLine} from '../FormComponents';
import {Field} from 'redux-form';
import map from 'lodash/map';
import noop from 'lodash/noop';
import styles from './CgvTab.styles';
import CgvOffer from './CgvOffer.component';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {wrapObjectInFunction, generateCgvCityLabel, filterCity, filterCityByCode} from '../../utils/transformer.util';
import {theme} from '../../styles/core.styles';
import offersStyles from './CgvOffers.styles';
import chunk from 'lodash/chunk';
import result from 'lodash/result';
import {language} from '../../config/language';
import sortBy from 'lodash/sortBy';

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand
  },
  tabBarTextStyle: styles.tabText
};


class tabDetail extends React.Component {

  state = {
    cinemaList: {},
  };

  componentWillMount = () => {
    const {cinemaList} = this.props;
    this.setState({
      cinemaList: cinemaList,
    });
  };

  changeCity = () => (val) => {
    const {cinemaList} = this.props;
    const newList = filterCityByCode(cinemaList, result(val, 'name', ''));
    this.setState({
      cinemaList: newList,
    });
  }

  static propTypes = {
    offer: PropTypes.object,
    onOfferClick: PropTypes.func,
    movieList: PropTypes.array,
    cinemaList: PropTypes.array,
    onCinemaClick: PropTypes.func,
    onMovieClick: PropTypes.func,
    comingSoonList: PropTypes.array,
  }

  renderTabBar = wrapObjectInFunction(<ScrollableTabBar/>)

  render () {
    const {movieList = [], cinemaList = [], comingSoonList = [], onCinemaClick = noop, onMovieClick = noop} = this.props;
    const movieChunk = chunk(movieList, 2);
    const comingSoonChunk = chunk(comingSoonList, 2);
    const listCity = filterCity(cinemaList);
    const cnmListDt = this.state.cinemaList;
    const cnmList = sortBy(cnmListDt, 'cinemaName');
    return (
      <View style={styles.container}>
        <ScrollableTabView ref='Tabs' {...tabBarConfig} locked={true} renderTabBar={this.renderTabBar} onChangeTab={this.changeTab}>
          <ScrollView style={offersStyles.container} contentContainerStyle={offersStyles.scrollContainer} tabLabel={language.CGV_NOW_PLAYING}>
            <View>
              {
                map(movieChunk, (value, k) => (
                  <View key={k} style={styles.containerRow}>
                    {value.map((val, i) => (
                      <CgvOffer
                        key={i}
                        type={'movie'}
                        val={val}
                        onPress={onMovieClick(val)}
                      />
                    ))}
                  </View>
                )
                )}
            </View>
            <View style={styles.cgvTabDisclaimer}>
              <Text style={styles.TexcgvTabDisclaimerText}>{language.CGV_TAB_DISCLAIMER}</Text>
            </View>
          </ScrollView>
          <ScrollView style={offersStyles.container} contentContainerStyle={offersStyles.scrollContainer} tabLabel={language.CGV_CINEMA_LABEL}>
            <View>
              <View style={styles.formHeader}>
                <Field
                  name='accountNo'
                  rightIcon='arrow'
                  component={SinarmasPickerLine}
                  placeholder={language.CGV_SELECT_CITY}
                  labelText={language.CGV_CITY_LABEL}
                  labelKey='display'
                  itemList={generateCgvCityLabel(listCity)}
                  onValChange={this.changeCity()}
                />
              </View>
              {
                map(cnmList, (value, i) => (
                  <CgvOffer key={i} type={'cinema'} val={value}
                    onPress={onCinemaClick(value)}
                  />
                )
                )}
            </View>
            <View style={styles.cgvTabDisclaimer}>
              <Text style={styles.TexcgvTabDisclaimerText}>{language.CGV_TAB_DISCLAIMER}</Text>
            </View>
          </ScrollView>
          <ScrollView style={offersStyles.container} contentContainerStyle={offersStyles.scrollContainer} tabLabel={language.CGV_COMING_SOON}>
            <View>
              {
                map(comingSoonChunk, (value, k) => (
                  <View key={k} style={styles.containerRow}>
                    {value.map((val, i) => (
                      <CgvOffer
                        key={i}
                        type={'movie'}
                        val={val}
                        onPress={onMovieClick(val, 'comingSoon')}
                      />
                    ))}
                  </View>
                )
                )}
            </View>
            <View style={styles.cgvTabDisclaimer}>
              <Text style={styles.TexcgvTabDisclaimerText}>{language.CGV_TAB_DISCLAIMER}</Text>
            </View>
          </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}

export default tabDetail;
