'use client';

import Link from 'next/link';

export default function NotFound() {

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className='alert alert-danger' role="alert">
                        Não encontrado
                    </div>
                    <div className="row justify-content-center">
                        <div className="form-group text-center mt-3">
                            <Link className="btn btn-info"
                                href={`/`}>Voltar <i className="bi bi-arrow-left-square"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}