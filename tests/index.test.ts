import doublet from '@/index';

describe('given a synchronous function', () => {
  describe('when the function succeeds', () => {
    test('then the first index of the tuple is null and the second is the result', () => {
      function thatWorks(...args) {
        return args;
      }

      const [error, result] = doublet(thatWorks, 'abc', 'def', 'ghi');

      expect(error).toBeNull();
      expect(result).toEqual(['abc', 'def', 'ghi']);
    });
  });

  describe('when the function throws', () => {
    test('then the first index of the tuple contains an error and the second is undefined', () => {
      function thatFails() {
        throw new Error('failed');
      }

      const [error, result] = doublet(thatFails);

      expect(error).toEqual(Error('failed'));
      expect(result).toBeUndefined();
    });
  });
});

describe('given an asynchronous function', () => {
  describe('when the function succeeds', () => {
    test('then the first index of the tuple is null and the second is the result', () => {
      async function thatWorks(...args) {
        const result = await Promise.resolve(args);
        return result;
      }

      expect(doublet(thatWorks, 'abc', 'def', 'ghi')).resolves.toStrictEqual([
        null, ['abc', 'def', 'ghi'],
      ]);
    });
  });

  describe('when the function throws', () => {
    test('then the first index of the tuple contains an error and the second is undefined', () => {
      async function thatFails() {
        const result = await Promise.reject(new Error('failed'));
        throw new Error(result);
      }

      expect(doublet(thatFails, 'abc', 'def', 'ghi')).resolves.toStrictEqual([
        Error('failed'),
      ]);
    });
  });
});

describe('given an function that returns a promise', () => {
  describe('when the function succeeds', () => {
    test('then the first index of the tuple is null and the second is the result', () => {
      function thatWorks(...args) {
        return Promise.resolve(args);
      }

      expect(doublet(thatWorks, 'abc', 'def', 'ghi')).resolves.toStrictEqual(
        [null, ['abc', 'def', 'ghi']],
      );
    });
  });

  describe('when the function throws', () => {
    test('then the first index of the tuple contains an error and the second is undefined', () => {
      function thatFails() {
        return Promise.reject(new Error('failed'));
      }

      expect(doublet(thatFails, 'abc', 'def', 'ghi')).resolves.toStrictEqual(
        [Error('failed')],
      );
    });
  });
});
