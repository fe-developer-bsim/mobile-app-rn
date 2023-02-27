import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Image} from 'react-native';
import QuickPickListQR from '../../components/QuickPickList/QuickPickListQR.component';
import styles from './SearcheableList.style';
import {filterObjects} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import NButton from './NButton.component';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import searchIcon from '../../assets/images/search.png';

class SearcheableList extends Component {
  static propTypes = {
    searchlist: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryText: PropTypes.string,
    labelSearch: PropTypes.string,
    listHeader: PropTypes.string,
    minLength: PropTypes.number,
    inputProps: PropTypes.object,
    onNextClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onChangeText: PropTypes.func,
    validator: PropTypes.func,
    placeholderSearch: PropTypes.string,
    checkedCity: PropTypes.object,
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
    const {textKey = 'text', subtextKey = 'subtext', secondaryText = 'secondaryText', labelSearch = '', placeholderSearch = '', onItemClick = noop, onNextClick, minLength = 6, inputProps = {}, checkedCity} = this.props;
    const nextEnabled = (this.state.searchText.length >= minLength) && !this.state.error;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View style={styles.inputContainerSrc}>
          <View style={onNextClick ? styles.input : styles.inputWithPadding}>
            <View style={styles.bgSearch}>
              <View style={styles.searchTxtInput}>
                <TextInput
                  style={styles.searchInput}
                  {...inputProps}
                  underlineColorAndroid={'transparent'}
                  label={labelSearch}
                  placeholder={placeholderSearch}
                  onChangeText={this.onChangeInput}
                  disabled={false}
                  onFocus={this.onFocusSearch}
                  onBlur={this.onBlurSearch}
                  onSubmitEditing={this.onBlurSearch}
                  value={this.state.searchText}
                  placeholderTextColor='#848484'
                />
              </View>
              <View style={styles.searchIcon}>
                <Image style={styles.imgSearch} source={searchIcon}/>
              </View>
            </View>
          </View>
          {onNextClick && <NButton style={styles.NButton} enabled={nextEnabled} onPress={this.onNextClick}/>}
        </View>
        {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error}/>}
        <QuickPickListQR listOfItems={filterObjects(this.state.searchlist, this.state.searchText)} textKey={textKey} subtextKey={subtextKey} secondaryTextKey={secondaryText} onSelect={onItemClick} checkedCity={checkedCity}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default SearcheableList;
