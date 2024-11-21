import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

import Row from "./TableRow"
import { Button, Container, TablePagination, Typography } from "@mui/material"
import { MouseEvent, useState } from "react"
import TablePaginationActions from "./TablePaginationActions"
import { useGetPeopleQuery } from "./peopleApiSlice"
import { useAppDispatch } from "../../app/hooks"
import { logout } from "../signUp/signUpSlice"
import { PAGE_SIZE } from "../../app/constants"

/**
 * The component works with the more modern state management approach, using createApi
 */
export default function PeopleTable() {
  const [page, setPage] = useState(0)

  const dispatch = useAppDispatch()

  const { data, isError, isLoading, isSuccess, isFetching } = useGetPeopleQuery(page)

  const handleChangePage = (_: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const logoutUser = () => {
    dispatch(logout())
  }

  if (isError) {
    return (
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <Button type="button" fullWidth variant="contained" sx={{ width: "fit-content" }} onClick={logoutUser}>
          Log Out
        </Button>
        <Typography variant="h1">There was an error!!!</Typography>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <div>
        <Typography variant="h1">Loading...</Typography>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
        <Button type="button" fullWidth variant="contained" sx={{ width: "fit-content" }} onClick={logoutUser}>
          Log Out
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Mass</TableCell>
                <TableCell align="right">Height</TableCell>
                <TableCell align="right">Heir Color</TableCell>
                <TableCell align="right">Skin Color</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          /** The API does not provide a rows per page option, so 10 is the only available one */
          rowsPerPageOptions={[PAGE_SIZE, { label: "All", value: -1 }]}
          colSpan={3}
          count={data.count}
          rowsPerPage={PAGE_SIZE}
          page={page}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          onPageChange={handleChangePage}
          ActionsComponent={TablePaginationActions}
        />
        <Typography>{isFetching ? "Loading" : null}</Typography>
      </Container>
    )
  }
}
