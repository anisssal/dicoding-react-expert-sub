import {Icon} from "@iconify/react";
import {Chip} from "@mui/material";
import PropTypes from "prop-types";

export default function ThreadTag({category}){
    return (
        <Chip icon={<Icon icon="mdi:tag" />} label={category} />
    )
}

ThreadTag.propTypes = {
    category : PropTypes.string.isRequired
}
