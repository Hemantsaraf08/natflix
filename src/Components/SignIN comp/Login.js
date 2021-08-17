import React, { useState } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
const useStyles = makeStyles((theme) => ({
    formBlock: {
        marginTop: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-evenly",
        // padding: "5px",
        "& *": {
            // textAlign: "center",
            margin: ".15rem"
        }
    }
}))
function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [passwordObj, setPasswordObj] = useState({
        password: "",
        showPassword: false
    })
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setPasswordObj({ ...passwordObj, showPassword: !passwordObj.showPassword });
    };
    const handlePasswordChange = (e) => {
        setPasswordObj({ ...passwordObj, password: e.target.value })
    }
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {

            setLoading(true);
            let res = await axios.post("https://demo.credy.in/api/v1/usermodule/login/", {
                'username': email,
                'password': passwordObj.password
            })
            console.log(res.data);
        } catch (err) {
            setLoading(false);
            console.log(err.response.data);
            let failmessage = err.response.data.error.message;
            failmessage += ", try again."
            setError(failmessage)
            setTimeout(() => setError(""), 3200);
        }
        setLoading(false);
    }
    return (
        <div style={{
            height: "100vh", display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center", backgroundSize: "100% 100%"
        }}>
            <Card className={classes.formBlock}>
                <form  autoComplete="off" onSubmit={handleSignIn}>
                    <CardContent>
                        <TextField id="outlined-basic"
                            type="text"
                            placeholder="Enter Username"
                            variant="outlined" required autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={passwordObj.showPassword ? 'text' : 'password'}
                            value={passwordObj.password}
                            onChange={handlePasswordChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {passwordObj.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder="Password"
                            variant="outlined"
                            required
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" color="primary" type="submit" disabled={loading}>
                            LOG IN
                        </Button>
                    </CardActions>
                </form>
            </Card>

            {
                error ? <Typography variant="h5">{error}</Typography> : <></>
            }
        </div>
    )
}

export default Login
