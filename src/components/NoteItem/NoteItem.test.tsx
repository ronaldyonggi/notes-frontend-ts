import { render, screen } from '@testing-library/react'
import NoteItem from './NoteItem'

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