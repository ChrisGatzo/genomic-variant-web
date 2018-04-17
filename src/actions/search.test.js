import {
  AUTO_COMPLETE_FETCH,
  AUTO_COMPLETE_LOADING,
  autoComplete,
  autoCompleteLoading,
} from './search';

describe('autoComplete', () => {
  it('should return object with searchTerm and type AUTO_COMPLETE_FETCH', () => {
    const searchTerm = 'test';

    const result = autoComplete(searchTerm);

    expect(result.payload).toBe(searchTerm);
    expect(result.type).toBe(AUTO_COMPLETE_FETCH);
  });
});

describe('autoCompleteLoading', () => {
  it('should return object with isLoading status and type AUTO_COMPLETE_FETCH', () => {
    const isLoading = true;

    const result = autoCompleteLoading(isLoading);

    expect(result.payload).toBe(isLoading);
    expect(result.type).toBe(AUTO_COMPLETE_LOADING);
  });
});
