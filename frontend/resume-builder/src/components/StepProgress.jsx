import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div className='w-full bg-purple-50 overflow-hidden rounded-[2px]'>
        <div 
        className='h-1 bg-linear-to-r from-purple-500/85 to-purple-700 transition-all rounded-2xl' 
        style={{width: `${progress}%`}}
        >
            

        </div>

    </div>
  )
}

export default StepProgress