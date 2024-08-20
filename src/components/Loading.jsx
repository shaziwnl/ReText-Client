import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <CircularProgress color="inherit" sx={{margin: 'auto', textAlign: 'center'}}/>
    )
}
