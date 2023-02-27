import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';
import Overlay from '../../Overlay/Overlay.component';
import Touchable from '../../Touchable.component';
import styles from './Picker.component.styles.android';
import SimasIcon from '../../../assets/fonts/SimasIcon';
import {noop} from 'lodash';


class Picker extends Component {

  optionSelected = (option) => () => {
    const {onSelectPress = noop} = this.props;
    this.props.onSelect(option);
    this.props.hideModal();
    onSelectPress();
  }

  renderItem = ({item}) => (
    <Touchable onPress={this.optionSelected(item)}>
      <Text style={styles.modalFontStyle}>{item}</Text>
    </Touchable>
  )

  render () {
    const {options = [], selectedValue, showModal, hideModal, modalVisible, arrowPickerStyle = {}, textPickerStyle = {}, disabled = false} = this.props;
    return  (
      <View>
        <Touchable onPress={showModal} style={styles.textBoxStyle} disabled={disabled}>
          <Text style={disabled ? [styles.textStyleDisabled, textPickerStyle] : [styles.textStyle, textPickerStyle]}>{selectedValue}</Text>
          <SimasIcon name={'arrow'} size={styles.arrowSize} style={[styles.arrowDownStyle, (disabled) ? styles.disabled : {}, arrowPickerStyle]} />
        </Touchable>
        <Overlay visible={modalVisible} hideModal={hideModal} closeOnTouchOutside>
          <FlatList
            style={styles.modalContainer}
            data={options}
            renderItem={this.renderItem}
          />
        </Overlay>
      </View>);
  }

}

Picker.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool,
  arrowPickerStyle: PropTypes.object,
  textPickerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onSelectPress: PropTypes.func,
};

export default Picker;
