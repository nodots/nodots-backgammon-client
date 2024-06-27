import { observer } from 'mobx-react'
import { NodotsMove } from '../../../GameStore/types/Play/move'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { Bar, Off, Point } from '../../../GameStore/types/Checkercontainer'

interface Props {
  moves: NodotsMove[]
}

export const buildMoveTable = ({ moves }: Props) => {
  const columns: GridColDef<(typeof moves)[number]>[] = [
    { field: 'dieValue', headerName: 'Die', width: 30 },
    {
      field: 'from',
      headerName: 'From',
      valueGetter: (rawFrom: Bar | Point) => {
        return rawFrom?.kind ? rawFrom.kind : 'n/a'
      },
      width: 90,
    },
    {
      field: 'to',
      headerName: 'To',
      valueGetter: (rawTo: Off | Point) => {
        return rawTo?.kind ? rawTo.kind : 'n/a'
      },
      width: 90,
    },
    {
      field: 'timestamp',
      headerName: 'TS',
      valueGetter: (value: string) => {
        return value
      },
      width: 90,
    },
  ]

  const table = (
    <Box className="move-history-table" sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={moves}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
  return table
}

function MoveTable({ moves }: Props) {
  return buildMoveTable({ moves })
}

export default observer(MoveTable)
