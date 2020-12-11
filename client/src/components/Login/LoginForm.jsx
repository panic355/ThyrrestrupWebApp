import React from 'react';

console.log("cookies is: "+ document.cookie)
    if (!document.cookie) {
        console.log("success")
      var ErrorMessage = "Please accept the cookies on this site in order to be able to login";
      }


class Login extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async login(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
    
        console.log('Got here #3')
        
        const response = await fetch('/auth/login', requestOptions)
        const json = await response.json().then(this.handleResponse);
        /*
        fetch('/auth/login', requestOptions).then(response => {
            console.log("hellow"+response.status);
        });
        */
    }
    
    async handleResponse(response) {
        //console.log('Got here #5'+res.status)
            const error = response.error;
            if (!(response.status === 200)) {
                console.log('Got here #6: '+error)
                if (response.status === 401) {
                    console.log('Got here #7: '+error)
                    // auto logout if 401 response returned from api
                   // window.location.reload();
                } 
                console.log('Here is the error: '+error)
            }
            if (response.status === 200){
            window.location.href = '/fleet'
            console.log('Got here #8'+response.status)
            }
        }
        

 handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;

        // stop here if form is invalid
        if (!(email && password)) {
            return;
        }
  console.log('Got here #2')
        this.setState({ loading: true });
        this.login(email, password)
            .then(
                error => this.setState({ error, loading: false })
            );

    }
    render() {
        const { email, password, submitted, loading, error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className="alert alert-info">
                    Email: test<br />
                    Password: test
                </div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={loading}>Login</button>
                        {loading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    <label style={{ color: 'red' }}>{ErrorMessage}</label>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        );
    }
}
export default Login;