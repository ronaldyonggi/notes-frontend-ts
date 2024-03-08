import { render, screen } from '@testing-library/react'
import NoteItem from './NoteItem'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    id: '492913'
  }

  const mockHandler = vi.fn()

  render(<NoteItem note={note} toggleImportance={mockHandler} deleteNote={mockHandler} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    id: '21941',
  };

  const mockHandler = vi.fn()

  render(<NoteItem note={note} toggleImportance={mockHandler} deleteNote={mockHandler} />)

  // Starts a user session to interact with rendered component
  const user = userEvent.setup();

  const button = screen.getByText('make not important');
  await user.click(button);

  // Verify that the mock function has been called once
  expect(mockHandler.mock.calls).toHaveLength(1);
})