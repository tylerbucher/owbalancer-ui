import React, {useCallback, useEffect} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme, createStyles, makeStyles, Theme, ThemeProvider} from "@material-ui/core/styles";
import ActionMenu from "../../components/ActionMenu/ActionMenu";
import {withSnackbar} from "notistack";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../../components/TabPanel/TabPanel";
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import getBasicUserList from "../../shared/rest/GetBasicUserList";
import BalancerTab from "./tabs/BalancerTab";
import AddPlayerTab from "./tabs/AddPlayerTab";
import ManagePlayersTab from "./tabs/ManagePlayersTab";
import {BasicUserModel, BasicUserModelApi} from "../../shared/rest/models/BasicUserModel";
import getAuthentication from "../../shared/rest/GetAuthentication";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Settings from "./Settings";
import {getCGBAuthToken, prefersDarkMode} from "../../utilities/CookieHelper";
import GetUserModel, {GetUserModelApi} from "../../shared/rest/models/GetUserModel";
import getUser from "../../shared/rest/GetUser";
import {
    canAddMorePlayers,
    canSeeAddPlayersTab,
    canSeeBalancerTab,
    canSeeManagePlayersTab,
    canSeeSettingsTab
} from "../../utilities/Permissions";
import {PostNewPlayerModelApi} from "../../shared/rest/models/PostNewPlayerModel";

export async function loadPermutations(url: string): Promise<Int8Array[]> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const flat = new Int8Array(buffer);

    const permLength = 12;
    const count = flat.length / permLength;
    const permutations: Int8Array[] = new Array(count);

    for (let i = 0; i < count; i++) {
        const offset = i * permLength;
        // Slice gives a view with no extra allocation
        permutations[i] = flat.slice(offset, offset + permLength);
    }

    return permutations;
}

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
        tabGlobal: {
            overflowY: "scroll"
        }
    }),
);

function getTabs(userModel: GetUserModelApi | undefined): Array<JSX.Element> {
    let tabs = new Array<JSX.Element>();
    tabs.push(<Tab label="Balancer"/>);
    tabs.push(<Tab label="Add Player"/>);
    tabs.push(<Tab label="Manage Players"/>);
    return tabs;
}

function getTabData(userModel: GetUserModelApi | undefined,
                    value: number,
                    userList: Array<BasicUserModelApi>,
                    userUpdate: any,
                    classes: any,
                    permArray: any): Array<JSX.Element> {
    let tabs = new Array<JSX.Element>();
    tabs.push(
        <TabPanel value={value} index={tabs.length} variant={"center"}>
            <BalancerTab basicUserList={userList} permArray={permArray}/>
        </TabPanel>
    );
    tabs.push(
        <TabPanel value={value} index={tabs.length} variant={"center"}>
            <AddPlayerTab basicUserList={userList} onUserListUpdate={userUpdate} userModel={userModel}/>
        </TabPanel>
    );
    tabs.push(
        <TabPanel value={value} index={tabs.length} variant={"center"}>
            <ManagePlayersTab basicUserList={userList} onUserListUpdate={userUpdate} userModel={userModel}/>
        </TabPanel>
    );
    return tabs;
}

function getUserList() {
    const playerString = localStorage.getItem("players");
    let players: PostNewPlayerModelApi[] = [];
    if (playerString !== null) {
        players = JSON.parse(playerString) as PostNewPlayerModelApi[]
    }
    return players.map(v => new BasicUserModel(v.userId, v.playerName, v.names))
}

function App(props: any) {
    const classes = useStyles();

    const systemPreference = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = React.useState(prefersDarkMode(systemPreference));
    const [value, setValue] = React.useState(0);
    const userList = getUserList();
    const [permArray, setPermArray] = React.useState<Int8Array[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleDarkMode = (val: boolean) => {
        setDarkMode(val);
    };

    useEffect(() => {
        loadPermutations("/data.bin").then(v => {
            setPermArray(v)
        })
    }, [setPermArray]);

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkMode ? 'dark' : 'light',
                    primary: {
                        main: darkMode ? blue[400] : blue[700],
                        contrastText: '#fff'
                    },
                    secondary: {
                        main: darkMode ? red[400] : red[700],
                    },
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
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div id={"App"} className={classes.mainContent}>
                <ActionMenu parentStateChange={handleDarkMode} onUserListUpdate={undefined}
                            authenticated={true}/>
                <Router>
                    <Switch>
                        <Route path="/">
                            <div id="tabHolder" className={classes.mainContent}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    centered
                                >
                                    {getTabs(undefined)}
                                </Tabs>
                                {getTabData(undefined, value, userList, undefined, classes, permArray)}
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default withSnackbar(App);
