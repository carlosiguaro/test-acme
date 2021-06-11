import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Header, Icon, Button, Form, Table } from 'semantic-ui-react'
import { saveDashboard, getDasboards } from '../../../services/dashboard.services';
import { logOut } from '../../../services/user.auth.services';
import '../../../static/styles/miscellaneous.css';

function RegisterDashboard(){

    const [url, setUrl] = useState('');
    const [loading, seLoading] = useState(false);
    const [errorUrl, setErrorUrl] = useState(null);
    const [dashboards, setDashboards] = useState([]);

    const history = useHistory();
    
    useEffect(() => {
        setDashboards(getDasboards());
    }, []);

    const registerUrl = (e) => {
        let pass = validateUrl();

        if (pass) {
            seLoading(true)
            const sd = saveDashboard(url);
            if (sd) {
                setTimeout(function() {
                    seLoading(false)
                    setDashboards(getDasboards());
                    setUrl('');
                    document.querySelector("input[name='URL']").value = '';
                }, 1000);
            }
        }
    }

    const sessionDetroy = () => {
        logOut()
        setTimeout(function(){
            history.push('/');
        }, 200);
    }

    const setValueUrl = (e) => {
        if (errorUrl) {
            setErrorUrl(null)
        }
        setUrl(e.target.value);
    }

    const validateUrl = () => {

        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
            regex = new RegExp(expression),
            pass = true;
        
        if (!url.length) {
            setErrorUrl('La url es requerida');
            pass = false;
        } else if (!url.match(regex)) {
            setErrorUrl('Ingrese una url valida');
            pass = false;
        }

        return pass;
    }

    return (
        <div className='min-vh-100 container cont-pp'>
            <Header as='h1' className='py-5 m-0'>
                <Icon name='industry' />
                <Header.Content>
                    Acme
                    <Header.Subheader>Dashboard Manager</Header.Subheader>
                </Header.Content>
            </Header>
            
            <div className='d-flex justify-content-end'>
                <div className='d-flex align-items-center'>
                    <Link to='/home' className='mx-4'>Home</Link>
                </div>
                    
                <div className='session-destroy'>
                    <Button icon onClick={e => { sessionDetroy(e) }}>
                        <Icon name='sign-out alternate' />
                    </Button>
                </div>
                
            </div>

            <Form loading = {loading}>
                <Header as='h4'>
                    <Icon name='th large' />
                    <Header.Content>Registro de Dashboard</Header.Content>
                </Header>
                <Form.Field>
                    <Form.Input
                        error={errorUrl}
                        fluid
                        label='URL'
                        id='form-input-username'
                        icon='globe'
                        type='text' 
                        name='URL'
                        placeholder='Ingrese URL'
                        onChange={e => setValueUrl(e)}
                    />
                </Form.Field>

                <Button fluid onClick={e => registerUrl(e)}>Registrar dashboard</Button>
            </Form>

            <h2>Url registradas</h2>

            <Table celled fixed singleLine>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Url</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        dashboards.map((url, key) => {
                            return (
                                <Table.Row>
                                    <Table.Cell key={key}>{url}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    
                </Table.Body>
            </Table>
        </div>
    )
}

export default RegisterDashboard;