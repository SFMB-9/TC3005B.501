import { ProSidebarProvider } from 'react-pro-sidebar';
import NewAutomotiveGroupSidebar from '@/components/new_automotive_group_sidebar';


export default function Branches () {
  return (
    <>
      <div className='row' id='body-row'>
        {/* Sidebar */}
        <ProSidebarProvider>
          <NewAutomotiveGroupSidebar/>
        </ProSidebarProvider>
        {/* Page */}
        <div className='col py-3'>
          <div>
            Agencias
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}