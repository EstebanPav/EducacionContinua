import * as React from 'react';
import { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';

import { config } from '@/config';
import { NotificationsFilters } from '@/components/dashboard/notifications/notifications-filter';
import { NotificationsTable } from '@/components/dashboard/notifications/notifications-table';
import type { Notification } from '@/components/dashboard/notifications/notifications-table';

export const metadata = { title: `Notificaciones | Dashboard | ${config.site.name}` } satisfies Metadata;

const notifications: Notification[] = [
  {
    id: 'NTF-001',
    title: 'Nuevo mensaje de sistema',
    message: 'El sistema ha actualizado sus parámetros de configuración.',
    date: dayjs().toDate(),
    read: false,
  },
  {
    id: 'NTF-002',
    title: 'Nueva asignación de curso',
    message: 'Se ha asignado un nuevo curso a tu perfil.',
    date: dayjs().subtract(1, 'day').toDate(),
    read: true,
  },
  {
    id: 'NTF-003',
    title: 'Aviso importante',
    message: 'Recuerda que mañana hay una actualización programada del sistema.',
    date: dayjs().subtract(2, 'days').toDate(),
    read: false,
  },
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedNotifications = applyPagination(notifications, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Gestión de Notificaciones</Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Agregar Notificación
          </Button>
        </div>
      </Stack>
      <NotificationsFilters />
      <NotificationsTable
        count={notifications.length}
        page={page}
        rows={paginatedNotifications}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Notification[], page: number, rowsPerPage: number): Notification[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
