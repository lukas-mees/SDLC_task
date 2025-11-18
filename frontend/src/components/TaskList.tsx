import React from 'react'
import { Task } from '../types'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

type Props = {
  tasks: Task[]
  onEdit: (t: Task) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, status: Task['status']) => void
}

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }: Props) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Select value={task.status} onChange={e => onStatusChange(task.id!, e.target.value as Task['status'])} size="small">
                  <MenuItem value="TODO">TODO</MenuItem>
                  <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                  <MenuItem value="DONE">DONE</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{task.dueDate ?? ''}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(task)} aria-label="edit"><EditIcon/></IconButton>
                <IconButton onClick={() => onDelete(task.id!)} aria-label="delete"><DeleteIcon/></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
