'use client'

import { Button } from 'react-bootstrap';

import { useEffect } from 'react';

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className='alert alert-danger' role="alert">
                        {error.message}
                    </div>
                    <div className="row justify-content-center">
                        <div className="form-group text-center mt-3">
                            <Button variant="info"
                                onClick={
                                    () => reset()
                                }> Voltar <i className="bi bi-arrow-left-square"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}