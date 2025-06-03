import React from 'react';

// import { Container } from './styles';

export const  PageContainer  = ({children}:{children:React.ReactNode})=> {
return <div className='space-y-6 p-6 w-full bg-[#FAFAFA]'>{children}</div>
}

export const PageHeader =({children}:{children:React.ReactNode})=> {
return <div className='flex items-center justify-between'>{children}</div>
}
export const PageHeaderContent =({children}:{children:React.ReactNode})=> {
    return <div className='flex flex-col'>{children}</div>
    }

export const PageTitle = ({children}:{children:React.ReactNode})=> {
return <h1 className='text-2xl font-bold'>{children}</h1>
}

export const PageSubtitle = ({children}:{children:React.ReactNode})=> {
return <p className='text-sm text-muted-foreground'>{children}</p>
}

export const PageContent = ({children}:{children:React.ReactNode})=> {
return <div className='space-y-6'>{children}</div>
}

export const PageActions = ({children}:{children:React.ReactNode})=> {
return <div className='flex items-center justify-end '>{children}</div>
}


