
import loading from '../icons/icons8-loading-50.png';
import styles from './Loading.module.css';

const Loading = ({ uploading }) => {

    let t = 'Loading, please wait...';

    if(uploading) {
        t = 'Uploading!  This may take some time...';
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.text}>{t}</h2>
            <img src={loading} className={styles.rotate} alt='loading...' />
        </div>
    )
}

export default Loading;