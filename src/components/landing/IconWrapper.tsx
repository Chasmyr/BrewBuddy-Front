import { Box } from '@mui/material'
import { ReactElement } from 'react'
import React from 'react'
import { SvgIconProps } from '@mui/material/SvgIcon'

type IconWrapperProps = {
  children: ReactElement<SvgIconProps>
  bgColor?: string
  iconColor?: string
  size?: number
}

const IconWrapper = ({ children, bgColor = '#FDDEBC', iconColor = 'primary.main', size = 40 }: IconWrapperProps) => {
  return (
    <Box
        sx={{
            backgroundColor: bgColor,
            padding: 1,
            borderRadius: "50%",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: size,
            height: size
        }}
    >
        {React.cloneElement(children, { sx: { color: iconColor, width: size, height: size} })}
    </Box>
  )
}

export default IconWrapper
