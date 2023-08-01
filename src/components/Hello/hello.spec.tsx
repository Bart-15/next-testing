import React from 'react';
import { render } from '@testing-library/react';
import { Hello } from './index';

it("Renders succesfully", () => {
    render(<Hello />)
})