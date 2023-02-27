import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CameraView from '../../components/Camera/Camera.component';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {detectLiveFace} from '../../state/thunks/faceRecognition.thunks';
import {hideSpinner} from '../../state/actions/index.actions.js';

const formConfig = {
  form: 'CameraForm',
  onSubmit: (values, dispatch, {action, isLockedDevice, params}) => {
    const image = result(values, 'imageData.base64', '');
    const orientationCode = result(values, 'imageData.pictureOrientation', '');
    const data = {image, orientationCode, params, isLockedDevice, action};
    dispatch(detectLiveFace(data));
  }
};

const ConnectedForm = reduxForm(formConfig)(CameraView);

class CameraPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    transRefNum: PropTypes.string,
    userId: PropTypes.number,
    resendBillPayOTP: PropTypes.func,
    setImage: PropTypes.func,
    sendOtp: PropTypes.func,
    hideSpinner: PropTypes.func,
  }
  static defaultProps = {
    image: ''
  }

  componentDidMount () {
    this.props.hideSpinner();
  }

  render () {
    const {setImage, navigation} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const isLockedDevice = result(navigation, 'state.params.isLockedDevice', false);
    return (
      <ConnectedForm
        setImage={setImage}
        camera={this.camera}
        takePicture={this.takePicture}
        isLockedDevice={isLockedDevice}
        {...navParams}/>
    );
  }
}

const mapStateToProps = (state) => ({
  image: result(state, 'form.CameraForm.value.image', '')
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    dispatch(change('CameraForm', 'imageData', data));
  },
  hideSpinner: () => dispatch(hideSpinner())
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
