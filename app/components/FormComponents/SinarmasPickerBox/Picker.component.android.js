import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';
import Overlay from '../../Overlay/Overlay.component';
import Touchable from '../../Touchable.component';
import styles from './Picker.component.styles.android';
import SimasIcon from '../../../assets/fonts/SimasIcon';


class Picker extends Component {

  optionSelected = (option) => () => {
    this.props.onSelect(option);
    this.props.hideModal();
  }

  renderItem = ({item}) => (
    <Touchable onPress={this.optionSelected(item)}>
      <Text style={styles.modalFontStyle}>{item}</Text>
    </Touchable>
  )

  renderItemRevamp = ({item}) => (
    <Touchable onPress={this.optionSelected(item.schmeId)}>
      <View style={styles.summaryArea}/>
      <Text style={styles.modalFontStyleRe}>{item.term}</Text>
    </Touchable>
  )

  render () {
    const {options = [], selectedValue, showModal, hideModal, modalVisible, arrowPickerStyle = {}, textPickerStyle = {}, isRevamp = false, labelText, selectedValueName} = this.props;
    return  (
      <View>
        <Touchable onPress={showModal} style={styles.textBoxStyle}>
          <Text style={[styles.textStyle, textPickerStyle]}>{isRevamp ? selectedValueName : selectedValue}</Text>
          <SimasIcon name='arrow' style={[styles.arrowDownStyle, arrowPickerStyle]} />
        </Touchable>
        <Overlay visible={modalVisible} hideModal={hideModal} closeOnTouchOutside stylesSet={isRevamp}>
          {isRevamp ?
            <View style={styles.tittleCont}>
              <Text style={styles.tittle}>{labelText}</Text>
            </View>
            : null }
          <FlatList
            style={styles.modalContainer}
            data={options}
            renderItem={isRevamp ? this.renderItemRevamp : this.renderItem}
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
  isRevamp: PropTypes.bool,
  labelText: PropTypes.string,
  selectedValueName: PropTypes.string
};

export default Picker;
