// This file imports RN modules which might be used in pages/thunks where we should not import react-native modules
// such that in future if we plan to migrate to web, we only need to change in this file
import Toast from 'react-native-simple-toast';
import {Alert, Linking, Platform} from 'react-native';
import VersionNumber from 'react-native-version-number';
import SnackBar from 'react-native-snackbar-dialog';
import {wrapMethodInFunction} from './transformer.util';
import {theme} from '../styles/core.styles';

module.exports = {
  Toast,
  Alert,
  Linking,
  Platform,
  SnackBar: {
    show (title, {...args}) { // can be 'top', bottom by default
      SnackBar.dismiss(() => {
        title && SnackBar.show(title, {
          backgroundColor: theme.barBG,
          textColor: theme.contrast,
          buttonColor: theme.barButton,
          onConfirm: wrapMethodInFunction(SnackBar.dismiss),
          confirmText: 'CLOSE',
          // isStatic: true, // to make it visible forever
          duration: 12000,
          ...args
        });
      });
    },
    dismiss: SnackBar.dismiss
  },
  VersionNumber
};
