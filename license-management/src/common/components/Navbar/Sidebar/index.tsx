import styles from './index.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import Analytics from '@mui/icons-material/QueryStats';
import Expired from '@mui/icons-material/RunningWithErrorsOutlined';
import ExpiringSoon from '@mui/icons-material/AccessAlarmOutlined';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';

function Sidebar() {

    //position of tooltip
    const position = "right";

    return (
        <div className={styles.navigation}>
            <div>

                {/* home page */}
                <Tooltip title='Home' placement={position}>
                    <NavLink to='/home' className={styles.navigationLink}>
                        <div className={styles.navigationElement}>
                            <button className={styles.navigationElementIcon}>
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
                            <button className={styles.navigationElementIcon}>
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
                            <button className={styles.navigationElementIcon}>
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
                            <button className={styles.navigationElementIcon}>
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