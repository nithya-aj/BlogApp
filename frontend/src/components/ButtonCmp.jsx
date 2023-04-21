import Button from '@mui/material/Button';
import React from 'react'

const ButtonCmp = ({props, sx, type, click}) => {
  return (
    <Button type={type} onClick={click} variant="outlined" color="inherit" sx={{ borderColor: '#fb8c00', ...sx}}>{props}</Button>
  )
}

export default ButtonCmp