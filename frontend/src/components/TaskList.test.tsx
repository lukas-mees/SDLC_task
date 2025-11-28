import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskList from './TaskList'
import { Task } from '../types'

test('TaskList renders tasks and triggers callbacks', async () => {
  const tasks: Task[] = [
    { id: 1, title: 'A', description: 'desc A', status: 'TODO', dueDate: null },
    { id: 2, title: 'B', description: 'desc B', status: 'IN_PROGRESS', dueDate: '2025-12-01' }
  ]

  const onEdit = vi.fn()
  const onDelete = vi.fn()
  const onStatusChange = vi.fn()

  render(<TaskList tasks={tasks} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />)

  // Check titles present
  expect(screen.getByText('A')).toBeInTheDocument()
  expect(screen.getByText('B')).toBeInTheDocument()

  const user = userEvent.setup()

  // Click edit on first row
  const editButtons = screen.getAllByLabelText('edit')
  await user.click(editButtons[0])
  expect(onEdit).toHaveBeenCalledWith(tasks[0])

  // Click delete on second row
  const deleteButtons = screen.getAllByLabelText('delete')
  await user.click(deleteButtons[1])
  expect(onDelete).toHaveBeenCalledWith(2)

  // Change status select for first row (combobox)
  const selects = screen.getAllByRole('combobox')
  // open first select and choose DONE
  await user.click(selects[0])
  const done = await screen.findByText('DONE')
  await user.click(done)
  expect(onStatusChange).toHaveBeenCalled()
})
