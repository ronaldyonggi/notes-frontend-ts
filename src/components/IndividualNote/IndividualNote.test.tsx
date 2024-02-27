import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IndividualNote from './IndividualNote';
import userEvent from '@testing-library/user-event';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    id: '21941'
  };

  // mock function to simulate an event from an action
  const mockHandler = jest.fn()

  // Here toggleImportance and deleteNote button are both assigned mockHandler. Thus when the button for toggling importance or 
  // deleting note is clicked, it just calls the mockHandler. It doesn't actually do anything.
  render(<IndividualNote note={note} toggleImportance={mockHandler} deleteNote={mockHandler}/>)

  const element = screen.getByText('Component testing is done with react-testing-library');
  screen.debug(element)
  expect(element).toBeDefined();

  /**
   * Another way of finding rendered elements is using CSS selectors
   */
  // const { container } = render(<IndividualNote note={note} toggleImportance={mockHandler} deleteNote={mockHandler}/>)
  // const div = container.querySelector('.note');
  // expect(div).toHaveTextContent('Component testing is done with react-testing-library');

})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    id: '21941'
  };

  const mockHandler = jest.fn()
  render(<IndividualNote note={note} toggleImportance={mockHandler} deleteNote={mockHandler}/>)

  // Starts a user session to interact with rendered component
  const user = userEvent.setup()

  const button = screen.getByText('make not important')
  await user.click(button)

  // Verify that the mock function has been called once
  expect(mockHandler.mock.calls).toHaveLength(1)
})