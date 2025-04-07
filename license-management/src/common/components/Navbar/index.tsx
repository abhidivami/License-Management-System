import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import LmsLogo from '../../../assets/lms_logo.jpg';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import CreateButton from './CreateButton';
import styles from './index.module.scss';
import SearchDialogBox from './SearchDialogBox';
import Profile from './Profile';
import DisplayNavigationBar from './MobileNavigation';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../../Redux/Slice/Search';
import { useLocation } from 'react-router-dom';

//to style entire search div
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

//to style search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#27548A',
}));

//to style input fields
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#27548A',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            width: '25ch',
        },
        [theme.breakpoints.up('md')]: {
            width: '35ch',
        },
        
        //to style input placeholder
        '&::placeholder': {
            color: "#27548A",
            fontWeight: "bold",
        },
    },
}));

function Navbar() {

    //to store search text field
    const [searchField, setSearchField] = React.useState<string>("");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const dispatch = useDispatch();

    const location = useLocation();
    React.useEffect(() => {
        setSearchField("");
        dispatch(setSearchText({search: ""}));
    },[location]);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    //storing search text
    const handleSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value);
        dispatch(setSearchText({search: event.target.value}));
    }

    // const goToDefaultValues = () => {
    //     setSearchField("");
    //     dispatch(setSearchText({search: ""}));
    // }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{ zIndex: 100 }}
        >
            <MenuItem>
                <div className={styles.create}>
                    <CreateButton />
                </div>
            </MenuItem>
            <MenuItem>
                <Notification iconColor="black" />
            </MenuItem>
            <MenuItem>
                <Profile iconColor="black" />
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div className={styles.header}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ bgcolor: "#27548A" }}>
                        <Toolbar>
                            {/* display for web and tablets */}
                            {/* <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ pt: 2, display: { xs: "none", md: "block" } }}
                            > */}
                            {/* <MenuIcon /> */}
                            <img src={LmsLogo} className={styles.logo} />
                            {/* </IconButton> */}

                            {/* display only in mobiles */}
                            <DisplayNavigationBar />
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { sm: 'block' }, width: "340px" }}
                            >
                                License Management System
                            </Typography>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase sx={{  marginLeft : "50px",display: { xs: "none", sm: "block" } }}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={searchField}
                                    onChange={handleSearchField}
                                    // on={goToDefaultValues}
                                />
                            </Search>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>

                                {/* create button */}
                                <CreateButton />

                                {/* notifications icon  */}
                                <Notification iconColor='white' />

                                {/* profile icon  */}
                                <Profile iconColor='white' />
                            </Box>

                            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: "center", justifyContent: "flex-end" }}>
                                <Box sx={{ display: { xs: "block", sm: "none" }, marginTop: "7px" }}>
                                    <SearchDialogBox />
                                </Box>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                    {renderMenu}
                </Box>
            </div>
        </>
    );
}

export default Navbar;
