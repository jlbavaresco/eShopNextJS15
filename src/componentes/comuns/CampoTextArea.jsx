'use client'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function CampoTextArea({ value, name, label, requerido, id }) {
    return (
        <div className="form-group">
            <FloatingLabel controlId={id} label={label} className="mb-3">
                <Form.Control  required={requerido} name={name}
                    defaultValue={value} 
                    as="textarea" style={{ height: '100px' }} />
            </FloatingLabel>
        </div>
    )
}

export default CampoTextArea;