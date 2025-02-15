"use client";

import * as React from "react";
import { Button, Stack, TextField } from "@mui/material";

export function FormsFilters(): React.JSX.Element {
  const [search, setSearch] = React.useState("");

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <TextField
        label="Buscar formulario"
        variant="outlined"
        size="small"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Button variant="contained" color="primary">
        Filtrar
      </Button>
    </Stack>
  );
}
