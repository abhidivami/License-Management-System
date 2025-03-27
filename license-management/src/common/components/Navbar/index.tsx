import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CreateButton from './CreateButton';
import styles from './index.module.scss';
import SearchDialogBox from './SearchDialogBox';
import Sidebar from './Sidebar';

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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
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

    //to store notifications length
    const count = 0;

    //to store search text field
    const [searchField, setSearchField] = React.useState<string>("");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
    }

    //in order to search data after clicking on enter
    const handleSearchFieldEnter = (event: React.KeyboardEvent) => {
        if (event.key == "Enter") {
            console.log("search text: ", searchField);
        }
    }

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
        >
            <MenuItem>
                <div className={styles.create}>
                    <CreateButton />
                </div>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="notifications regarding expired licenses"
                    color="inherit"
                >
                    <Badge badgeContent={count} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <div className={styles.header}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ bgcolor: "#27548A" }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
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
                                <StyledInputBase sx={{ display: { xs: "none", sm: "block" } }}
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={handleSearchField}
                                    onKeyDown={handleSearchFieldEnter}
                                />
                            </Search>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
                                <CreateButton />
                                <IconButton
                                    size="large"
                                    aria-label="notifications regarding expired licenses"
                                    color="inherit"
                                >
                                    <Badge badgeContent={count} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
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
            <div className={styles.content}>
                <Sidebar />
            </div>
        </>
    );
}

export default Navbar;
