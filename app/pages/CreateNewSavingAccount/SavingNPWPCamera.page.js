import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CameraView from '../../components/CreateNewSavingAccount/SavingNPWPCamera.component';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {generatePhotoNPWP} from '../../state/thunks/savingAccount.thunks';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'CameraNPWPForm'
};

const ConnectedForm = reduxForm(formConfig)(CameraView);

class CameraPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    transRefNum: PropTypes.string,
    setImage: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
  }
  static defaultProps = {
    image: ''
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
  image: result(state, 'form.CameraNPWPForm.value.image', '')
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    const nextFunction = () => dispatch(generatePhotoNPWP(data));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'SavingImageConfirmation', params: {data: data.base64, code: data.pictureOrientation, nextFunction, route: 'SavingNPWPCamera'}}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
