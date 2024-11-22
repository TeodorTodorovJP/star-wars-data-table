import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Details } from "./peopleApiSlice"
import { Paper } from "@mui/material"
import DetailPair from "./DetailPair"
import { memo } from "react"

const DetailsBox = (props: { details: Details }) => {
  const { details } = props

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h6" gutterBottom component="div">
        Details
      </Typography>
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        {Object.values(details).map(({ label, value }) => (
          <DetailPair key={label} label={label} value={value} />
        ))}
      </Paper>
    </Box>
  )
}

export default memo(DetailsBox)
