import {
  AUTO_COMPLETE_CLEAR,
  AUTO_COMPLETE_FETCH,
  AUTO_COMPLETE_LOADING,
  AUTO_COMPLETE_SUCCESS,
  autoComplete,
  autoCompleteClear,
  autoCompleteLoading,
  autoCompleteSuccess,
  SEARCH_FETCH,
  SEARCH_SUCCESS,
  searchGenes,
  searchGenesSuccess,
} from './search';

describe('search', () => {
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

  describe('autoCompleteSuccess', () => {
    it('should return object with suggestedGenes and type AUTO_COMPLETE_SUCCESS', () => {
      const suggestedGenes = ['gene1', 'gen2', 'gene3'];

      const result = autoCompleteSuccess(suggestedGenes);

      expect(result.payload).toBe(suggestedGenes);
      expect(result.type).toBe(AUTO_COMPLETE_SUCCESS);
    });
  });

  describe('autoCompleteClear', () => {
    it('should return object with type AUTO_COMPLETE_CLEAR', () => {
      const result = autoCompleteClear();

      expect(result.type).toBe(AUTO_COMPLETE_CLEAR);
    });
  });

  describe('searchGenes', () => {
    it('should return object with searchTerm and type SEARCH_FETCH', () => {
      const searchTerm = 'test';

      const result = searchGenes(searchTerm);

      expect(result.payload).toBe(searchTerm);
      expect(result.type).toBe(SEARCH_FETCH);
    });
  });

  describe('searchGenesSuccess', () => {
    it('should return object with genes and type SEARCH_SUCCESS', () => {
      const genes = [{ gene: 'gene1' }, { gene: 'gene2' }];

      const result = searchGenesSuccess(genes);

      expect(result.payload).toBe(genes);
      expect(result.type).toBe(SEARCH_SUCCESS);
    });
  });
});
