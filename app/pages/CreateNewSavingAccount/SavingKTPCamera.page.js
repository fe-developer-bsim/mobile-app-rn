import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CameraView from '../../components/CreateNewSavingAccount/SavingKTPCamera.component';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {generatePhotoKTP} from '../../state/thunks/savingAccount.thunks';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {NavigationActions} from 'react-navigation';
import {saveNewOnboarding} from '../../state/actions/index.actions';

const formConfig = {
  form: 'CameraKTPForm'
};

const ConnectedForm = reduxForm(formConfig)(CameraView);

class CameraPage extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    transRefNum: PropTypes.string,
    setImage: PropTypes.func,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    clearOnboardingFlag: PropTypes.func,
    isNewOnboarding: PropTypes.string
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

  componentWillMount () {
    const {isNewOnboarding, clearOnboardingFlag} = this.props;
    if (isNewOnboarding === 'yes') {
      clearOnboardingFlag();
    }
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
  image: result(state, 'form.CameraKTPForm.value.image', ''),
  openAccountData: result(state, 'openAccountData', {}),
  isNewOnboarding: result(state, 'newOnboarding', ''),
});

const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    const nextFunction = () => dispatch(generatePhotoKTP(data));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'SavingImageConfirmation', params: {data: data.base64, code: data.pictureOrientation, nextFunction, route: 'SavingKTPCamera'}}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  clearOnboardingFlag: () => dispatch(saveNewOnboarding('no'))
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
