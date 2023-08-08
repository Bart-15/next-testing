import { renderHook, act, waitFor } from "@testing-library/react";
import { useToggle } from './useToggle';


describe('Use Toggle', () => {
    beforeEach(() => {
        renderHook(() => useToggle(false));
    })

    test('defaultValue =  false', () => {
        const { result } =  renderHook(() => useToggle(false));
        expect(result.current.value).toBe(false);
    });

    describe('Fire the toggle function',() => {
        
        test('value = false', () => {
            const { result } =  renderHook(() => useToggle(false));
            act(() => result.current.toggle());
    
            expect(result.current.value).toBe(true);
        });

        test('value = true', () => {
            const { result } =  renderHook(() => useToggle(true));

            act(() => result.current.toggle());
    
            expect(result.current.value).toBe(false);
        });
    });

    
})

