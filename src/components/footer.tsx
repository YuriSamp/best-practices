import React from 'react'
import { AiOutlineTool } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='flex flex-col pt-8 mb-3 w-full px-3'>
      <div className='flex w-full my-5 py-5 border-b'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-3'>
            <AiOutlineTool className='w-6 h-6' />
            <h3 className='text-xl'>Best-pratices</h3>
          </div>
          Provinding a cutting-edge tool to monitor every pull request you make
        </div>
      </div>
      &#169; 2023 Yuri | Codista
    </footer>
  )
}

export default Footer
