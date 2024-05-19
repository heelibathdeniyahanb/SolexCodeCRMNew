import { Link } from 'react-router-dom';
import RectangularCard from './RectangularCard';
import AdminSideNavBar from '../../Pages/Admin/AdminSideNavBar';
import Header from '../Header/Header';
import AnalyzingMenu from './AnalyzingMenu';

export default function AnalysePage() {
    return (
        <>
            <Header />

            <div className='mt-10'>
                <AnalyzingMenu />
            </div>

            <div className='flex'>
                <AdminSideNavBar />
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    <RectangularCard
                        title="Current Clients"
                        subtitle="100"
                        content="Last month: 2000"
                    />
                    <RectangularCard
                        title="Current Leads"
                        subtitle="100"
                        content="Last month: 2000"
                    />
                    <RectangularCard
                        title="Revenue Generated"
                        subtitle="100"
                        content="Last month: 2000"
                    />
                    <RectangularCard
                        title="Leads in Progress"
                        subtitle="100"
                        content="Last month: 2000"
                    />
                    <RectangularCard
                        title="New Clients"
                        subtitle="100"
                        content="Last month: 2000"
                    />
                    <RectangularCard
                        title="Current Tickets"
                        subtitle="100"
                        content="Last month: 2000"
                    />
                </div>
            </div>
        </>
    );
}
