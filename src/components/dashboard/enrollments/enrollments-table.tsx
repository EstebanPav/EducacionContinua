"use client";

import * as React from 'react';
import { Card, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, TablePagination, Box, Typography, Stack } from '@mui/material';
import dayjs from 'dayjs';

export interface Enrollment {
  id: string;
  studentName: string;
  courseName: string;
  enrollmentDate: Date;
  status: string;
}
 
interface EnrollmentsTableProps {
  enrollments: Enrollment[];
}

export function EnrollmentsTable({ enrollments }: EnrollmentsTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '600px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Estudiante</TableCell>
              <TableCell>Curso</TableCell>
              <TableCell>Fecha de Matrícula</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>{enrollment.studentName}</TableCell>
                <TableCell>{enrollment.courseName}</TableCell>
                <TableCell>{dayjs(enrollment.enrollmentDate).format('MMM D, YYYY')}</TableCell>
                <TableCell>{dayjs(enrollment.status).format('MMM D, YYYY')}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
