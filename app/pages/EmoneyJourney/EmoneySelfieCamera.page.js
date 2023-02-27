import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EmoneySelfieCameraComp from '../../components/EmoneyJourney/EmoneySelfieCamera.component';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {generatePhotoSelfie} from '../../state/thunks/emoney.thunks';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'CameraSelfieForm'
};

const ConnectedForm = reduxForm(formConfig)(EmoneySelfieCameraComp);

class EmoneySelfieCamera extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setImage: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
  }

  componentDidMount () {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);
    this.props.showSpinner();
    setTimeout(() => {
      this.props.hideSpinner();
    }, 3000);

    // if (firebaseEmoney === true) {
    //   const os = Platform.OS;
    //   Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '6'});
    // }
  }


  render () {
    const {setImage} = this.props;
    return (
      <ConnectedForm
        setImage={setImage}
        camera={this.camera}
        takePicture={this.takePicture}/>
    );
  }
}

const mapStateToProps = (state) => ({
  image: result(state, 'form.CameraSelfieForm.value.imageData', {})
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    const nextFunction = () => dispatch(generatePhotoSelfie(data));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'EmoneyImageConfirmation', params: {data: data.base64, code: data.pictureOrientation, nextFunction, route: 'EmoneySelfieCamera'}}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmoneySelfieCamera);