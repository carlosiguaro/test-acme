import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Button, Form, Header, Icon, Message } from 'semantic-ui-react'
import { authUser, registerSession, verifySession } from '../../../services/user.auth.services';

function Signin(){
    const history = useHistory();

    useEffect(() => {
        if (verifySession()) {
            history.push('/home')
        }
    }, []);


    const [state, setState] = useState({
        loading: false,
        validationMsg: {
            username: null,
            password: null
        },
        username: '',
        password: '',
        authMsg: ''

    });

    const login = (e) => {
        const pass = validationCredentials();
        
        if (pass) {
            
            setState({
                ...state,
                loading: true
            })

            authUser({
                username: state.username,
                password: state.password
            })
            .then((res) => {
                if (res.data.token) {
                    if (registerSession(res.data.token)) {
                        history.push('/home');
                    }
                }
            })
            .catch((err) => {
                try {
                    
                    if (err.response.data) {
                        if (err.response.data.non_field_errors) {

                            setState({
                                ...state,
                                authMsg: 'Nombre de usuario o contraseña incorrecta'
                            })
                        } else {
                            setState({
                                ...state,
                                authMsg: 'Error desconocido'
                            })
                        }
                    }
                } catch(err) {
                    setState({
                        ...state,
                        authMsg: 'Error desconocido'
                    })
                }
            })
        }
    }

    const updateValue = (e) => {
        let credentialsValue = {
            validationMsg: {
                ...state.validationMsg
            }
        };

        if (state.authMsg.length > 0) {
            credentialsValue = {
                ...credentialsValue,
                authMsg: ''
            }
        }

        if (e.target.name == 'username') {
            credentialsValue.username = e.target.value;
            if (state.validationMsg.username !== null) {
                credentialsValue.validationMsg.username = null;
            }
        } else {
            credentialsValue.password = e.target.value;
            if (state.validationMsg.password !== null) {
                credentialsValue.validationMsg.password = null;
            }
        }
        setState({
            ...state,
            ...credentialsValue
        });
    };

    const validationCredentials = () => {
        let pass = true,
            valMsg = {
                username: null,
                password: null
            };

        if (state.username.length === 0 ) {
            valMsg.username = 'El nombre de usuario es requerido';
            pass = false;
        }

        if (state.password.length === 0 ) {
            valMsg.password = 'La contraseña es requerida';
            pass = false;            
        }

        setState({
            ...state,
            validationMsg: {
                ...state.validationMsg,
                ...valMsg
            }
        })

        return pass;
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100 d-flex justify-content-center">
                <div className="col-sm-12 col-md-8 col-lg-6 col-xl-4 p-4 bg-white rounded shadow">
                
                    <Header as='h1' className='text-center mb-4'>
                        Acme inc.
                    </Header>

                    <Form loading = {state.loading}>
                        <Header as='h4'>
                            <Icon name='user circle' />
                            <Header.Content>Sign in</Header.Content>
                        </Header>

                        <Form.Field>
                            <Form.Input
                                error={state.validationMsg.username}
                                fluid
                                label='Nombre de usuario'
                                id='form-input-username'
                                icon='user'
                                type='text' 
                                name='username'
                                placeholder='Nombre de usuario'
                                onChange={e => updateValue(e)}
                            />
                        </Form.Field>

                        <Form.Field>

                            <Form.Input
                                error={state.validationMsg.password}
                                fluid
                                label='Contraseña'
                                id='form-input-password'
                                icon='lock'
                                type='password' 
                                name='password'
                                placeholder='Contraseña'
                                onChange={e => updateValue(e)}
                            />
                        </Form.Field>
                        
                        {state.authMsg &&
                            <Message
                                error
                                className='d-block'
                                content={state.authMsg}
                            />
                        }

                        <Button fluid onClick={e => login(e)}>Submit</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Signin;