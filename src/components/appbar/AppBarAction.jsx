import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import {IconButton} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Person} from "@mui/icons-material";
import {LOGIN_ROUTE, NEW_THREAD_ROUTE, REGISTER_ROUTE} from "../../utils/route-name";
import UserPopover from "./UserPopover";
import userShape from "../../data/types/user-shape";

export default function AppBarAction({ user, onSignOut }){
    return (
        <>
            {!user && (
                <Button variant="outlined" component={Link} href={REGISTER_ROUTE}
                sx={{display : { xs: 'none', sm: 'flex' }}}>
                    Sign Up
                </Button>
            )}
            {!user && (
                <Button
                    variant="contained"
                    sx={{ ml: 1 ,display : { xs: 'none', sm: 'flex' }}}
                    component={Link}
                    href={LOGIN_ROUTE}
                >
                    Sign In
                </Button>
            )}
            {!user && (
                <IconButton
                    variant="contained"
                    sx={{  display : { xs: 'flex', sm: 'none' }}}
                    component={Link}
                    href={LOGIN_ROUTE}
                    size="large"
                >
                    <Person height={100} width={100}/>
                </IconButton>
            )}

            {user && (
                <Button
                    variant="contained"
                    sx={{ mr: 2 , display : { xs: 'none', sm: 'flex' }}}
                    component={Link}
                    href={NEW_THREAD_ROUTE}

                >
                    Write a Post!
                </Button>
            )}

            {user && (
                <IconButton
                    variant="contained"
                    sx={{ mr: 2 , display : { xs: 'flex', sm: 'none' }}}
                    component={Link}
                    href={NEW_THREAD_ROUTE}
                    size="large"
                 >
                    <AddBoxIcon height={100} width={100}/>
                </IconButton>
            )}



            {user && <UserPopover onLogout={onSignOut} user={user} />}
        </>
    )
}

AppBarAction.defaultProps = {
    user: null,
};
AppBarAction.propTypes = {
    user: PropTypes.shape(userShape),
    onSignOut: PropTypes.func.isRequired,
};
