import path, { join } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export const buildDevServer = () => {
  return {
    port: process.env.PORT,
    static: join(dirname, '../public'),
    hot: true,
    open: true,
    liveReload: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };
};
