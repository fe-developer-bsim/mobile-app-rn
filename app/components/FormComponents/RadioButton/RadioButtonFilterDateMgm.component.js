import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import styles from './RadioButtonFilterDateMgm.styles';
import Touchable from '../../Touchable.component';
import noop from 'lodash/noop';

class RadioButton extends Component {

  static propTypes = {
    options: PropTypes.array,
    input: PropTypes.object,
    onPressRadioButton: PropTypes.func,
    warningText: PropTypes.string,
    renderContainer: PropTypes.object,
    renderRow: PropTypes.bool,
    renderFull: PropTypes.bool,
  }

  static defaultProps = {
    options: [],  // option = [{label: '', value: ''}, ...]
    input: {
      onChange: noop,
    }
  }

  setSelectedOption = (selectedOption, option) => option.label === this.props.input.value.label;

  renderOption = (option, selected, onSelect, index) => (
    <View>
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={[styles.optionStyle]}>
            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.label}>{option.label}</Text>
                <Text style={styles.subtextGreyStyle}>{option.sublabel}</Text>
              </View>
            </View>
            <View style={styles.optionContainer}>
              <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
            </View>
          </View>
        </View>
      </Touchable>
      <View style={styles.greyLine}/>
    </View>
  )

  renderContainer = (optionNodes) => <View style={styles.renderContainer}>{optionNodes}</View>

  render () {
    const {options, input} = this.props;
    return (
      <RadioButtons
        options={options}
        onSelection={input.onChange}
        selectedOption={input.value}
        renderOption={this.renderOption}
        renderContainer={this.renderContainer}
        testOptionEqual={this.setSelectedOption}
      />
    );
  }
}

export default RadioButton;
