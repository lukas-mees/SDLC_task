import React, { useEffect, useState } from 'react'
import { Container, AppBar, Toolbar, Typography, Button, Box, Alert } from '@mui/material'
import { fetchTasks, createTask, updateTask, deleteTask } from './api'
import { Task } from './types'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loadingError, setLoadingError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)

  async function load() {
    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (err: any) {
      setLoadingError(err?.response?.data?.error || err.message || 'Failed to load tasks')
    }
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setFormOpen(true)
  }

  async function handleSave(task: Task) {
    try {
      if (task.id) {
        const updated = await updateTask(task.id, task)
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))
      } else {
        const created = await createTask(task)
        setTasks(prev => [...prev, created])
      }
      setFormOpen(false)
    } catch (err: any) {
      setLoadingError(err?.response?.data?.error || err.message || 'Save failed')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err: any) {
      setLoadingError(err?.response?.data?.error || err.message || 'Delete failed')
    }
  }

  async function handleStatusChange(id: number, status: Task['status']) {
    const t = tasks.find(x => x.id === id)
    if (!t) return
    try {
      const updated = await updateTask(id, { ...t, status })
      setTasks(prev => prev.map(x => (x.id === id ? updated : x)))
    } catch (err: any) {
      setLoadingError(err?.response?.data?.error || err.message || 'Status update failed')
    }
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Task Manager</Typography>
          <Button color="inherit" onClick={openNew}>New Task</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {loadingError && <Alert severity="error" onClose={() => setLoadingError(null)}>{loadingError}</Alert>}
        <TaskList tasks={tasks} onEdit={(t) => { setEditing(t); setFormOpen(true) }} onDelete={handleDelete} onStatusChange={handleStatusChange} />
        <TaskForm open={formOpen} initial={editing} onClose={() => setFormOpen(false)} onSave={handleSave} />
        <Box sx={{ mt: 4 }}>
          <Typography variant="caption">Backend: Spring Boot (H2), Frontend: React + TypeScript + MUI</Typography>
        </Box>
      </Container>
    </div>
  )
}
