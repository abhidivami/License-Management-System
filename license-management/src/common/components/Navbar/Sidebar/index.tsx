import styles from './index.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import Analytics from '@mui/icons-material/QueryStats';
import Expired from '@mui/icons-material/RunningWithErrorsOutlined';
import ExpiringSoon from '@mui/icons-material/AccessAlarmOutlined';
import { NavLink, useMatch } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function Sidebar() {

    //position of tooltip
    const position = "right";

    //to highlight current page option in sidebar
    const home = useMatch('/');
    const analytics = useMatch('/analytics');
    const expired = useMatch('/expired');
    const expiring = useMatch('/expiring');

    return (
        <div className={styles.navigation}>
            <div>
                {/* home page */}
                <Tooltip title='Home' placement={position}>
                    <NavLink to='/' className={styles.navigationLink}>
                        <div className={styles.navigationElement}>
                            <button className={home==null ? styles.navigationElementIcon : `${styles.navigationElementIcon} ${styles.active}`}>
                                <HomeIcon />
                            </button>
                            <span className={styles.navigationElementTitle}>Home</span>
                        </div>
                    </NavLink>
                </Tooltip>

                {/* analytics page */}
                <Tooltip title='Analytics' placement={position}>
                    <NavLink to='/analytics' className={styles.navigationLink}>
                        <div className={styles.navigationElement}>
                            <button className={analytics==null ? styles.navigationElementIcon : `${styles.navigationElementIcon} ${styles.active}`}>
                                <Analytics />
                            </button>
                            <span className={styles.navigationElementTitle}>Analytics</span>
                        </div>
                    </NavLink>
                </Tooltip>

                {/* expired page */}
                <Tooltip title='Expired' placement={position}>
                    <NavLink to='/expired' className={styles.navigationLink}>
                        <div className={styles.navigationElement}>
                            <button className={expired==null ? styles.navigationElementIcon : `${styles.navigationElementIcon} ${styles.active}`}>
                                <Expired />
                            </button>
                            <span className={styles.navigationElementTitle}>Expired</span>
                        </div>
                    </NavLink>
                </Tooltip>

                {/* expiring soon page */}
                <Tooltip title='Expiring soon' placement={position}>
                    <NavLink to='/expiring' className={styles.navigationLink}>
                        <div className={styles.navigationElement}>
                            <button className={expiring==null ? styles.navigationElementIcon : `${styles.navigationElementIcon} ${styles.active}`}>
                                <ExpiringSoon />
                            </button>
                            <span className={styles.navigationElementTitle}>Expiring Soon</span>
                        </div>
                    </NavLink>
                </Tooltip>
            </div>
        </div>
    )
}

export default Sidebar;