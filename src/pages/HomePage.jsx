import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import ThreadList from "../components/threads/ThreadList";
import { asyncPopulateUsersAndThreads } from '../store/shared/shared_action.js';

export default function HomePage(){


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncPopulateUsersAndThreads());
    }, [dispatch]);
    const {
        threads = [],
        users = [],
        authUser,
    } = useSelector((states) => states);

    const threadsData = threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
        authUser: authUser?.id,
    }));

    return <Grid container>
            <Grid item sm={3}> </Grid>
            <Grid item sm={6}>
                <ThreadList  threads={threadsData}/>
            </Grid>
            <Grid item sm={3} />
        </Grid>
}
