import './LogIn.css'
import { Container, TextField, Button, Paper, Grid } from '@material-ui/core'
import { useState } from 'react'
import axios from 'axios'


function LogIn (props) {
    const [username,setUsername] = useState()
    const [password, setPassword] = useState()

    function onSubmit(e) {
        e.preventDefault();

        let data = {
            username: username,
            password: password
        }

        axios.post("http://localhost:5000/users/login", data).then(res => {
            if(res.data.success) {
                props.setName(res.data.name)
                props.setUser(username)
            }

        })
    }

    return(
        <Container maxWidth="sm">
            <Paper elevation={2} style={{ padding: 20, minHeight: '90vh' }}>
                <h1>Sign In</h1>
                <Grid container alignItems="center" justifyContent="center" spacing={3}>
                    <form style={{width: "100%"}}>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setUsername(e.target.value)} autoComplete="username" required fullWidth label="Username" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField onChange={e => setPassword(e.target.value)} autoComplete="new-password" required fullWidth type="password" label="Password" />
                        </Grid>
                        <Grid item container justifyContent="flex-end" xs={12}>
                            <Grid item xs={3}>
                                <Button color="primary">Sign Up</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={onSubmit} variant="contained" color="primary">Log In</Button>
                            </Grid>
                        </Grid>
                        
                    </form>
                </Grid>
            </Paper>
        </Container>
    )
}

export default LogIn