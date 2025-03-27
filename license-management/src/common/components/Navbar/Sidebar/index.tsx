import styles from './index.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import Analytics from '@mui/icons-material/QueryStats';
import Expired from '@mui/icons-material/RunningWithErrorsOutlined';
import ExpiredSoon from '@mui/icons-material/AccessAlarmOutlined';
import { NavLink } from 'react-router-dom';

function Sidebar() {

    return (
        <div className={styles.navigation}>
            <div>
                <NavLink to='/home'>
                <div className={styles.navigationElement}>
                    <button className={styles.navigationElementIcon}>
                        <HomeIcon />
                    </button>
                    <span className={styles.navigationElementTitle}>Home</span>
                </div>
                </NavLink>
                <div className={styles.navigationElement}>
                    <button className={styles.navigationElementIcon}>
                        <Analytics />
                    </button>
                    <span className={styles.navigationElementTitle}>Analytics</span>
                </div>
                <div className={styles.navigationElement}>
                    <button className={styles.navigationElementIcon}>
                        <Expired />
                    </button>
                    <span className={styles.navigationElementTitle}>Expired</span>
                </div>
                <div className={styles.navigationElement}>
                    <button className={styles.navigationElementIcon}>
                        <ExpiredSoon />
                    </button>
                    <span className={styles.navigationElementTitle}>Expiring Soon</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar