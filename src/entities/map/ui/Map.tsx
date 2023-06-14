import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@src/shared/ui/Spinner';
import { useCoordinates } from '../model/useCoordinates';
import styles from './Map.module.scss';

export const CitiesMap = () => {
  const { loading, coordinates } = useCoordinates();
  const { t } = useTranslation();

  return (
    <div className={styles.pageContainer}>
      {loading || !coordinates.length ? (
        <Spinner />
      ) : (
        <>
          <div>
            <h1 className={styles.pageTitle}>{t('ourstores')}</h1>
            <p className={styles.pageSmallTitle}>{t('map')}</p>
          </div>
          <YMaps>
            <div style={{ width: '100%', height: '400px' }}>
              <Map defaultState={{ center: coordinates[1], zoom: 3 }} width="100%" height="100%">
                {coordinates?.map((coordinate, index) => (
                  <Placemark key={index} geometry={coordinate} />
                ))}
              </Map>
            </div>
          </YMaps>
        </>
      )}
    </div>
  );
};

export default CitiesMap;
