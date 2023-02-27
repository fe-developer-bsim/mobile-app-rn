import React from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback, View} from 'react-native';
import Modal from 'react-native-modal';
import styles from './Overlay.styles';
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
    stylesSet: PropTypes.bool,
    isBankAcc: PropTypes.bool,
    isSplitBillModal: PropTypes.bool,
    isReferMgm: PropTypes.bool,
    isMedalion: PropTypes.bool,
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
    const {animationType, closeOnTouchOutside, children, innerContainerStyles = {}, containerStyles = {}, stylesSet, isKeyboardAwareView = false, isBankAcc, isSplitBillModal, isReferMgm, isMedalion} = this.props;
    const Wrapper = isKeyboardAwareView ? KeyboardAwareScrollView : View;
    const stylesSetBool = stylesSet ? styles.innerContainerRound : isSplitBillModal ? styles.innerContainerSplitBill : isReferMgm ? styles.innerContainerReferMgm : isMedalion ? styles.innerContainerRoundMedalion : styles.innerContainer;
    const styleBankAcc = isBankAcc ? styles.innerContainerTransparent : isSplitBillModal ? styles.innerContainerSplitBill : isReferMgm ? styles.innerContainerReferMgm : isMedalion ? styles.innerContainerRoundMedalion : styles.innerContainer;
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
              <TouchableWithoutFeedback onPress={this._stopPropagation}>
                <View style={[stylesSetBool, innerContainerStyles, styleBankAcc]}>
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
