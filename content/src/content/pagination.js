import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux'

export default function PaginationRounded() {
  const dispatch = useDispatch();
  const { callback, page } = useSelector(state => state.microfrontendState);
  return (
    <Stack spacing={2}>
      <Pagination onChange={(e, value) =>
        dispatch(callback(1, value))
      } count={page} variant="text" color='primary' shape="rounded" />
    </Stack>
  );
}