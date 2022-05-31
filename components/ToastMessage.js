import { Message } from 'rsuite';

export default function ToastMessage({ message, type }) {
  return (
    <Message showIcon type={type || 'error'} duration={5000} closable>
      {message || 'Error'}.
    </Message>
  );
}
