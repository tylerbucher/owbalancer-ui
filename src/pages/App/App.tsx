import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import Cookies from 'universal-cookie';
import {SnackbarProvider} from "notistack";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../../components/TabPanel/TabPanel";
import AddPlayerTab from "./tabs/AddPlayerTab";
import ManagePlayersTab from "./tabs/ManagePlayersTab";
import BalancerTab from "./tabs/BalancerTab";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mainContent: {
            height: "100vh",
            display: "flex",
            flexFlow: "column"
        },
        card: {
            minWidth: "275"
        },
        avatar: {
            backgroundColor: "#f12315",
        },
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        table: {
            minWidth: 750,
        },
    }),
);

function prefersDarkMode(systemPreference: boolean): boolean {
    const cookies = new Cookies();
    const cookieValue = cookies.get('prefersDarkMode');
    return cookies.get('prefersDarkMode') === undefined ? systemPreference : cookieValue === "true";
}

function App() {
    const classes = useStyles();
    const systemPreference = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = React.useState(prefersDarkMode(systemPreference));
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleDarkMode = (val: boolean) => {
        setDarkMode(val);
    };
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                },
                breakpoints: {
                    values: {
                        xs: 0,
                        sm: 600,
                        md: 960,
                        lg: 1620,
                        xl: 1920,
                    },
                }
            }),
        [darkMode],
    );
    return (
        <SnackbarProvider maxSnack={3} preventDuplicate>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div id={"App"} className={classes.mainContent}>
                    <ActionMenu parentStateChange={handleDarkMode}/>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Balancer"/>
                        <Tab label="Add Player"/>
                        <Tab label="Manage Players"/>
                        <Tab label="Settings" disabled/>
                    </Tabs>
                    <TabPanel value={value} index={0} variant={"center"}>
                        <BalancerTab/>
                    </TabPanel>
                    <TabPanel value={value} index={1} variant={"center"}>
                        <AddPlayerTab/>
                    </TabPanel>
                    <TabPanel value={value} index={2} variant={"center"} >
                        <ManagePlayersTab/>
                    </TabPanel>
                </div>
            </ThemeProvider>
        </SnackbarProvider>
    );
}

export default App;
