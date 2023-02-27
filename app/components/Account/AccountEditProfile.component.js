import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image, Platform} from 'react-native';
import Touchable from '../../components/Touchable.component';
import ActionSheet from 'react-native-actionsheet';
import others from '../../assets/images/profileBG.png';
import styles from './AccountEditProfile.styles';
import SimasIcon from '../../assets/fonts/SimasIcon';
import {SinarmasButton} from '../FormComponents';
import {language} from '../../config/language';
import {isEmpty, result, find} from 'lodash';
import {Toast} from '../../utils/RNHelpers.util.js';
import ImagePicker from 'react-native-image-crop-picker';
import Permissions from 'react-native-permissions';

let PermissionsAndroid;

if (Platform.OS === 'android') {
  PermissionsAndroid = require('react-native').PermissionsAndroid;
}

class AccountEditProfile extends React.Component {
  static propTypes={
    profile: PropTypes.object,
    currentLanguage: PropTypes.string,
    choosePic: PropTypes.func,
    setImageData: PropTypes.func,
    profilePicture: PropTypes.object,
    delImageData: PropTypes.func,
    submitData: PropTypes.func, 
    currentSection: PropTypes.array,
    getChoosenPage: PropTypes.func,
    getConfirmFields: PropTypes.func,
  }

  toastDisabled = () => {
    Toast.show(language.PROGRESS__TOAST);
  }

  renderProducts = (item) => {
    const {currentLanguage, getChoosenPage} = this.props;
    const title = currentLanguage === 'id' ? item.titleID : item.titleEN;
    const isSubmit = result(item, 'isSubmit', false);
    const isDisabled = result(item, 'isDisabled', false);
    const iconName = isSubmit ? 'check' : 'emoney-history';
    const iconStyle = isSubmit ? 'iconSukses' : 'iconCat';
    const textStyle = isSubmit ? 'txtSukses' : 'txtCat';
    const baseCat = isSubmit ? 'btnSukses' : 'categories';

    return (
      <View style={styles.isiEditCat}>
        <Touchable onPress={getChoosenPage(item)} style={styles[`${baseCat}`]} disabled={isDisabled}>
          <SimasIcon style={styles[`${iconStyle}`]} name={iconName} size={25}/>
          <Text style={styles[`${textStyle}`]}>{title}</Text>
        </Touchable>
      </View>
    );
  }
  
  launchImagePicker = () => {
    const {setImageData} = this.props;
    ImagePicker.openCamera({
      compressImageQuality: 0.8,
      width: 500,
      height: 500,
      cropping: true,
      includeBase64: true,
      cropperToolbarTitle: 'Move and Scale',
      mediaType: 'photo',
      cropperActiveWidgetColor: '#ED1D25',
      cropperStatusBarColor: '#ED1D25',
      cropperToolbarColor: '#ED1D25',
      cropperCircleOverlay: true,
      useFrontCamera: true,
      showCropGuidelines: false
    }).then((image) => {
      setImageData({base64: image.data});
    });
  }

  // Launch Camera:
  takePhoto = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_CAMERA);
            } else {
              this.launchImagePicker();
            }
          });
        } else {
          this.launchImagePicker();
        }
      });
    } else {
      Permissions.check('ios.permission.CAMERA').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.CAMERA').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_CAMERA);
            } else {
              this.launchImagePicker();
            }
          });
        } else {
          this.launchImagePicker();
        }
      });
    }
  }

  openImagePicker = () => {
    const {setImageData} = this.props;
    ImagePicker.openPicker({
      compressImageQuality: 0.8,
      width: 500,
      height: 500,
      cropping: true,
      includeBase64: true,
      cropperToolbarTitle: 'Move and Scale',
      mediaType: 'photo',
      cropperActiveWidgetColor: '#ED1D25',
      cropperStatusBarColor: '#ED1D25',
      cropperToolbarColor: '#ED1D25',
      cropperCircleOverlay: true,
      useFrontCamera: true,
      showCropGuidelines: false
    }).then((image) => {
      setImageData({base64: image.data});
    });
  }


  // Open Image Library:
  choosePic = () => {

    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((response) => {
        if (!response) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((res) => { 
            if (res !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
            } else {
              this.openImagePicker();
            }
          });
        } else {
          this.openImagePicker();
        }
      });
    } else {
      Permissions.check('ios.permission.PHOTO_LIBRARY').then((response) => {
        if (response !== 'granted') {
          Permissions.request('ios.permission.PHOTO_LIBRARY').then((response) => {
            if (response !== 'granted') {
              Toast.show(language.ERROR_MESSAGE__PERMISSION_PHOTOS);
            } else {
              this.openImagePicker();
            }
          });
        } else {
          this.openImagePicker();
        }
      });
    }
  }

  deletePic = () => {
    const {delImageData} = this.props;
    delImageData();
  }

  actionSheets = (o) => {
    this.ActionSheet = o;
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  }

  handlePress = (buttonIndex) => {
    this.setState({
      selected: buttonIndex
    });
    if (buttonIndex === 1) {
      this.deletePic();
    } else if (buttonIndex === 2) {
      this.takePhoto();
    } else if (buttonIndex === 3) {
      this.choosePic();
    }
  }


  render () {
    const {currentLanguage, profile, profilePicture, currentSection, getConfirmFields} = this.props;
    const options = currentLanguage === 'id' ? [
      'Batal',
      'Hapus Foto Saat Ini',
      'Ambil Foto',
      'Pilih Dari Library',
    ] : [
      'Cancel',
      'Remove Current Photo',
      'Take Photo',
      'Choose from Library',
    ];
    const name = result(profile, 'name', '');
    const userName = result(profile, 'loginName', '');
    const cifUser = result(profile, 'customer.cifCode', '');
    const title = currentLanguage === 'id' ? 'Ganti Foto Profile' : 'Change Profile Photo';
    const picture = result(profilePicture, 'base64', '');
    const renderImage = `data:image/jpeg;base64,${picture}`;
    const genderDiv = others;
    const CANCEL_INDEX = 0;
    const DESTRUCTIVE_INDEX = 1;
    const disabledButton = isEmpty(find(currentSection, (curr) => curr.isSubmit === true));         
    const txtDisabled = disabledButton ? 'disabledTxt' : 'enabledTxt';
    
    return (
      <View>
        <View style={styles.wrapProfile}>
          <View style={styles.wrapPicture}>
            <View style={styles.shadowImage}>
              <Image source={picture === null || picture === '' ? genderDiv : {uri: renderImage}} style={styles.picture}/>
            </View>
            <Touchable onPress={this.showActionSheet} style={styles.button}>
              <SimasIcon name={'edit-amount'} size={15} style={[styles.editIcon]}/>
            </Touchable>
                    
            <ActionSheet
              ref={this.actionSheets}
              title={title}
              options={options}
              cancelButtonIndex={CANCEL_INDEX}
              destructiveButtonIndex={DESTRUCTIVE_INDEX}
              onPress={this.handlePress}
            />
          </View>

          <View style={styles.wrapNames}>
            <Text style={[styles.names, styles.roboto]}>{name}</Text>
            <Text style={[styles.subNames, styles.roboto]}>{userName}</Text>
            <Text style={[styles.subNames, styles.roboto]}>{cifUser}</Text>
          </View>
        </View>

        <View style={styles.editCategories}>
          {isEmpty(currentSection) ? null : currentSection.map(this.renderProducts)}      
        </View>

        <View style={styles.continueBtn}>
          <SinarmasButton onPress={getConfirmFields} style={styles.enabledBtn} disabledStyle={styles.disabledBtn} disabled={disabledButton}>
            <Text style={styles[`${txtDisabled}`]}>{language.GENERIC__CONTINUE}</Text>
          </SinarmasButton>
        </View>

      </View>
    );
  }
}

export default AccountEditProfile;