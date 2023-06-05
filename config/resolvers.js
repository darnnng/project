import path, { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const setResolvers = () => {
  return {
    symlinks: false,
    extensions: ['.ts', '.tsx', '.js', '.scss', '.json'],
    alias: {
      '@src': _resolve(dirname, './../src/'),
      '@pages': _resolve(dirname, './../src/pages/'),
      '@widgets': _resolve(dirname, './../src/widgets/'),
      '@features': _resolve(dirname, './../src/features/'),
      '@entities': _resolve(dirname, './../src/entities/'),
      '@shared': _resolve(dirname, './../src/shared/'),
      '@public': _resolve(dirname, './../public'),
      'node-fetch': 'node-fetch/lib/index.js',
    },
  };
};
