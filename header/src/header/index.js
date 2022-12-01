import React, { useEffect, useMemo } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux'
import debounce from 'lodash.debounce';
import { microSearchAction } from '../action/micro-action';
import Cart from "microfrontend-modal/cart";
// console.log(Cart);
import axios from 'axios'
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [setMobileMoreAnchorEl] = React.useState(null);
    const [isShow, setShow] = React.useState(false)
    const dispatch = useDispatch()
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        const fetchApi = async () => {
            const { data } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b5a77a9b68e943dc0140d7598e45a7b2')
            dispatch({ type: "MICRO_SHARED_GENRES", payload: data })
        }
        fetchApi()
    }, [])
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const changeHandler = (event) => {
        const { value } = event.target
        dispatch(microSearchAction({ query: value }))
    };
    const debouncedChangeHandler = useMemo(
        () => debounce(changeHandler, 300)
        , []);

    const menuId = 'primary-search-account-menu';
    const { collection } = useSelector(state => state.microfrontendState)
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
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
            {collection.length === 0 ? <Typography sx={{ width: "100%", padding: "0 16px", fontSize: "14px" }} comoponent="span">Collection Not Found</Typography> : <Paper sx={{ width: 320, maxWidth: '100%' }}>
                {
                    collection.map((item, index) => {
                        return (
                            <MenuList key={index}>
                                <MenuItem>
                                    <CardMedia
                                        sx={{ width: "auto" }}
                                        component="img"
                                        height="60"
                                        image={`https://image.tmdb.org/t/p/w500` + item?.poster_path}
                                        alt="green movie"
                                    />
                                    <Typography component={"div"}>
                                        <ListItemText sx={{ paddingLeft: 2, fontSize: "12px" }}>{item?.original_title}</ListItemText>
                                        <Typography fontSize={"10px"} sx={{ padding: "0 16px" }} component="p">{item?.overview?.substring(0, 40) + "..."}</Typography>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <DownloadIcon />
                                    </Typography>
                                </MenuItem>
                            </MenuList>
                        )
                    })
                }
            </Paper>}
        </Menu>
    );
    return (
        <>
            <Cart onClose={() => setShow(!isShow)} isShow={isShow} />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">

                    <Toolbar>
                        {/* <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            TMDB
                        </Typography>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={debouncedChangeHandler}
                                placeholder="Search Title…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button type="button" onClick={() => setShow(!isShow)} variant='contained' color='success' size='small'>Cart</Button>
                            <IconButton
                                onClick={handleProfileMenuOpen}
                                size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={collection.length} color="error">
                                    <AddShoppingCartOutlined />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMenu}
            </Box>
        </>

    );
}