import resetState from '../../../../../testUtils/resetState';
import * as state from '../../../state';
import { KEY_CANCELED } from '../../../state/constants';
import VestTest from '../VestTest';
import { setCanceled, removeCanceled } from '.';

const genTests = () =>
  Array.from(
    { length: 5 },
    (_, i) =>
      new VestTest({
        fieldName: `field_${i}`,
        statement: 'msg',
        suite_id: 'suite_id',
        testFn: jest.fn(),
      })
  );

let tests;

describe('module: canceled', () => {
  beforeEach(() => {
    resetState();
    tests = genTests();
  });

  describe('setCanceled', () => {
    it('Should add all passed ids to canceled object', () => {
      const ids = tests.map(({ id }) => id);
      expect(Object.keys(state.get()[KEY_CANCELED])).not.toEqual(
        expect.arrayContaining(ids)
      );
      setCanceled(...tests);
      expect(Object.keys(state.get()[KEY_CANCELED])).toEqual(
        expect.arrayContaining(ids)
      );
    });
  });

  describe('removeCanceled', () => {
    beforeEach(() => {
      setCanceled(...tests);
    });

    it('Should remove canceled test', () => {
      expect(state.get()[KEY_CANCELED]).toHaveProperty(tests[0].id);
      removeCanceled(tests[0]);
      expect(state.get()[KEY_CANCELED]).not.toHaveProperty(tests[0].id);
    });
  });
});
