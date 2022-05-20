import { forwardRef } from 'react';
import { Form } from 'rsuite';

const Field = forwardRef(function FieldComponent(props, ref) {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={name} ref={ref} className={error ? 'has-error' : ''}>
      {label && <Form.ControlLabel>{label}</Form.ControlLabel>}
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
      {message && <Form.HelpText>{message}</Form.HelpText>}
    </Form.Group>
  );
});

export default Field;
