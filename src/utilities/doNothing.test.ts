import doNothing from './doNothing';

describe('doNothing', () => {
    it('should be defined', () => {
        expect(doNothing).toBeDefined();
    });

    it('should not throw any errors when called', () => {
        expect(() => doNothing()).not.toThrow();
    });

    it('should return undefined when called', () => {
        const result = doNothing();

        expect(result).toBeUndefined();
    });
});