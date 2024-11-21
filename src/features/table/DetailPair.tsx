import { Stack } from "@mui/material"

import Typography from "@mui/material/Typography"
import { memo } from "react"

const DetailPair = (props: { label: string; value: string }) => {
  const { label, value } = props

  return (
    <Stack sx={{ margin: 1, justifyContent: "space-between" }} direction="row">
      <Typography align="left" variant="h6" gutterBottom component="div">
        {label}
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        {value}
      </Typography>
    </Stack>
  )
}

export default memo(DetailPair)
