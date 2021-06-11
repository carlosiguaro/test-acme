import React from 'react';

function Unauthorized() {
    return (
        <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center'>
            <div className='d-flex'>
                <div>
                    <h1>401</h1>
                </div>
                <div className='d-flex align-items-center mx-3'>
                    <label>
                        Unauthorized
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Unauthorized;
