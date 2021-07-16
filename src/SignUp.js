import './SignUp.css'
import { Container, TextField, Button, Paper, Grid } from '@material-ui/core'
import crypto from 'crypto'
import { useState } from 'react'
import axios from 'axios'

function hashPassword(pass) {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha512').toString('hex');
    return ({
        salt: salt,
        hash: hash
    })
}

function SignUp (props) {
    const[name, setName] = useState();
    const[email, setEmail] = useState();
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();
    const[cPassword, setCPassword] = useState();

    function onSubmit(e) {
        e.preventDefault();

        let passData = hashPassword(password)

        let data = {
            name: name,
            email: email,
            username: username,
            hash: passData.hash,
            salt: passData.salt
        }
        axios.post("http://localhost:5000/users/add", data).then(() => {
            props.setName(name)
            props.setUser(username)
        })
    }

    return(
        <Container maxWidth="sm">
            <Paper elevation={2} style={{ padding: 20, minHeight: '90vh' }}>
                <h1>Sign Up</h1>
                <Grid container alignItems="center" justifyContent="center" spacing={0}>
                    <form style={{width: "100%"}}>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setName(e.target.value)} autoComplete="given-name" required fullWidth label="Name" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setUsername(e.target.value)} autoComplete="username" required fullWidth label="Username" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setEmail(e.target.value)} autoComplete="email" required fullWidth label="Email Address" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setPassword(e.target.value)} autoComplete="new-password" required fullWidth type="password" label="Password" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setCPassword(e.target.value)} autoComplete="new-password" required fullWidth type="password" label="Confirm Password" />
                        </Grid>
                        <Grid style={{margin: 20}} container justifyContent={"flex-end"} item xs={12}>
                            <Grid item xs={3}>
                                <Button color="primary" onClick={() => window.location="/login"}>Log In</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={onSubmit} variant="contained" color="primary">Sign Up</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </Container>
    )
}

export default SignUp