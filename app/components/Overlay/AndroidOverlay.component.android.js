import React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './AndroidOverlay.styles.android';
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
    isKeyboardAwareView: PropTypes.bool
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
    this.setState({visible: false}, () => {
      this.props.onClose();
    });
  }

  _stopPropagation = (e) => e.stopPropagation()

  render () {
    const {animationType, closeOnTouchOutside, children, innerContainerStyles, containerStyles, isKeyboardAwareView = false} = this.props;
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
          <TouchableWithoutFeedback>
            <View style={[styles.container, containerStyles]}>
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
