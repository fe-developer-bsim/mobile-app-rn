import * as genericBiller from '../genericBiller.util';
import {NavigationActions} from 'react-navigation';

describe('generic biller utils', () => {
  NavigationActions.navigate = jest.fn();
  it('case type 1', () => {
    const biller = {billerPreferences: {billerType: '1'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 2', () => {
    const biller = {billerPreferences: {billerType: '2'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 3', () => {
    const biller = {billerPreferences: {billerType: '3'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 6 isSubscriber true', () => {
    const biller = {billerPreferences: {billerType: '6', isSubscriber: true}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 6', () => {
    const biller = {billerPreferences: {billerType: '6'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 7', () => {
    const biller = {billerPreferences: {billerType: '7'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 8', () => {
    const biller = {billerPreferences: {billerType: '8'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 9', () => {
    const biller = {billerPreferences: {billerType: '9'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
  it('case type 10', () => {
    const biller = {billerPreferences: {billerType: '10'}};
    genericBiller.genericBillerNavigate(jest.fn(), biller);
    expect(NavigationActions.navigate).toBeCalled();
  });
});
