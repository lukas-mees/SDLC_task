import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from './TaskForm'

test('TaskForm renders and calls onSave with entered title', async () => {
  const onSave = vi.fn()
  const onClose = vi.fn()

  render(<TaskForm open={true} initial={null} onClose={onClose} onSave={onSave} />)

  const user = userEvent.setup()
  const titleInput = screen.getByLabelText(/Title/i)
  await user.type(titleInput, 'Test task')

  const saveButton = screen.getByRole('button', { name: /Save/i })
  await user.click(saveButton)

  expect(onSave).toHaveBeenCalled()
  const arg = onSave.mock.calls[0][0]
  expect(arg.title).toBe('Test task')
})
