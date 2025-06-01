import { Box } from "@mui/material"
import React, { ReactElement } from "react"

type ApplicationDetailsWrapperProps = {
  children: ReactElement
  bgColor?: string
  size?: number
}

const ApplicationDetailsWrapper = ({children, bgColor = "#FCF7EB", size = 40}: ApplicationDetailsWrapperProps) => {

    return (
        <Box
            sx={{
                bgcolor: bgColor,
                width: size,
                height: size,
                borderRadius: 3,
                boxShadow: 1
            }}
        >
            {React.cloneElement(children)}
        </Box>
    )
}

export default ApplicationDetailsWrapper