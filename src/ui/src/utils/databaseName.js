const DATABASE_NAME_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

export function getDatabaseNameError(value) {
  const normalized = typeof value === 'string' ? value.trim() : '';

  if (!normalized) {
    return 'Database name is required';
  }

  if (!DATABASE_NAME_PATTERN.test(normalized)) {
    return 'Database name must contain only letters, digits, underscores, or hyphens (up to 128 characters)';
  }

  return '';
}
