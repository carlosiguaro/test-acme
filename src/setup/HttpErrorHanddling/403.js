import React from 'react';

import { Header, Icon } from 'semantic-ui-react'

function Forbidden() {
    return (
        <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='d-flex'>
                <div>
                    <h1>403</h1>
                </div>
                <div className='d-flex align-items-center mx-3'>
                    <label>
                        Forbidden
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Forbidden;
