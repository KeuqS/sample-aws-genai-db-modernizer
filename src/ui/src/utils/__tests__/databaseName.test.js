import { getDatabaseNameError } from '../databaseName';

describe('getDatabaseNameError', () => {
  it.each(['sales_db', 'sales-db', 'SalesDB1', 'a'.repeat(128)])(
    'accepts %p',
    (value) => {
      expect(getDatabaseNameError(value)).toBe('');
    },
  );

  it('trims surrounding whitespace before validating', () => {
    expect(getDatabaseNameError('  sales_db  ')).toBe('');
  });

  it.each(['', '   ', 'a'.repeat(129), 'sales db', 'sales.db', '../sales'])(
    'rejects %p',
    (value) => {
      expect(getDatabaseNameError(value)).not.toBe('');
    },
  );

  it('returns a stable message for missing names', () => {
    expect(getDatabaseNameError('')).toBe('Database name is required');
  });
});
