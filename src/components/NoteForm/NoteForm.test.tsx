import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const addNote = jest.fn();
  const user = userEvent.setup()

  render(<NoteForm addNote={addNote} />)

  const input = screen.getByRole('textbox')
  const saveButton = screen.getByText('save note')

  await user.type(input, 'testing a form...')
  await user.click(saveButton)

  expect(addNote.mock.calls).toHaveLength(1)
  expect(addNote.mock.calls[0][0]).toBe('testing a form...')
})