import errorHandler from '../errorHandler.util';
import {Alert} from 'react-native';

describe('error handler', () => {

  it('errorHandler: handles non fatal global js errors', () => {
    const isFatal = false;
    errorHandler({}, isFatal);
    expect(Alert.alert).not.toBeCalled();
  });

  it('errorHandler: handles fatal global js errors', () => {
    const isFatal = true;
    errorHandler({}, isFatal);
    expect(Alert.alert).toBeCalled();
  });

});
