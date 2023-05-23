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
    },
  };
};
//форма для ввода данных карты, имя/фамилия, карты(банковская) чтоб только числа, определение какая именно карта
//что знаешь про хеш-таблицу, колизии(какие виды), что похоже на хэш из js что под капотом
//в классическом массиве хранятся последовательно или нет? а в js как
//aфункция для обхода массива с помощью рекурсии без for foreach
//solid на примере dependecy inver
//какую проблему реашет каждый из паттернов команда/наблюдатель
//как изменить вид div через js наблюдатель паттерн intersectionobserver бесконеная лента
//observers в объекте
//прокси объект

//react-lazy

//много кнопок подряд 1 2 3 4 выводят в консоль, куда повесить обработик
//что делает super
//контекст потерялся
