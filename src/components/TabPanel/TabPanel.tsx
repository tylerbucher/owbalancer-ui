import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        center: {
            height: "100%"
        }
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    variant?: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    const cClass = props.variant === "center" ? classes.center : classes.root;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
            className={cClass}
        >
            {value === index && (
                <Box p={3} className={cClass}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPanel;