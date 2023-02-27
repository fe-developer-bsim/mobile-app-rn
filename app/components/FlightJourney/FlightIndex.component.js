import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, ImageBackground} from 'react-native';
import {theme} from '../../styles/core.styles';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import styles from './FlightIndex.style';
import {wrapObjectInFunction} from '../../utils/transformer.util';
import {language} from '../../config/language';
import {Field} from 'redux-form';
import {SinarmasInput, DatePicker, SinarmasButton, SinarmasPicker} from '../FormComponents';
import noop from 'lodash/noop';
import {wrapMethodInFunction} from '../../utils/transformer.util';
import Touchable from '../Touchable.component';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {changeDateArrival} from '../../state/thunks/flight.thunks';
import SimasIcon from '../../assets/fonts/SimasIcon';
import bannerFlight from '../../assets/images/banner-flight.jpg';

export const fields = {
  ORIGIN_CITY: 'originCity',
  DESTINATION_CITY: 'destinationCity',
  DEPART_DATE: 'departDate',
  ARRIVAL_DATE: 'arrivalDate',
  CATEGORY: 'category'
};

const tabBarConfig = {
  tabBarBackgroundColor: theme.white,
  tabBarActiveTextColor: theme.black,
  tabBarInactiveTextColor: theme.textGrey,
  tabBarUnderlineStyle: {
    backgroundColor: theme.brand
  },
  tabBarTextStyle: styles.tabText
};

class FlightIndex extends Component {
  
  renderTabBar = wrapObjectInFunction(<ScrollableTabBar />);

  changeTab = (res) => {
    const {changeIndexTab} = this.props;
    if (res.i  === 0) {
      changeIndexTab(res.i);
    } else if (res.i === 1) {
      changeIndexTab(res.i);
    }
  };

    
  render () {
    const {today, classes, mockDate = false, goToAirportListOrigin, 
      goToAirportListDestination, adult, child, infant, addAdult, minusAdult, 
      addChild, minusChild, addInfant, minusInfant, switchTrip, departDate, arrivalDate,  ...reduxFormProps} = this.props;
    const {invalid, submitting, handleSubmit = noop} = reduxFormProps;
    const minDate = mockDate ? '' : moment(today).format('YYYY-MM-DD');
    const initialDate = new Date();
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.containerContent}  extraHeight={120}>
        <View style={styles.container}>
          <ImageBackground source={bannerFlight} style={styles.banner}>
            <View style={styles.bannerTitleView}>
              <Text style={styles.bannerTitle}>{language.FLIGHT__BANNER1}</Text>
              <Text style={styles.bannerTitle}>{language.FLIGHT__BANNER2}</Text>
            </View>
          </ImageBackground>
          <ScrollableTabView {...tabBarConfig} locked={true} initialPage={0} 
            renderTabBar={this.renderTabBar} onChangeTab={this.changeTab}>
            <View tabLabel='ONE WAY' style={styles.containerView}>
              <View>
                <View style={styles.mh20}>
                  <View style={styles.originView}>
                    <Touchable onPress={goToAirportListOrigin} >
                      <Field  
                        name={fields.ORIGIN_CITY}
                        component={SinarmasInput}
                        theme='primary'
                        style={styles.fieldContainer}
                        label={language.FLIGHT__ORIGIN_CITY}
                        labelKey='label'
                        placeholder={language.FLIGHT__ORIGIN_CITY}
                        isUseSuccessInputText={true}
                        typeField={'originCity'}
                        disabled={true}
                      />
                    </Touchable>
                  </View>
                  <Touchable style={styles.switch} onPress={switchTrip}>
                    <SimasIcon name='switch' size={30} style={styles.iconColor}/>
                  </Touchable>
                  <View style={styles.destinationView}>
                    <Touchable onPress={goToAirportListDestination}>
                      <Field  
                        name={fields.DESTINATION_CITY}
                        component={SinarmasInput}
                        theme='primary'
                        style={styles.fieldContainer}
                        labelKey='label'
                        label={language.FLIGHT__DESTINATION_CITY}
                        placeholder={language.FLIGHT__DESTINATION_CITY}
                        isUseSuccessInputText={true}
                        typeField={'destinationCity'}
                        disabled={true}
                      />
                    </Touchable>
                  </View>
                  <Field  
                    name={fields.DEPART_DATE}
                    component={DatePicker}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.FLIGHT__DEPART_TIME}
                    placeholder={language.FLIGHT__DEPART_TIME}
                    isUseSuccessInputText={true}
                    typeField={'departDate'}
                    minimumDate={minDate}
                    date={initialDate} 
                  />
                  <Field  
                    name={fields.CATEGORY}
                    component={SinarmasPicker}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.FLIGHT__CLASS}
                    itemList={classes}
                    labelKey='label'
                    placeholder={language.FLIGHT__CLASS}
                    isUseSuccessInputText={true}
                    typeField={'category'}
                  />
                </View>

                <View style={styles.borderGrey}/>
                
                <View style={styles.passenger}>
                  <Text style={styles.passStyle}>{language.FLIGHT__TRAVEL}</Text>
                  <View style = {styles.rowContainer}>
                    <View>
                      <Text style={styles.textStyle}>{language.FLIGHT__ADULT}</Text>
                    </View>

                    <View style={styles.timeAddContainer}>
                      <View style={styles.borderedContainer}>
                        <Touchable disabled={adult === 1} onPress={minusAdult}>
                          <View style={styles.rightBorder}>
                            <Text style={adult >= 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorder }>
                          <Text style={styles.timesText}>{adult}</Text>
                        </View>
                        <Touchable disabled={adult + child >= 9} onPress={addAdult}>
                          <View style={styles.rightBorder}>
                            <Text style={adult >= 9 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                  <View style = {styles.rowContainer}>
                    <View>
                      <Text style={styles.textStyle}>{language.FLIGHT__CHILD}</Text>
                      <Text style={styles.textStyle}>{language.FLIGHT__CHILD_INFO}</Text>
                    </View>
                    <View style={styles.timeAddContainer}>
                      <View style={styles.borderedContainer}>
                        <Touchable disabled={child === 0} onPress={minusChild}>
                          <View style={styles.rightBorder}>
                            <Text style={child >= 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorder }>
                          <Text style={styles.timesText}>{child}</Text>
                        </View>
                        <Touchable disabled={adult + child >= 9} onPress={addChild}>
                          <View style={styles.rightBorder}>
                            <Text style={child >= 9 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
              
                  </View>
                  <View style = {styles.rowContainer}>
                    <View>
                      <Text style={styles.textStyle}>{language.FLIGHT__INFANT}</Text>
                      <Text style={styles.textStyle}>{language.FLIGHT__INFANT_INFO}</Text>
                    </View>
                    <View style={styles.timeAddContainer}>
                      <View style={styles.borderedContainer}>
                        <Touchable disabled={infant === 0} onPress={minusInfant}>
                          <View style={styles.rightBorder}>
                            <Text style={infant >= 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorder }>
                          <Text style={styles.timesText}>{infant}</Text>
                        </View>
                        <Touchable disabled={infant >= adult} onPress={addInfant}>
                          <View style={styles.rightBorder}>
                            <Text style={infant >= 9 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  
                  </View>
                </View>
              </View>
              
              <View style={styles.bottomWrapper}>
                <View style={styles.buttonNext}>
                  <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
                    <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
                  </SinarmasButton>
                </View>
              </View>
            </View>
              
            <View tabLabel='RETURN' style={styles.containerView}>
              <View>
                <View style={styles.mh20}>

                  <View style={styles.originView}>
                    <Touchable onPress={goToAirportListOrigin}>
                      <Field  
                        name={fields.ORIGIN_CITY}
                        component={SinarmasInput}
                        theme='primary'
                        style={styles.fieldContainer}
                        label={language.FLIGHT__ORIGIN_CITY}
                        placeholder={language.FLIGHT__ORIGIN_CITY}
                        isUseSuccessInputText={true}
                        typeField={'originCity'}
                        disabled={true} 
                      />
                    </Touchable>
                  </View>
                  <Touchable style={styles.switch} onPress={switchTrip}>
                    <SimasIcon name='switch' size={30} style={styles.iconColor}/>
                  </Touchable>
                  <View style={styles.destinationView}>
                    <Touchable  onPress={goToAirportListDestination}>
                      <Field  
                        name={fields.DESTINATION_CITY}
                        component={SinarmasInput}
                        theme='primary'
                        style={styles.fieldContainer}
                        label={language.FLIGHT__DESTINATION_CITY}
                        placeholder={language.FLIGHT__DESTINATION_CITY}
                        isUseSuccessInputText={true}
                        typeField={'destinationCity'}
                        disabled={true}
                      />
                    </Touchable>
                  </View>
                  <Field  
                    name={fields.DEPART_DATE}
                    component={DatePicker}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.FLIGHT__DEPART_TIME}
                    placeholder={language.FLIGHT__DEPART_TIME}
                    isUseSuccessInputText={true}
                    typeField={'departDate'}
                    minimumDate={minDate}
                    maximumDate={arrivalDate ? arrivalDate : {}}
                    date={initialDate} 
                  />
                  <Field  
                    name={fields.ARRIVAL_DATE}
                    component={DatePicker}
                    theme='primary'
                    style={styles.fieldContainer}
                    label={language.FLIGHT__ARRIVAL_TIME}
                    placeholder={language.FLIGHT__ARRIVAL_TIME}
                    isUseSuccessInputText={true}
                    typeField={'arrivalDate'}
                    minimumDate={departDate ? departDate : minDate}
                    onValueChange={changeDateArrival}
                    date={initialDate} 
                  />
                  <Field  
                    name={fields.CATEGORY}
                    component={SinarmasPicker}
                    theme='primary'
                    style={styles.fieldContainer}
                    labelKey='label'
                    itemList={classes}
                    label={language.FLIGHT__CLASS}
                    placeholder={language.FLIGHT__CLASS}
                    isUseSuccessInputText={true}
                    typeField={'category'}
                  />
                </View>

                <View style={styles.borderGrey}/>
                
                <View style={styles.passenger}>
                  <Text style={styles.passStyle}>{language.FLIGHT__TRAVEL}</Text>
                  <View style = {styles.rowContainer}>
                    <View>
                      <Text style={styles.textStyle}>{language.FLIGHT__ADULT}</Text>
                    </View>

                    <View style={styles.timeAddContainer}>
                      <View style={styles.borderedContainer}>
                        <Touchable disabled={adult === 1} onPress={minusAdult}>
                          <View style={styles.rightBorder}>
                            <Text style={adult >= 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorder }>
                          <Text style={styles.timesText}>{adult}</Text>
                        </View>
                        <Touchable disabled={adult + child >= 9} onPress={addAdult}>
                          <View style={styles.rightBorder}>
                            <Text style={adult >= 9 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>
                  </View>
                  <View style = {styles.rowContainer}>
                    <View>
                      <Text style={styles.textStyle}>{language.FLIGHT__CHILD}</Text>
                      <Text style={styles.textStyle}>{language.FLIGHT__CHILD_INFO}</Text>
                    </View>
                    <View style={styles.timeAddContainer}>
                      <View style={styles.borderedContainer}>
                        <Touchable disabled={child === 0} onPress={minusChild}>
                          <View style={styles.rightBorder}>
                            <Text style={child >= 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorder }>
                          <Text style={styles.timesText}>{child}</Text>
                        </View>
                        <Touchable disabled={adult + child >= 9} onPress={addChild}>
                          <View style={styles.rightBorder}>
                            <Text style={child >= 9 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>

                  </View>
                  <View style = {styles.rowContainer}>
                    <View>
                      <Text style={styles.textStyle}>{language.FLIGHT__INFANT}</Text>
                      <Text style={styles.textStyle}>{language.FLIGHT__INFANT_INFO}</Text>
                    </View>
                    <View style={styles.timeAddContainer}>
                      <View style={styles.borderedContainer}>
                        <Touchable disabled={infant === 0} onPress={minusInfant}>
                          <View style={styles.rightBorder}>
                            <Text style={infant >= 1 ? styles.largeText : styles.largeTextDisabled}>-</Text>
                          </View>
                        </Touchable>
                        <View style={styles.rightBorder }>
                          <Text style={styles.timesText}>{infant}</Text>
                        </View>
                        <Touchable disabled={infant >= adult} onPress={addInfant}>
                          <View style={styles.rightBorder}>
                            <Text style={infant >= 4 ? styles.largeText : styles.largeTextDisabled}>+</Text>
                          </View>
                        </Touchable>
                      </View>
                    </View>

                  </View>
                </View>
              </View>
              
              <View style={styles.bottomWrapper}>
                <View style={styles.buttonNext}>
                  <SinarmasButton onPress={wrapMethodInFunction(handleSubmit)} disabled={invalid || submitting} >
                    <Text style={styles.buttonLargeTextStyle}>{language.IDENTITYFORM__NEXT_BUTTON}</Text>
                  </SinarmasButton>
                </View>
              </View>

            </View>
          </ScrollableTabView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
FlightIndex.propTypes = {
  handleSubmit: PropTypes.func,
  adult: PropTypes.number,
  child: PropTypes.number,
  infant: PropTypes.number,
  addAdult: PropTypes.func,
  minusAdult: PropTypes.func,
  addChild: PropTypes.func,
  minusChild: PropTypes.func,
  addInfant: PropTypes.func,
  minusInfant: PropTypes.func,
  classes: PropTypes.array,
  today: PropTypes.object,
  mockDate: PropTypes.bool,
  goToAirportListOrigin: PropTypes.func,
  goToAirportListDestination: PropTypes.func,
  originCity: PropTypes.string,
  destinationCity: PropTypes.string,
  switchTrip: PropTypes.func,
  changeIndexTab: PropTypes.func,
  departDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  arrivalDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
export default FlightIndex;