"use client";

import * as React from "react";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  Stack,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { useSelection } from "@/hooks/use-selection";

export interface Form {
  id: string;
  name: string;
  createdAt: Date;
  status: "Activo" | "Inactivo";
}

interface FormsTableProps {
  count?: number;
  page?: number;
  rows?: Form[];
  rowsPerPage?: number;
}

export function FormsTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: FormsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => rows.map((form) => form.id), [rows]);
  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    event.target.checked ? selectAll() : deselectAll();
                  }}
                />
              </TableCell>
              <TableCell>Nombre del Formulario</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const isSelected = selected?.has(row.id);
              return (
                <TableRow hover key={row.id} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        event.target.checked ? selectOne(row.id) : deselectOne(row.id);
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{dayjs(row.createdAt).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(event, newPage) => {
            console.log("Cambio de página:", newPage);
        }}
        onRowsPerPageChange={(event) => {
            console.log("Filas por página:", parseInt(event.target.value, 10));
        }}
        />

    </Card>
  );
}
