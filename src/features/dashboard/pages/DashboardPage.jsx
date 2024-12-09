import React from 'react'
import ModuleButton from '../components/ModuleButton';
import LogoutButton from '../../../components/LogoutButton';
import Container from '../../../components/Container';
import { LuDatabaseBackup, LuFile, LuMonitor, LuUsers } from 'react-icons/lu';

const DashboardPage = () => {
    return (
        <section>
            <Container>
                <div className="text-end mb-3">
                    <LogoutButton />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-0 sm:gap-x-5">
                    <div className="col-span-1">
                        <ModuleButton name="Products" icon={<LuDatabaseBackup className='size-12' />} url="/dashboard/products" />
                    </div>
                    <div className="col-span-1">
                        <ModuleButton name="Sale" icon={<LuMonitor className='size-12' />} url="/dashboard/sales" />
                    </div>
                    <div className="col-span-1">
                        <ModuleButton name="Voucher" icon={<LuFile className='size-12' />} url="/dashboard/vouchers" />
                    </div>
                    <div className="col-span-1">
                        <ModuleButton name="User Profile" icon={<LuUsers className='size-12' />} url="/dashboard/user-profile" />
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default DashboardPage