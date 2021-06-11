import React from 'react';

function BadRequest() {
    return (
        <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='d-flex'>
                <div>
                    <h1>400</h1>
                </div>
                <div className='d-flex align-items-center mx-3'>
                    <label>
                        BadRequest
                    </label>
                </div>
            </div>
        </div>
    )
}

export default BadRequest;
