"use client";

import * as React from "react";
import { Button, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from "@mui/material";
import { Plus as PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import dayjs from "dayjs";

import { FormsTable } from "@/components/dashboard/forms/forms-table";
import { FormsFilters } from "@/components/dashboard/forms/forms-filters";
import type { Form } from "@/components/dashboard/forms/forms-table";

export default function Page(): React.JSX.Element {
  const [forms, setForms] = React.useState<Form[]>([
    {
      id: "FRM-001",
      name: "Encuesta de satisfacción",
      createdAt: dayjs().subtract(5, "days").toDate(),
      status: "Activo",
    },
    {
      id: "FRM-002",
      name: "Registro de asistencia",
      createdAt: dayjs().subtract(10, "days").toDate(),
      status: "Inactivo",
    },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newForm, setNewForm] = React.useState<Form>({
    id: "",
    name: "",
    createdAt: new Date(),
    status: "Activo",
  });

  const handleAddForm = () => {
    setForms([...forms, { ...newForm, id: `FRM-${forms.length + 1}` }]);
    setOpen(false);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Gestión de Formularios</Typography>
        </Stack>
        <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpen(true)}>
          Agregar Formulario
        </Button>
      </Stack>
      <FormsFilters />
      <FormsTable count={forms.length} page={0} rows={forms} rowsPerPage={5} />

      {/* Diálogo para agregar formulario */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar Formulario</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre del Formulario"
              variant="outlined"
              fullWidth
              value={newForm.name}
              onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
            />
            <TextField
              select
              label="Estado"
              variant="outlined"
              fullWidth
              value={newForm.status}
              onChange={(e) => setNewForm({ ...newForm, status: e.target.value as "Activo" | "Inactivo" })}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleAddForm}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
