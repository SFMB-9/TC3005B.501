import { ProSidebarProvider } from 'react-pro-sidebar';
import NewAutomotiveGroupSidebar from '@/components/new_automotive_group_sidebar';
import NewAutomotiveGroupHeader from '@/components/new_automotive_group_header';


export default function Docs () {
  return (
    <>
      <div className='row' id='body-row' style={{display: 'flex'}}>
        {/* Sidebar */}
        <ProSidebarProvider>
          <NewAutomotiveGroupSidebar/>
        </ProSidebarProvider>
        {/* Page */}
        <NewAutomotiveGroupHeader/>
        <div className='col py-3'>
          <div>
            Sube tus documentos y espera a que sean aprobados
          </div>
          <div>
            (Doc-state-editbtn table)
          </div>
        </div>
      </div>
    </>
  )
}