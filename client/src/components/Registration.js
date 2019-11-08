import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../graphql/mutations";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            password: ""
        };
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    updateCache(client, { data }) {
        console.log(data);
        client.writeData({
            data: { isLoggedIn: data.register.loggedIn }
        })
    }

    render() {
        return (
            <Mutation
                mutation={REGISTER_USER}
                onCompleted={data => {
                    const { token } = data.register;
                    localStorage.setItem("auth-token", token);
                    this.props.history.push("/");
                }}
                update={(client, data) => this.updateCache(client, data)}
            >
                { registerUser => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                registerUser({
                                    variables: {
                                        email: this.state.email,
                                        name: this.state.name,
                                        password: this.state.password
                                    }
                                });
                            }}
                        >
                            <input
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="email"
                            />
                            <input
                                value={this.state.name}
                                onChange={this.update("name")}
                                placeholder="name"
                            />
                            <input
                                value={this.state.password}
                                onChange={this.update("password")}
                                placeholder="password"
                                type="password"
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default Registration;