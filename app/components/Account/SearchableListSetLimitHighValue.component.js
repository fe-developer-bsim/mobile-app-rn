import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {SinarmasInput} from '../FormComponents';
import QuickPickList from '../QuickPickList/QuickPickListSetLimit.component';
import styles from '../SearcheableList/SearchableListSetLimit.styles';
import {filterObjects, upperCase} from '../../utils/transformer.util';
import noop from 'lodash/noop';
import NButton from '../SearcheableList/NButton.component';
import ErrorTextIndicator from '../ErrorTextIndicator/ErrorTextIndicator.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimasIcon from '../../assets/fonts/SimasIcon';

class SearcheableListSIL extends Component {
  static propTypes = {
    searchlist: PropTypes.array,
    textKey: PropTypes.string,
    subtextKey: PropTypes.string,
    secondaryText: PropTypes.string,
    inputHeader: PropTypes.string,
    minLength: PropTypes.number,
    inputProps: PropTypes.object,
    onNextClick: PropTypes.func,
    onItemClick: PropTypes.func,
    onChangeText: PropTypes.func,
    validator: PropTypes.func,
    flag: PropTypes.string,        
    creditAccountList: PropTypes.array
  }
  state = {
    searchlist: [],
    searchText: ''
  }
  onChangeInput = (text, subtext) => {
    const {onChangeText = noop, validator = noop} = this.props;
    onChangeText(text, subtext);
    const error = validator(text, subtext);
    this.setState({
      searchText: text, 
      subtext,
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
    const {textKey = 'text', subtextKey = 'subtext', secondaryText = 'secondaryText', inputHeader = 'SAMPLE INPUT HEADER', onItemClick = noop, onNextClick, minLength = 6, inputProps = {}} = this.props;
    const nextEnabled = (this.state.searchText.length >= minLength) && !this.state.error;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container} extraHeight={120}>
        <View style={styles.boxedInfo}>
          <View style={onNextClick ? styles.input : styles.inputWithPaddingHorizontal}>
            <SinarmasInput
              {...inputProps}
              label={inputHeader}
              onChangeText={this.onChangeInput}
              disabled={false}
              format={upperCase}
              value={this.state.searchText}
            />
          </View>
          {onNextClick && <NButton style={styles.NButton} enabled={nextEnabled} onPress={this.onNextClick}/>}
          <SimasIcon name={'search'} size={20} style={styles.burger}/>         
        </View>
        {this.state.error && <ErrorTextIndicator style={styles.ErrorTextIndicator} text={this.state.error} subtext={this.state.error}/>}
        <QuickPickList listOfItems={filterObjects(this.state.searchlist, this.state.searchText)} textKey={textKey} subtextKey={subtextKey} secondaryTextKey={secondaryText} onSelect={onItemClick}/>
      </KeyboardAwareScrollView>
    );
  }
}

export default SearcheableListSIL;