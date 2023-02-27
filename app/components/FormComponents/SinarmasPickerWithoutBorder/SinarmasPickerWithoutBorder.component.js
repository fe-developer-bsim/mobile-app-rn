import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Picker from './Picker.component';
import styles from './SinarmasPickerWithoutBorder.component.styles';
import map from 'lodash/map';
import {find, noop} from 'lodash';
import ErrorTextIndicator from '../../ErrorTextIndicator/ErrorTextIndicator.component';
import {language} from '../../../config/language';

class SinarmasPickerWithoutBorder extends Component {
  static propTypes = {
    meta: PropTypes.object,
    itemList: PropTypes.array,
    labelKey: PropTypes.string,
    placeholder: PropTypes.string,
    currentValue: PropTypes.string,
    input: PropTypes.object,
    pickerStyle: PropTypes.object,
    arrowPickerStyle: PropTypes.array,
    textPickerStyle: PropTypes.object,
    onValChange: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    itemList: [],
    input: {onChange: noop, value: {}},
    onValChange: noop
  }

  state = {
    modalVisible: false
  }

  showModal = () => this.setState({modalVisible: true})

  hideModal = () => this.setState({modalVisible: false})

  onPickerChange = (selectedLabelValue) => {
    const {labelKey, itemList, onValChange} = this.props;
    const selectedLabelObj = find(itemList, (listItem) => listItem[labelKey] === selectedLabelValue);
    this.props.input.onChange(selectedLabelObj || {});
    onValChange(selectedLabelObj);
  }

  render () {
    const {meta, itemList = [], input, placeholder, labelKey, currentValue, pickerStyle = {}, arrowPickerStyle = {}, textPickerStyle = {}, disabled = false} = this.props;
    const list = placeholder ? [{[labelKey]: placeholder}, ...itemList] : [...itemList];
    const valuesList = map(list, (item) => item[labelKey]);
    const err = (meta && !meta.pristine && meta.error);
    return (
      <View>
        <View style={[styles.container, pickerStyle]}>
          <Picker
            itemStyle={styles.iosPickerBackgroundColor}
            options={valuesList}
            confirmText={language.SINARMAS_PICKER__DONE}
            onSelect={this.onPickerChange}
            selectedValue={input.value[labelKey] || currentValue || list[0][labelKey]}
            showModal={this.showModal}
            hideModal={this.hideModal}
            modalVisible={this.state.modalVisible}
            arrowPickerStyle={[styles.arrowDownStyle, arrowPickerStyle]}
            textPickerStyle={textPickerStyle}
            disabled={disabled}
          />
        </View>
        {err && <ErrorTextIndicator text={err}/>}
      </View>
    );
  }
}

export default SinarmasPickerWithoutBorder;