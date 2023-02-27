import faceRecognition from '../faceRecognition.reducer';
import {IS_USING_FACE_RECOG_UPDATE, CLEAR_USING_FACE_RECOG} from '../../actions/index.actions';

describe('Reducer: faceRecognition', () => {
  it('Should return default state by default', () => {
    const initialState =  false;
    expect(faceRecognition(undefined, {})).toEqual(initialState);
  });
  it('Should return default state', () => {
    const initialState =  false;
    const previousState = true;
    const action = {type: CLEAR_USING_FACE_RECOG};
    expect(faceRecognition(previousState, action)).toEqual(initialState);
  });
  it('Should update face recognition', () => {
    const previousState = false;
    const nextState = true;
    const action = {type: IS_USING_FACE_RECOG_UPDATE, payload: true};
    expect(faceRecognition(previousState, action)).toEqual(nextState);
  });
});
