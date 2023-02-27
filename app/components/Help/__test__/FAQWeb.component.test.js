import React from 'react';
import renderer from 'react-test-renderer';
import FAQWebComponent from '../FAQWeb.component';

jest.mock('../FAQWeb.component');
describe('Help : FAQ', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <FAQWebComponent navigateTo={jest.fn()} changeLanguage={jest.fn()}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
