import { render, screen } from '@testing-library/react';
import  Example5 from './index';



jest.mock('../../VeryComplex/DeepFolder/DeeperFolder/VeryComplex');

describe("Example 5", () => {
    test("It rendes very complex component", () => {
        render(<Example5 />);
        expect(screen.getByText('SIMPLE VERSION')).toBeInTheDocument();
    })
})