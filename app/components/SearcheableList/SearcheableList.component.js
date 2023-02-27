import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, TextInput} from 'react-native';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import styles from './SearcheableList.style';
import {filterObjects, filterObjectsBiller} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import NButton from './NButton.component';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {language} from '../../config/language';

class SearcheableList extends Component {
  static propTypes = {
    searchlist: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryText: PropTypes.string,
    listHeader: PropTypes.string,
    inputHeader: PropTypes.string,
    minLength: PropTypes.number,
    inputProps: PropTypes.object,
    onNextClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onChangeText: PropTypes.func,
    validator: PropTypes.func,
    placeholderText: PropTypes.string,
    isBiller: PropTypes.bool,
  }
  state = {
    searchlist: [],
    searchText: ''
  }
  onChangeInput = (text) => {
    const {onChangeText = noop, validator = noop} = this.props;
    onChangeText(text);
    const error = validator(text);
    this.setState({
      searchText: text,
      error
    });
  }
  onNextClick=() => {
    const {onNextClick = noop} = this.props;
    onNextClick(this.state.searchText);
  }
  componentWillMount () {
    const {searchlist = []} = this.props;
    this.setState({searchlist});
  }
  componentWillReceiveProps (nextProps) {
    const {searchlist} = nextProps;
    this.setState({searchlist});
  }
  render () {
    const {textKey = 'text', subtextKey = 'subtext', secondaryText = 'secondaryText', inputHeader = 'SAMPLE INPUT HEADER', placeholderText = '', onItemClick = noop, onNextClick, minLength = 6, inputProps = {}, isBiller = false} = this.props;
    const nextEnabled = (this.state.searchText.length >= minLength) && !this.state.error;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View style={styles.inputContainer}>
          <View style={onNextClick ? styles.input : styles.inputWithPaddingHorizontal}>
            <View style={styles.bgSearch}>
              <View style={styles.searchTxtInput}>
                <TextInput
                  style={styles.searchInput}
                  {...inputProps}
                  underlineColorAndroid={'transparent'}
                  label={inputHeader}
                  placeholder={placeholderText}
                  onChangeText={this.onChangeInput}
                  disabled={false}
                  onFocus={this.onFocusSearch}
                  onBlur={this.onBlurSearch}
                  onSubmitEditing={this.onBlurSearch}
                  value={this.state.searchText}
                />
              </View>
              <View style={styles.searchIcon}>
                <SimasIcon name={'search'} size={18} style={styles.icon}/>
              </View>
            </View>
          </View>
          {onNextClick && <NButton style={styles.NButton} enabled={nextEnabled} onPress={this.onNextClick}/>}
        </View>
        {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error}/>}
        <View style={styles.lineRow}>
          <View style={styles.greyLineLeft} />
          <Text style={styles.lineText}>{language.PAY_BILLS__OR}</Text>
          <View style={styles.greyLineRight} />
        </View>
        <QuickPickList listOfItems={isBiller ? filterObjectsBiller(this.state.searchlist, this.state.searchText) : filterObjects(this.state.searchlist, this.state.searchText)} textKey={textKey} subtextKey={subtextKey} secondaryTextKey={secondaryText} onSelect={onItemClick}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default SearcheableList;
