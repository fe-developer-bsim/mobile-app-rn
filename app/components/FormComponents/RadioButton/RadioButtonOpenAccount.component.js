import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons';
import styles from './RadioButton.styles';
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
    labelBold: PropTypes.bool,
  }

  static defaultProps = {
    options: [],  // option = [{label: '', value: ''}, ...]
    input: {
      onChange: noop,
    }
  }

  setSelectedOption = (selectedOption, option) => option.label === this.props.input.value.label;

  renderOption = (option, selected, onSelect, index, labelBold = true) => (
    <View>
      <Touchable onPress={onSelect} key={index}>
        <View>
          <View style={styles.optionStyle}>
            <View style={styles.buttonStyle}>{selected && <View style={styles.buttonActive} />}</View>
            <View>
              <Text style={labelBold ? styles.labelBold : styles.label}>{option.label}</Text>
              <Text style={styles.subtextGreyStyle}>{option.sublabel}</Text>
            </View>
          </View>
        </View>
      </Touchable>
      <View style={styles.greyLine}/>
    </View>
  );

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
