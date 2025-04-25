import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';

const LinkList = ({ links }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Дата и время</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>{link.id}</TableCell>
              <TableCell>{link.date}</TableCell>
              <TableCell>{link.amount}</TableCell>
              <TableCell>
                <Chip label={link.status} color={getStatusColor(link.status)} />
              </TableCell>
              <TableCell>
                {link.status === 'active' && (
                  <Button variant="outlined" color="error" size="small">
                    Отменить
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LinkList;