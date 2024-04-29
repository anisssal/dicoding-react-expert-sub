import PropTypes from "prop-types";
import userShape from "./user-shape";

const leaderboardShape = {
    user: PropTypes.shape(userShape).isRequired,
    score:  PropTypes.number.isRequired,
};


export default leaderboardShape;
