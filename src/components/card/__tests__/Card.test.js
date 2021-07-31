import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import CardList from "../card.jsx";

/**
 * @jest-environment jsdom
 */
describe('This will test MyComponent', () => {
    test('renders message', () => {
        const list = [{id:"1",title:"test title" , subTitle:"last seen",content:"this is the content"}];
       const { getByText } = render(<CardList cards = {list}/>)
        expect(getByText('test title')).toMatchInlineSnapshot(`
        <div class="title">
          Title
        </div>
      `);
  });
});