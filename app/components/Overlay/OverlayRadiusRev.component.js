import React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import styles from './OverlayRadiusRev.styles';
import noop from 'lodash/noop';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Overlay extends React.Component {
  state = {
    visible: this.props.visible,
  };
  static propTypes = {
    children: PropTypes.node,
    animationType: PropTypes.string,
    visible: PropTypes.bool,
    closeOnTouchOutside: PropTypes.bool,
    onClose: PropTypes.func,
    innerContainerStyles: PropTypes.object,
    containerStyles: PropTypes.object,
    isKeyboardAwareView: PropTypes.bool,
    hideModal: PropTypes.func,
    bottomBool: PropTypes.bool,
    isCurrency: PropTypes.string,
    isPurpose: PropTypes.string
  }
  static defaultProps = {
    children: null,
    animationType: 'fadeIn',
    visible: false,
    closeOnTouchOutside: false,
    onClose: noop
  }
  componentWillReceiveProps (newProps) {
    if (this.state.visible !== newProps.visible) {
      this.setState({visible: newProps.visible});
    }
  }

  _hideModal = () => {
    const {onClose = noop, hideModal = noop} = this.props;
    this.setState({visible: false}, () => {
      onClose();
      hideModal();
    });
  }

  _stopPropagation = (e) => e.stopPropagation()

  render () {
    const {animationType, closeOnTouchOutside, children, innerContainerStyles = {}, containerStyles = {}, isKeyboardAwareView = false, isCurrency, isPurpose} = this.props;
    const Wrapper = isKeyboardAwareView ? KeyboardAwareScrollView : View;
    return (
      <Modal
        animationIn={animationType}
        animationOut='fadeOut'
        transparent
        backdropColor='transparent'
        isVisible={this.state.visible}
        onModalHide={this._hideModal}
        style={styles.modalStyle}
        hideOnBack={closeOnTouchOutside}>
        <Wrapper scrollEnabled={false} keyboardShouldPersistTaps='handled' style={styles.wrapperContainer} contentContainerStyle={styles.contentContainerStyle} extraHeight={120} >
          <TouchableWithoutFeedback onPress={closeOnTouchOutside ? this._hideModal : null}>
            <View style={[styles.container, containerStyles]}>
              <View style={[styles.innerContainerTitle, innerContainerStyles]}>
                <Text style={styles.hidderPicker}>{isCurrency}{isPurpose}</Text>
              </View>
              <TouchableWithoutFeedback onPress={this._stopPropagation}>
                <View style={[styles.innerContainer, innerContainerStyles]}>
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Wrapper>
      </Modal>
    );
  }
}

export default Overlay;
