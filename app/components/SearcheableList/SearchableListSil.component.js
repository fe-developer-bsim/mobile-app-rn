import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {SinarmasInput} from '../../components/FormComponents';
import QuickPickList from '../../components/QuickPickList/QuickPickList.component';
import styles from './SearcheableList.style';
import {filterObjects, upperCase} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import NButton from './NButton.component';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SearcheableListSIL extends Component {
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
    flag: PropTypes.string,
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
  onNextClick = () => {
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
    const {textKey = 'text', subtextKey = 'subtext', secondaryText = 'secondaryText', listHeader = 'SAMPLE HEADER', inputHeader = 'SAMPLE INPUT HEADER', placeholderText = '', onItemClick = noop, onNextClick, minLength = 6, inputProps = {}} = this.props;
    const nextEnabled = (this.state.searchText.length >= minLength) && !this.state.error;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View style={styles.inputContainer}>
          <View style={onNextClick ? styles.input : styles.inputWithPaddingHorizontal}>
            <SinarmasInput
              {...inputProps}
              label={inputHeader}
              onChangeText={this.onChangeInput}
              disabled={false}
              placeholder={placeholderText}
              format={upperCase}
              value={this.state.searchText}

            />
          </View>
          {onNextClick && <NButton style={styles.NButton} enabled={nextEnabled} onPress={this.onNextClick}/>}
        </View>
        {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error}/>}
        <Text style={styles.listHeader}>{listHeader} </Text>
        <QuickPickList listOfItems={filterObjects(this.state.searchlist, this.state.searchText)} textKey={textKey} subtextKey={subtextKey} secondaryTextKey={secondaryText} onSelect={onItemClick}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default SearcheableListSIL;