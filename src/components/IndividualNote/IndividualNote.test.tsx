import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import IndividualNote from './IndividualNote';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
    id: '21941'
  };

  const mockHandler = jest.fn()

  render(<IndividualNote note={note} toggleImportance={mockHandler} deleteNote={mockHandler}/>)

  const element = screen.getByText('Component testing is done with react-testing-library');
  expect(element).toBeDefined();


  /**
   * Another way of finding rendered elements is using CSS selectors
   */
  // const { container } = render(<IndividualNote note={note} toggleImportance={mockHandler} deleteNote={mockHandler}/>)
  // const div = container.querySelector('.note');
  // expect(div).toHaveTextContent('Component testing is done with react-testing-library');

})