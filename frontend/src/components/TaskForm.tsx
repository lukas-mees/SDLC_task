import React, { useEffect, useState } from 'react'
import { Task, Status } from '../types'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material'

type Props = {
  open: boolean
  initial?: Task | null
  onClose: () => void
  onSave: (task: Task) => void
}

export default function TaskForm({ open, initial, onClose, onSave }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Status>('TODO')
  const [dueDate, setDueDate] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (initial) {
      setTitle(initial.title)
      setDescription(initial.description || '')
      setStatus(initial.status)
      setDueDate(initial.dueDate ?? undefined)
    } else {
      setTitle('')
      setDescription('')
      setStatus('TODO')
      setDueDate(undefined)
    }
  }, [initial, open])

  function handleSave() {
    const task: Task = {
      id: initial?.id,
      title,
      description,
      status,
      dueDate: dueDate || null,
    }
    onSave(task)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? 'Edit Task' : 'New Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required inputProps={{ maxLength: 100 }} />
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline rows={3} inputProps={{ maxLength: 500 }} />
          <TextField select label="Status" value={status} onChange={e => setStatus(e.target.value as Status)}>
            <MenuItem value="TODO">TODO</MenuItem>
            <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
          </TextField>
          <TextField label="Due Date" type="date" value={dueDate ?? ''} onChange={e => setDueDate(e.target.value)} InputLabelProps={{ shrink: true }} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  )
}
