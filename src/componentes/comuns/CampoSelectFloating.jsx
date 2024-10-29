'use client'

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
export default function CampoSelectFloating(props) {
    return (
        <div className="form-group">
            <FloatingLabel controlId={props.id} label={props.label}>
                <Form.Select name={props.name}
                    defaultValue={props.value}
                    required={props.required}>
                    {props.children}
                </Form.Select>
            </FloatingLabel>
            <br />
        </div>
    )
}