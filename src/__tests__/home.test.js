import { render } from "@testing-library/react";
import React from "react";
import Home from '../containers/HomePage';
import renderer from 'react-test-renderer';

describe('Home page', () => {
   test('Shows buttons', () => {
       let {queryByText} = render(<Home />);

       expect(queryByText("2 Players")).toBeTruthy();
       expect(queryByText("3 Players")).toBeTruthy();
       expect(queryByText("4 Players")).toBeTruthy();

   });

   test('It matches snapshot', () => {
       const tree = renderer.create(<Home />).toJSON();

       expect(tree).toMatchSnapshot();
   })
});
