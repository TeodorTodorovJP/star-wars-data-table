import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import DetailsTable from "./DetailsTable"
import { Person } from "./peopleApiSlice"
import { memo, useState } from "react"
import { StyledTableCell, StyledTableRow } from "../../theme"

const Row = (props: { row: Person }) => {
  const { row } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.mass}</StyledTableCell>
        <StyledTableCell align="right">{row.height}</StyledTableCell>
        <StyledTableCell align="right">{row.hair_color}</StyledTableCell>
        <StyledTableCell align="right">{row.skin_color}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DetailsTable details={row.details} />
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

export default memo(Row)
