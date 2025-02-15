import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CoursesFilters } from '@/components/dashboard/courses/courses-filters';
import { CoursesTable } from '@/components/dashboard/courses/courses-table';
import type { Course } from '@/components/dashboard/courses/courses-table';

export const metadata = { title: `Cursos | Dashboard | ${config.site.name}` } satisfies Metadata;

const courses: Course[] = [
  {
    id: 'CRS-010',
    name: 'Introducción a la Programación',
    instructor: 'Juan Pérez',
    startDate: dayjs().subtract(10, 'days').toDate(),
    endDate: dayjs().add(20, 'days').toDate(),
    students: 35,
    category: 'Programación',
    image: '',
  },
  {
    id: 'CRS-009',
    name: 'Bases de Datos Avanzadas',
    instructor: 'María Gómez',
    startDate: dayjs().subtract(5, 'days').toDate(),
    endDate: dayjs().add(25, 'days').toDate(),
    students: 28,
    category: 'Bases de Datos',
    image: '',
  },
  {
    id: 'CRS-008',
    name: 'Desarrollo Web con React',
    instructor: 'Carlos López',
    startDate: dayjs().subtract(15, 'days').toDate(),
    endDate: dayjs().add(10, 'days').toDate(),
    students: 40,
    category: 'Desarrollo Web',
    image: '',
  },
];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCourses = applyPagination(courses, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Gestión de Cursos</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Importar
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Exportar
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Agregar Curso
          </Button>
        </div>
      </Stack>
      <CoursesFilters />
      <CoursesTable
        count={courses.length}
        page={page}
        rows={paginatedCourses}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Course[], page: number, rowsPerPage: number): Course[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
