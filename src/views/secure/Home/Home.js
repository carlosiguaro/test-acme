import { React, useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Header, Icon, Dropdown, Button } from 'semantic-ui-react'
import { getDasboards } from '../../../services/dashboard.services'
import { logOut } from '../../../services/user.auth.services';

import './Home.css';
import '../../../static/styles/miscellaneous.css';

function Home(){

    const history = useHistory();

    const [classView, setClassView] = useState('dash-column');
    const [dashboards, setDashboards] = useState([]);

    const sessionDetroy = () => {
        logOut()
        setTimeout(function(){
            history.push('/');
        }, 200);
    }

    useEffect(() => {
        setDashboards(getDasboards());
    }, []);

    const handleClassView = (e) => {
    
        let element = e.target,
            idElement = e.target.nodeName,
            currentEl = e.target.nodeName;
        switch (idElement){
            case 'DIV':
                currentEl = element.querySelector('span');
                break;
            case 'SPAN':
                currentEl = element;
                break;
            case 'I':
                currentEl = element.nextSibling;
                break;
        }

        let mode = currentEl.textContent,
            defMode;

        if (mode == 'Columna') {
            defMode = 'dash-column';
        } else if(mode == 'Tabla') {
            defMode = 'dash-table';
        }
        setClassView(defMode)
    }

    const options = [
        {
            text: 'Columna',
            icon: 'columns'
        },
        {
            text: 'Tabla',
            icon: 'table'
        }
    ];
    
    return (
        <div className='min-vh-100 container cont-pp'>
            <Header as='h1' className='py-5 m-0'>
                <Icon name='industry' />
                <Header.Content>
                    Acme
                <Header.Subheader>Home</Header.Subheader>
                </Header.Content>
            </Header>

            <div className='d-flex justify-content-end'>
                <div className='d-flex'>

                    <div className='d-flex align-items-center'>
                        <Link to='/manage-dashboard' className='mx-4'>Registrar Dashboard</Link>
                    </div>
                    <div>
                        <Dropdown
                            text='Vista:'
                            icon='sliders horizontal'
                            floating
                            labeled
                            button
                            className='icon'
                        >
                            <Dropdown.Menu onClick={e => handleClassView(e)}>
                                {
                                    options.map((opt, key) =>{
                                        return (
                                            <Dropdown.Item 
                                                icon={opt.icon} 
                                                text={opt.text} 
                                                key={key} 
                                            />
                                        )
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className='d-flex align-items-center result-view'>
                        {
                            classView === 'dash-column' ?
                                <Fragment>
                                    <Icon name='columns' /> Columna 
                                </Fragment>
                                :
                                <Fragment>
                                    <Icon name='table' /> Tabla
                                </Fragment>
                        }
                    </div>
                    
                </div>
                <div className='session-destroy'>
                    <Button icon onClick={e => { sessionDetroy(e) }}>
                        <Icon name='sign-out alternate' />
                    </Button>
                </div>
            </div>
            <h2 className='my-2'>Dassboard List</h2>
            <div className={classView}>
                {dashboards && 
                    <Fragment>
                        {
                            dashboards.map((url, key) => {

                                return (
                                    <div key={key}>
                                        <iframe src={url}></iframe>
                                    </div>
                                )
                            })
                        }
                    </Fragment>
                }
                {!dashboards.length &&  <label>No existen dashboard's registrados</label> }
            </div>
        </div>
    )
}

export default Home;