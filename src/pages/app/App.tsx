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
import {BasicUserModelApi} from "../../shared/rest/models/BasicUserModel";
import getAuthentication from "../../shared/rest/GetAuthentication";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
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
    if (userModel !== undefined) {
        if (canSeeBalancerTab(userModel.permissions)) {
            tabs.push(<Tab label="Balancer"/>);
        }
        if (canSeeAddPlayersTab(userModel.permissions)) {
            tabs.push(<Tab label="Add Player"/>);
        }
        if (canSeeManagePlayersTab(userModel.permissions)) {
            tabs.push(<Tab label="Manage Players"/>);
        }
        if (canSeeSettingsTab(userModel.permissions)) {
            tabs.push(<Tab label="Settings"/>);
        }
    }
    return tabs;
}

function getTabData(userModel: GetUserModelApi | undefined,
                    value: number,
                    userList: Array<BasicUserModelApi>,
                    userUpdate: any,
                    classes: any): Array<JSX.Element> {
    let tabs = new Array<JSX.Element>();
    if (userModel !== undefined) {
        if (canSeeBalancerTab(userModel.permissions)) {
            tabs.push(
                <TabPanel value={value} index={tabs.length} variant={"center"}>
                    <BalancerTab basicUserList={userList}/>
                </TabPanel>
            );
        }
        if (canSeeAddPlayersTab(userModel.permissions)) {
            tabs.push(
                <TabPanel value={value} index={tabs.length} variant={"center"}>
                    <AddPlayerTab basicUserList={userList} onUserListUpdate={userUpdate} userModel={userModel}/>
                </TabPanel>
            );
        }
        if (canSeeManagePlayersTab(userModel.permissions)) {
            tabs.push(
                <TabPanel value={value} index={tabs.length} variant={"center"}>
                    <ManagePlayersTab basicUserList={userList} onUserListUpdate={userUpdate} userModel={userModel}/>
                </TabPanel>
            );
        }
        if (canSeeSettingsTab(userModel.permissions)) {
            tabs.push(
                <TabPanel value={value} index={tabs.length} variant={"center"}>
                    <Settings userModel={userModel}/>
                </TabPanel>
            );
        }
    }
    return tabs;
}

function App(props: any) {
    const classes = useStyles();

    const systemPreference = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = React.useState(prefersDarkMode(systemPreference));
    const [value, setValue] = React.useState(0);
    const [authenticated, setAuthenticated] = React.useState(false);
    const [authActive, setAuthActive] = React.useState(false);
    const [userActive, setUserActive] = React.useState(false);
    const [canSeePlayers, setCanSeePlayers] = React.useState(false);
    const [userModel, setUserModel] = React.useState<GetUserModelApi>(new GetUserModel("", "", false, [], -1, 0));
    const [userList, setUserList] = React.useState(new Array<BasicUserModelApi>());

    const handleGetPlayersCallback = useCallback((userModel: GetUserModel) => {
            setUserModel(userModel);
            setUserActive(true)
            let cc = canSeeBalancerTab(userModel.permissions) || canAddMorePlayers(userModel.permissions) || canSeeManagePlayersTab(userModel.permissions)
            setCanSeePlayers(cc);
            if (cc) {
                if (userList.length === 0) {
                    getBasicUserList(false, setUserList, props);
                }
            }
        }, [props, userList.length]
    );

    const handleUserCallback = useCallback(() => {
            getUser(props, handleGetPlayersCallback);
        }, [handleGetPlayersCallback, props]
    );

    const handleAuthCallback = useCallback(
        (val: boolean) => {
            if (val) {
                handleUserCallback();
            }
            setAuthenticated(val);
            setAuthActive(true);
        }, [handleUserCallback]
    );


    useEffect(() => {
        let cgbToken = getCGBAuthToken();
        if (cgbToken !== undefined) {
            if (!authActive) {
                getAuthentication(props, handleAuthCallback);
            }
        } else {
            handleAuthCallback(false);
        }
    }, [props, handleAuthCallback, authActive]);


    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleDarkMode = (val: boolean) => {
        setDarkMode(val);
    };

    const userUpdate = () => {
        getBasicUserList(true, setUserList, props)
    };

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
                <ActionMenu parentStateChange={handleDarkMode} onUserListUpdate={userUpdate}
                            authenticated={canSeePlayers}/>
                <Router>
                    <Switch>
                        <Route path="/login">
                            {authActive ? authenticated ? (
                                <Redirect to="/"/>
                            ) : (
                                <Login onAuth={handleAuthCallback}/>
                            ) : (
                                <div/>
                            )}
                        </Route>
                        <Route path="/createAccount">
                            {authActive ? authenticated ? (
                                <Redirect to="/"/>
                            ) : (
                                <CreateAccount/>
                            ) : (
                                <div/>
                            )}
                        </Route>
                        <Route path="/">
                            {authActive ? authenticated ? userActive ? (
                                <div id="tabHolder" className={classes.mainContent}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        centered
                                    >
                                        {getTabs(userModel)}
                                    </Tabs>
                                    {getTabData(userModel, value, userList, userUpdate, classes)}
                                </div>
                            ) : (
                                <div/>
                            ) : (
                                <Redirect to="/login"/>
                            ) : (
                                <div/>
                            )}
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default withSnackbar(App);
