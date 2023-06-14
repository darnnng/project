import { useTranslation } from 'react-i18next';
import poster from '@src/pages/HomePage/assets/poster.jpg';
import { CategoryMenu } from '@src/widgets/CategoryMenu';
import { ImageCards } from '@src/widgets/ImageCards';
import { useCategoriesList } from '@widgets/CategoryMenu/model/useCategories';
import { useImageCards } from '@widgets/ImageCards/model/useImageCards';
import { Spinner } from '@src/shared/ui/Spinner';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { t } = useTranslation('home');
  const { categoriesLoading } = useCategoriesList();
  const { isLoading } = useImageCards();
  console.log(process.env.DATABASEID);
  return (
    <>
      {categoriesLoading && isLoading ? (
        <Spinner />
      ) : (
        <>
          <CategoryMenu />
          <img className={styles.imagePoster} src={poster} alt="poster" />
          <div className={styles.catalogContainer}>
            <div className={styles.title}>{t('trending')}</div>
            <ImageCards />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
