import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ConfirmEditProfileSelfieCamera from '../../components/Account/ConfirmEditProfileSelfieCamera.component';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {checkSelfiePD} from '../../state/thunks/digitalAccountOpening.thunks';

const formConfig = {
  form: 'CameraSelfieForm'
};

const ConnectedForm = reduxForm(formConfig)(ConfirmEditProfileSelfieCamera);

class ConfirmEditProfileSelfieCameraPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    setImage: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func
  }

  componentDidMount () {
    this.props.showSpinner();
    setTimeout(() => {
      this.props.hideSpinner();
    }, 3000);
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
    const nextFunction = () => dispatch(checkSelfiePD(data));  
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'ConfirmImageEditProfile', params: {data: data.base64, code: data.pictureOrientation, nextFunction, route: 'ConfirmEditProfileSelfieCamera'}}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEditProfileSelfieCameraPage);