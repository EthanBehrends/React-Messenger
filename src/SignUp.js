import './SignUp.css'
import { Container, TextField, Button, Paper, Grid } from '@material-ui/core'

function SignUp (props) {
    return(
        <Container maxWidth="sm">
            <Paper elevation={2} style={{ padding: 20, minHeight: '90vh' }}>
                <h1>Sign Up</h1>
                <Grid container alignItems="center" justifyContent="center" spacing={0}>
                    <form style={{width: "100%"}}>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField autoComplete="given-name" required fullWidth label="First Name" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField autoComplete="username" required fullWidth label="Username" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField autoComplete="email" required fullWidth label="Email Address" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField autoComplete="new-password" required fullWidth type="password" label="Password" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={12}>
                            <TextField autoComplete="new-password" required fullWidth type="password" label="Confirm Password" />
                        </Grid>
                        <Grid style={{margin: 20}} item xs={3}>
                            <Button variant="contained" color="primary">Sign Up</Button>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </Container>
    )
}

export default SignUp