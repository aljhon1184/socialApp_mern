import './auth.css'
import { useContext, useState } from 'react'
import { loginCall } from '../../apiCall'
import { AuthContext } from '../../context/AuthContext'
import { Button, CircularProgress, Container, Grid, makeStyles, Paper, Typography, Snackbar} from '@material-ui/core'
import Input from './Input'
import axios from 'axios'
import MuiAlert from '@material-ui/lab/Alert'

const InitialValue = {username: '', email: '', password: '', confirmPassword: '', city: '', from: ''}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

}));
export default function Auth() {
    const {dispatch, isFetching, error } = useContext(AuthContext);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(InitialValue);
    const [openAlert, setOpenAlert] = useState(false);
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);


    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

      const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        setOpenAlert(false);
      };
    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleShowPassword = () =>{
        setShowPassword((prevShowpassword) => !prevShowpassword);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(isSignup){
            //register
            if(formData.confirmPassword !== formData.password){
                setPasswordNotMatch(true);
            }else{
                setPasswordNotMatch(false);
                
                try{
                    await axios.post("/auth/register", formData);
                    setOpenAlert(true);
                    setIsSignUp(false);
                }catch(err){
                    
                }
            }
        }else{
            
            loginCall({
                email: formData.email, password: formData.password },
                dispatch
            );
            //dispatch(Login(formData));
        }

    }
    const switchMode = () =>{
        setIsSignUp((preIsSignup) => !preIsSignup);
        setShowPassword(false);
    }
    
    return (
        <div className="login">
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {
                                isSignup && (
                                    <>
                                        <Input name="username" label="Username" type="text" handleChange={handleChange} autoFocus/>

                                    </>
                                )
                            }
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus/>
                            {
                                isSignup && (
                                    <>
                                        <Input name="city" label="City" type="text" handleChange={handleChange} half/>
                                        <Input name="from" label="From" type="text" handleChange={handleChange} half/>
                                    </>
                                )
                            }
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                            {
                                isSignup && (
                                    <>
                                        <Input name="confirmPassword" label="Confirm-Password" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword}/>
                                        {passwordNotMatch && (
                                            <span className="ErrorText">Password not match.</span>
                                        )}
                                    </>
                                )
                            }
                            {error && (
                                !isSignup &&(
                                        <span className="errorLogin">Something went Wrong!</span>
                                    )
                            )}
                            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignup ? "Sign up" : "Sign In"}</Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    {isFetching ? (
                                        <CircularProgress />
                                    ) : (
                                        <Button onClick={switchMode}>
                                        {isSignup ? "Already Have an Account? Sign In" : "Dont have An Account yet? Sign Up"}
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
            <Snackbar
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleClose} severity="success">
                Successfully Sign Up!
                </Alert>
            </Snackbar>
        </div>
    )
}
