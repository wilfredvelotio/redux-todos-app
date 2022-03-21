import React, { useEffect } from 'react';
import styles from './Loading.module.scss';
const Loading: React.FC = () => {
  return (
    <>
      <div className={styles.kmi}>
        <div className={styles.lo}>
          <div className={styles.loader}>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loading;