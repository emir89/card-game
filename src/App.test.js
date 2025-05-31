import React from 'react';
import { render, unmountComponentAtNode } from '@testing-library/react';
import App from './containers/App/App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    render(<App />, { container: div });
    unmountComponentAtNode(div);
    document.body.removeChild(div);
  });
});
