import { Button } from '@mui/material'
import React from 'react'

function Home() {

    const alertaBtn = () => {
        alert('Botão clicado')
    }

    return (
        <>
            <div className='bg-slate-500'>Home</div>
            <Button variant="contained" onClick={() => alertaBtn()}>Hello world</Button>
        </>
    )
}

export default Home