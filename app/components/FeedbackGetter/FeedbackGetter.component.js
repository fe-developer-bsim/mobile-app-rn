/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import Touchable from '../Touchable.component';
import {language} from '../../config/language';
import styles from './FeedbackGetter.component.style';
import StartRater from './StarRater.component';
import NPS from '../../assets/images/NPS.png';
import noop from 'lodash/noop';
import SimasIcon from '../../assets/fonts/SimasIcon';
import result from 'lodash/result';
import filter from 'lodash/filter';
import size from 'lodash/size';
import Dash from 'react-native-dash';
import LinearGradient from 'react-native-linear-gradient';
import {suggestionTransform} from '../../utils/transformer.util';
import {SinarmasButton} from '../FormComponents';



class FeedbackGetter extends React.Component {
  static propTypes = {
    onFeedback: PropTypes.func,
    visible: PropTypes.bool,
    userName: PropTypes.string,
    onClose: PropTypes.func,
    dispatch: PropTypes.func,
    closeFeedback: PropTypes.func,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    onClose: noop,
  }
  state = {
    rating: -1,
    suggestion: [],
    suggestionText: '',
    styleRatingOne: false,
    styleRatingTwo: false,
    styleRatingThree: false,
    styleRatingFour: false,
    styleRatingFive: false,
    styleRatingSix: false,
    styleRatingSeven: false,
    styleRatingEgith: false,
    styleRatingNine: false,
    styleRatingTen: false
  }
  
  ratingText = (rate) => {
    const rateMap = {
      0: language.FEEDBACK__RATING_1,
      1: language.FEEDBACK__RATING_1,
      2: language.FEEDBACK__RATING_1,
      3: language.FEEDBACK__RATING_2,
      4: language.FEEDBACK__RATING_2,
      5: language.FEEDBACK__RATING_2,
      6: language.FEEDBACK__RATING_3,
      7: language.FEEDBACK__RATING_3,
      8: language.FEEDBACK__RATING_4,
      9: language.FEEDBACK__RATING_4,
      10: language.FEEDBACK__RATING_5,
    };
    return rateMap[rate];
  }
  onRating = (newRating) => {
    this.setState({rating: newRating});
    this.setState({suggestion: []});
    this.setState({suggestionText: ''});
  }
  onChangeText = (suggestionText) => this.setState({suggestionText})
  
  submit = () => {
    const {onFeedback = Promise.resolve} = this.props;
    const {rating, suggestion, suggestionText} = this.state;
    const suggestionPool = suggestionTransform(this.state.suggestion);
    const suggestions = suggestionTransform(this.state.suggestionText);
    onFeedback('SUBMIT', {rating, suggestion, suggestionPool, suggestions, suggestionText});
    this.setState({rating: '', suggestion: '', suggestionText: ''}); 
  }
 
  dismiss = () => {
    const {onFeedback = noop} = this.props;
    onFeedback('DISMISS', {});
  }

  suggestion = (suggestionIndex, numberIndex = '0') => () => {
    const sizeSuggestion = size(this.state.suggestion);
    if (sizeSuggestion > 0) {
      const checkIndex = filter(this.state.suggestion, (item) => {
        const resultIndex = result(item, 'indexSuggestion', '');
        return suggestionIndex === resultIndex;
      });
      const resultSize = size(checkIndex);
      if (resultSize === 1) {
        const resultSuggestionIndex = filter(this.state.suggestion, (item) => {
          const resultIndex = result(item, 'indexSuggestion', '');
          return suggestionIndex !== resultIndex;
        });
        this.setState({suggestion: resultSuggestionIndex});
      } else {
        this.setState({suggestion: [...this.state.suggestion, {indexSuggestion: suggestionIndex}]});
      }
      this.numberIndexShow(numberIndex);
    } else {
      this.setState({suggestion: [{indexSuggestion: suggestionIndex}]});
      this.numberIndexShow(numberIndex);
    }
  }

  numberIndexShow = (number) => {
    if (number === '1') {
      this.setState({styleRatingOne: !this.state.styleRatingOne});
    } else if (number === '2') {
      this.setState({styleRatingTwo: !this.state.styleRatingTwo});
    } else if (number === '3') {
      this.setState({styleRatingThree: !this.state.styleRatingThree});
    } else if (number === '4') {
      this.setState({styleRatingFour: !this.state.styleRatingFour});
    } else if (number === '5') {
      this.setState({styleRatingFive: !this.state.styleRatingFive});
    } else if (number === '6') {
      this.setState({styleRatingSix: !this.state.styleRatingSix});
    } else if (number === '7') {
      this.setState({styleRatingSeven: !this.state.styleRatingSeven});
    } else if (number === '8') {
      this.setState({styleRatingEgith: !this.state.styleRatingEgith});
    } else if (number === '9') {
      this.setState({styleRatingNine: !this.state.styleRatingNine});
    } else if (number === '10') {
      this.setState({styleRatingTen: !this.state.styleRatingTen}); 
    }
  }
 
  neverShow = () => {
    const {onFeedback = noop} = this.props;
    onFeedback('NEVER_SHOW', {});
  }
  onClose = () => {
    this.props.closeFeedback();
  }

  render () {
    const vm = this;
    const {visible, userName = '', closeFeedback} = this.props;
    const disabled = this.state.suggestion.length === 0 && this.state.rating !== 10;
   
    return (
      <ScrollView visible={visible} onDismiss={this.dismiss}>
        <View style={styles.mainArea}>
          <View style={styles.container}>
            <View style={styles.mainArea}>
              <Touchable style={styles.buttonX} onPress={closeFeedback}>
                <SimasIcon name='close' size={10}/>
              </Touchable>
              <Text style={styles.mainArea3}>{language.DASHBOARD__WELCOME} {userName}</Text>
              <Text style={styles.title2} >{language.FEEDBACK__TITLE}</Text>
              <Image source={NPS} style={styles.logoImage}/>
            </View>
            <View style={styles.mainArea2}>
              <Text style={styles.subtitle} >{language.FEEDBACK__RATING}</Text>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={styles.gradientPurple} style={styles.backRate}/>
              <StartRater currentRating={vm.state.rating} onRating={vm.onRating} style={styles.margin}/>
              {
                this.state.rating === -1 ?
                  <Text style={styles.title}>{language.FEEDBACK__SUGGESTIONS}</Text>
                  : 
                  <View>
                    <View style={styles.row2}>
                      <Text style={styles.ratingText}> {language.RATE_EXPERIENCED} </Text>
                      <Text style={
                        this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2 ? styles.rateText 
                          : this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5 ? styles.rateText1 
                            : this.state.rating === 6 || this.state.rating === 7 ? styles.rateText2 
                              : this.state.rating === 8 || this.state.rating === 9 ? styles.rateText3 : styles.rateText4 
                      } >{vm.ratingText(vm.state.rating)}</Text>
                    </View >
                    <Dash dashColor='#cecece'/>
                    { 
                      this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2 || this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5 ?
                        <Text style={styles.subtitle1}> {language.FEEDBACK_SUGGESTIONS_5}</Text>
                        :
                        this.state.rating === 6 || this.state.rating === 7 ?
                          <Text style={styles.subtitle1}> {language.FEEDBACK_SUGGESTIONS_6}</Text>
                          :
                          this.state.rating === 8 || this.state.rating === 9 ?
                            <Text style={styles.subtitle1}> {language.FEEDBACK_SUGGESTIONS_8}</Text>
                            :
                            <Text style={styles.subtitle1}> {language.FEEDBACK_SUGGESTIONS_9}</Text>
                    }     
                    {
                      this.state.rating === 0 ||  this.state.rating === 1 ||  this.state.rating === 2 || this.state.rating === 3 ||  this.state.rating === 4 ||  this.state.rating === 5 ?
                        <View style={styles.row1}>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING1, '1')} style=
                            { (this.state.styleRatingOne === true && (this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2)) ? 
                              styles.suggestionTexts1 
                              : 
                              (this.state.styleRatingOne === true && (this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5)) ?
                                styles.suggestionTexts2
                                :
                                styles.suggestionText1}>
                            <Text style= {this.state.styleRatingOne === true ? 
                              styles.buttonTexts1 : 
                              styles.buttonText1}> {language.SUGGESTION_RATING1} </Text></Touchable>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING2, '2')} style=
                            { (this.state.styleRatingTwo === true && (this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2)) ? 
                              styles.suggestionTexts1 
                              : 
                              (this.state.styleRatingTwo === true && (this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5)) ?
                                styles.suggestionTexts2
                                :
                                styles.suggestionText1}><Text style=
                                  { this.state.styleRatingTwo === true ? 
                                styles.buttonTexts1 : 
                                styles.buttonText1}> {language.SUGGESTION_RATING2} </Text></Touchable>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING3, '3')} style={ (this.state.styleRatingThree === true && (this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2)) ? 
                            styles.suggestionTexts1 
                            : 
                            (this.state.styleRatingThree === true && (this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5)) ?
                              styles.suggestionTexts2
                              :
                              styles.suggestionText1}><Text style=
                                { this.state.styleRatingThree === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING3} </Text></Touchable>
                        </View>
                        :
                        <View style={styles.row1}>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING4, '4')} style=
                            { (this.state.styleRatingFour === true && (this.state.rating === 6 || this.state.rating === 7)) ? 
                              styles.suggestionTexts3 
                              : 
                              (this.state.styleRatingFour === true && (this.state.rating === 8 || this.state.rating === 9)) ?
                                styles.suggestionTexts4
                                :
                                (this.state.styleRatingFour === true && (this.state.rating === 10)) ?
                                  styles.suggestionTexts5
                                  :
                                  styles.suggestionText1}><Text style=
                                    {this.state.styleRatingFour === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING4} </Text></Touchable>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING5, '5')} style= 
                            { (this.state.styleRatingFive === true && (this.state.rating === 6 || this.state.rating === 7)) ? 
                              styles.suggestionTexts3 
                              : 
                              (this.state.styleRatingFive === true && (this.state.rating === 8 || this.state.rating === 9)) ?
                                styles.suggestionTexts4
                                :
                                (this.state.styleRatingFive === true && (this.state.rating === 10)) ?
                                  styles.suggestionTexts5
                                  :
                                  styles.suggestionText1}><Text style=
                                    {this.state.styleRatingFive === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING5}</Text></Touchable>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING6, '6')} style=
                            { (this.state.styleRatingSix === true && (this.state.rating === 6 || this.state.rating === 7)) ? 
                              styles.suggestionTexts3 
                              : 
                              (this.state.styleRatingSix === true && (this.state.rating === 8 || this.state.rating === 9)) ?
                                styles.suggestionTexts4
                                :
                                (this.state.styleRatingSix === true && (this.state.rating === 10)) ?
                                  styles.suggestionTexts5
                                  :
                                  styles.suggestionText1}><Text style=
                                    {this.state.styleRatingSix === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING6} </Text></Touchable>
                        </View>
                    }
                    {
                      this.state.rating === 0 ||  this.state.rating === 1 ||  this.state.rating === 2 || this.state.rating === 3 ||  this.state.rating === 4 ||  this.state.rating === 5 ?
                        <View style={styles.row}>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING7, '7')} style=
                            { (this.state.styleRatingSeven === true && (this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2)) ? 
                              styles.suggestionTexts1 
                              :
                              (this.state.styleRatingSeven === true && (this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5)) ?
                                styles.suggestionTexts2
                                :
                                styles.suggestionText1}><Text style=
                                  {this.state.styleRatingSeven === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING7} </Text></Touchable>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING8, '8')} style=
                            { (this.state.styleRatingEgith === true && (this.state.rating === 0 || this.state.rating === 1 || this.state.rating === 2)) ? 
                              styles.suggestionTexts1 
                              :
                              (this.state.styleRatingEgith === true && (this.state.rating === 3 || this.state.rating === 4 || this.state.rating === 5)) ?
                                styles.suggestionTexts2
                                :
                                styles.suggestionText1}><Text style=
                                  {this.state.styleRatingEgith === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING8} </Text></Touchable>
                        </View>
                        :
                        <View style={styles.row}>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING9, '9')} style=
                            { (this.state.styleRatingNine === true && (this.state.rating === 6 || this.state.rating === 7)) ? 
                              styles.suggestionTexts3 
                              : 
                              (this.state.styleRatingNine === true && (this.state.rating === 8 || this.state.rating === 9)) ?
                                styles.suggestionTexts4
                                :
                                (this.state.styleRatingNine === true && (this.state.rating === 10)) ?
                                  styles.suggestionTexts5
                                  :
                                  styles.suggestionText1}><Text style=
                                    {this.state.styleRatingNine === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING9} </Text></Touchable>
                          <Touchable onPress={vm.suggestion(language.SUGGESTION_RATING10, '10')} style=
                            { (this.state.styleRatingTen === true && (this.state.rating === 6 || this.state.rating === 7)) ? 
                              styles.suggestionTexts3 
                              : 
                              (this.state.styleRatingTen === true && (this.state.rating === 8 || this.state.rating === 9)) ?
                                styles.suggestionTexts4
                                :
                                (this.state.styleRatingTen === true && (this.state.rating === 10)) ?
                                  styles.suggestionTexts5
                                  :
                                  styles.suggestionText1}><Text style=
                                    {this.state.styleRatingTen === true ? 
                                styles.buttonTexts1 : styles.buttonText1}> {language.SUGGESTION_RATING10} </Text></Touchable>
                        </View>
                    }
                    <View style = {styles.lineStyle}/>
                    <Text style={styles.descriptionMore}>
                      {language.DESCRIPTIONS_MORE}
                    </Text>
                    <TextInput underlineColorAndroid='transparent' style={styles.textArea} multiline = {true}
                      clearButtonMode='while-editing' onChangeText={vm.onChangeText}
                      placeholder={language.DESCRIPTIONS_TYPE}
                      maxLength={160}
                      editable = {true}/>
                   
                    <SinarmasButton onPress={vm.submit} disabled= {disabled} style={styles.button} text={language.FEEDBACK__SUMBIT}/>
                  </View> 
              }                
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}


export default FeedbackGetter;