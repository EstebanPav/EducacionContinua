"use client";

import * as React from "react";
import { Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from "@mui/material";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import dayjs from "dayjs";

import { EnrollmentsTable } from "@/components/dashboard/enrollments/enrollments-table";
import { EnrollmentsFilters } from "@/components/dashboard/enrollments/enrollments-filters";
import type { Enrollment } from "@/components/dashboard/enrollments/enrollments-table";

export default function Page(): React.JSX.Element {
  const [enrollments, setEnrollments] = React.useState<Enrollment[]>([
    {
      id: "ENR-001",
      studentName: "Carlos Gómez",
      courseName: "Desarrollo Web con React",
      enrollmentDate: dayjs().subtract(5, "days").toDate(),
      status: "Activo",
    },
    {
      id: "ENR-002",
      studentName: "María López",
      courseName: "Bases de Datos",
      enrollmentDate: dayjs().subtract(10, "days").toDate(),
      status: "Inactivo",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newEnrollment, setNewEnrollment] = React.useState<Enrollment>({
    id: "",
    studentName: "",
    courseName: "",
    enrollmentDate: new Date(),
    status: "Activo",
  });

  const handleAddEnrollment = () => {
    setEnrollments([...enrollments, { ...newEnrollment, id: `ENR-${enrollments.length + 1}` }]);
    setOpen(false);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Gestión de Matrículas</Typography>
        </Stack>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpen(true)}>
          Agregar Matrícula
        </Button>
      </Stack>
      <EnrollmentsFilters />

      {/* Diálogo para agregar matrícula */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Matrícula</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre del Estudiante"
              variant="outlined"
              fullWidth
              value={newEnrollment.studentName}
              onChange={(e) => setNewEnrollment({ ...newEnrollment, studentName: e.target.value })}
            />
            <TextField
              label="Nombre del Curso"
              variant="outlined"
              fullWidth
              value={newEnrollment.courseName}
              onChange={(e) => setNewEnrollment({ ...newEnrollment, courseName: e.target.value })}
            />
            <TextField
              select
              label="Estado"
              variant="outlined"
              fullWidth
              value={newEnrollment.status}
              onChange={(e) => setNewEnrollment({ ...newEnrollment, status: e.target.value as "Activo" | "Inactivo" })}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAddEnrollment}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
