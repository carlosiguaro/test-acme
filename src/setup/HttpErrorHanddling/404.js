import React from 'react';

function NotFound() {
    return (
        <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='d-flex'>
                <div>
                    <h1>404</h1>
                </div>
                <div className='d-flex align-items-center mx-3'>
                    <label>
                        Not Found
                    </label>
                </div>
            </div>
        </div>
    )
}

export default NotFound;
