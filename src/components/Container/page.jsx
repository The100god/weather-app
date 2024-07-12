import { cn } from '../../utils/cn'
import React from 'react'

const Container = (props) => {
  return (
    <div {...props}
    className={cn(
      "w-full bg-white border rounded-xl flex py-4 shadow-sm",
      props.className
    )}
        
    />
      
    
  )
}

export default Container
