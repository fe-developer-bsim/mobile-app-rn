import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Platform} from 'react-native';
import CameraView from '../../components/Camera/KTPPassportCamera.component';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {checkFlipImage} from '../../utils/transformer.util';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {triggerAuthNavigate, upgradeEmoneyKyc} from '../../state/thunks/common.thunks';
import {NavigationActions} from 'react-navigation';
import {generatePhotoKTP} from '../../state/thunks/emoney.thunks';

const formConfig = {
  form: 'CameraKTPPassportForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {action, isLockedDevice, signatureCust, setImage}) => {
    const base64 = result(values, 'imageData.base64', '');
    const currentPlatform = Platform.OS;
    const pictureOrientation = '0';
    const flipImage = checkFlipImage(result(values, 'imageData.pictureOrientation', ''), currentPlatform);
    const dataID = {base64, pictureOrientation, isLockedDevice, action, flipImage, signatureCust};
    dispatch(hideSpinner());
    const buttonFunc = setTimeout(() => {
      setImage(dataID);
    }, 100);
    dispatch(buttonFunc);
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
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    triggerAuth: PropTypes.func,
    upgradeKYC: PropTypes.func,
    idType: PropTypes.string,


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
    const {setImage, navigation, triggerAuth, upgradeKYC, idType} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const formData = result(navigation, 'state.params.values', {});
    const savingType = result(navigation, 'state.params.savingType', {});
    const dataCust = result(navigation, 'state.params.formData.data', {});
    const signatureCust = result(navigation, 'state.params.signature', '');
    const upgradeEmoney = result(navigation, 'state.params.emoneyUpgrade', false);
    return (
      <ConnectedForm
        setImage={setImage}
        camera={this.camera}
        takePicture={this.takePicture}
        formData={formData}
        savingType={savingType}
        dataCust={dataCust}
        signatureCust={signatureCust}
        upgradeEmoney={upgradeEmoney}
        triggerAuth={triggerAuth}
        upgradeKYC={upgradeKYC}
        idType={idType}
        {...navParams}/>
    );
  }
}

const mapStateToProps = (state) => ({
  image: result(state, 'form.CameraKTPPassportForm.value.image', ''),
  idType: result(state, 'form.UpgradeEmoneyForm.values.idType.value', ''),
});


const mapDispatchToProps = (dispatch) => ({
  setImage: (data) => {
    const nextFunction = () => dispatch(generatePhotoKTP(data));
    dispatch(change('CameraKTPPassportForm', 'imageData', data));
    dispatch(NavigationActions.back());
    dispatch(NavigationActions.navigate({routeName: 'EmoneyImageConfirmation', params: {data: data.base64, code: data.pictureOrientation, nextFunction, route: 'KTPPassportCameraPage'}}));
  },
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  upgradeKYC: (dataId) => {
    dispatch(upgradeEmoneyKyc(dataId));
  },
  triggerAuth: (billAmount, params) => {
    dispatch(triggerAuthNavigate('UpgradeEmoney', billAmount, false, 'AuthDashboard', params));
  },
  imageConfirmation: () => {
    // dispatch(Navi);
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage);
