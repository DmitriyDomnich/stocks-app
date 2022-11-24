import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import AddNewGroupForm from '.';
import userEvent from '@testing-library/user-event';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("shouldn't call onSubmit function with empty input field", () => {
  const onSubmit = jest.fn();

  render(<AddNewGroupForm onSubmit={onSubmit} />, container);

  userEvent.click(screen.getByTestId('show-dialog-button'));

  const groupNameInput = screen.getByRole('textbox');

  const submitBtn = screen.getByRole('button', { name: /add/i });

  userEvent.click(submitBtn);
  expect(onSubmit).not.toHaveBeenCalled();

  userEvent.type(groupNameInput, 'new group');
  userEvent.click(submitBtn);
  expect(onSubmit).toHaveBeenCalled();
});
