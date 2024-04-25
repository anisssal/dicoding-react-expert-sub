import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import LoadingBar, { hideLoading, showLoading } from 'react-redux-loading-bar';


export default function BackdropLoader({ loading }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (loading) {
            dispatch(showLoading());
        }else{
            dispatch(hideLoading());
        }
    }, [dispatch, loading]);
    return (
        <>
            <LoadingBar style={{ backgroundColor: '#1172e9', height: '5px', zIndex : 999999999999 }}/>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) =>
                        Math.max.apply(Math, Object.values(theme.zIndex)) + 1,
                }}
                open={loading}
            >
                <CircularProgress color="primary" size={50} />
            </Backdrop>
        </>

    );
}

BackdropLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
};
