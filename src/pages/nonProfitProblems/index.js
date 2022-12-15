import {
    Box,
    Button,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from '@mui/material';
import React, {useState} from 'react';

import { useRouter } from 'next/router'
import { useAuth0 } from "@auth0/auth0-react";
import { Puff } from 'react-loading-icons'

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const JOIN_SLACK_LINK = "https://join.slack.com/t/opportunity-hack/shared_invite/zt-1db1ehglc-2tR6zpmszc5898MhiSxHig";
const createSlackAccount = () => {
    window.open(
        JOIN_SLACK_LINK,
        "_blank",
        "noopener noreferrer"
    );
};


const defaultValues = {
    organizationName: '',
    contactFirstName: '',
    contactLastName: '',
    contactEmail: '',
    organizationType: '',
    problemToSubmit: '',
}

export default function Opportunities(){
    var loginCallToAction = '';
    const {user} = useAuth0();
    const { loginWithRedirect } = useAuth0();
    
    const [values, setValues] = useState(defaultValues); // Form Values
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar
    const [errorOpen, setErrorOpen] = useState(false); // Error Snackbar

    // Handle Snackbar
    const handleSnackbarClose = () => setSnackbarOpen(false);
    const handleSnackbarOpen = () => setSnackbarOpen(true);
    const handleErrorClose = () => setErrorOpen(false);
    const handleErrorOpen = () => setErrorOpen(true);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };
    
      // Handle Form Value Changes
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const handleSubmit = () => {
        if(
            values.firstName === '' ||
            values.lastName === '' ||
            values.email === ''
        ){
            handleErrorOpen();
            return;
        }
        console.log(values);
        window.open(
            'https://opportunity-hack.slack.com/archives/C04E9HKGH5M',
            '_blank',
        );
        handleSnackbarOpen();
        setValues(defaultValues);
    }

    if( user == null )
    {
        loginCallToAction = 
            <Stack alignItems="flex-start" padding={2.5}>
            <Alert variant="outlined" severity="warning" >
                <AlertTitle>Please login in order to add a problem to our board!</AlertTitle>

                    <Stack alignItems="center" spacing={2}>
                        <Stack direction="column" spacing={1}>
                            <button
                                className="button button--primary button--compact"
                                onClick={() => loginWithRedirect({
                                    appState: {
                                        returnTo: window.location.pathname,
                                        redirectUri: window.location.pathname
                                    }
                                })}
                            >
                                Log In
                            </button>
                                                        
                            <Typography>We use Slack to collaborate, if you already have an account, login with Slack</Typography>                            
                            
                        </Stack>

                        <Stack direction="column" spacing={1}>
                            <button onClick={createSlackAccount} className="button button--primary">
                                Create a Slack account
                            </button>
                            
                            <Typography>If you don't have an account, you will need to create an account</Typography>                                                    
                        </Stack>
            </Stack>
            </Alert>
            </Stack>


        return(
            <div>
                {loginCallToAction}
            </div>
        )
    }
    else{
        return(

            //TODO: add Form Here
            <h1> Form </h1>
        )
    }

}