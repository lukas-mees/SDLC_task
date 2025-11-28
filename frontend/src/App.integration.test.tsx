import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the api module
vi.mock('./api', () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn()
}))

import * as api from './api'

test('App loads tasks and allows create/delete (mocked API)', async () => {
  const initial = [{ id: 1, title: 'X', description: '', status: 'TODO', dueDate: null }]
  ;(api.fetchTasks as any).mockResolvedValue(initial)
  ;(api.createTask as any).mockImplementation(async (t) => ({ ...t, id: 2 }))
  ;(api.deleteTask as any).mockResolvedValue(undefined)

  render(<App />)

  // initial task should appear
  expect(await screen.findByText('X')).toBeInTheDocument()

  const user = userEvent.setup()

  // Open new task dialog
  const newButton = screen.getByRole('button', { name: /New Task/i })
  await user.click(newButton)

  const titleInput = screen.getByLabelText(/Title/i)
  await user.type(titleInput, 'Created')

  const saveButton = screen.getByRole('button', { name: /Save/i })
  await user.click(saveButton)

  // created task (id:2) should appear
  expect(await screen.findByText('Created')).toBeInTheDocument()

  // Delete created task (find delete button for that row)
  const deleteButtons = screen.getAllByLabelText('delete')
  // assume last is for the created one
  await user.click(deleteButtons[deleteButtons.length - 1])

  // created task should be removed from list
  expect(screen.queryByText('Created')).not.toBeInTheDocument()
})
