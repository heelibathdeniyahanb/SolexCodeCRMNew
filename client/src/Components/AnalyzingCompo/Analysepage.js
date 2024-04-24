import { Link } from 'react-router-dom';
import RectangularCard from '../Components/RectangularCard';

export default function AnalysePage() {
    return (
        <>
            <h2 className="text-4xl font-bold tracking-tight text-#559b9f sm:text-6xl text-[#294D61]">Analyzing</h2>
            <div className='mt-10'>
                <div className="inline-flex rounded-md shadow-sm" style={{ justifyContent: 'space-between' }} role="group">
                    <Link to='/analyse/report'>
                        <button type="button" className="w-px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                style={{
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: '#294D61',
                                    color: '#ffffff'
                                }}> Reports
                        </button>
                    </Link>
                    <Link to='/analyse/charts'>
                        <button type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                style={{
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: '#294D61',
                                    color: '#ffffff'
                                }}> Charts
                        </button>
                    </Link>
                    <Link to='/analyse/kpi'>
                        <button type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                style={{
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: '#294D61',
                                    color: '#ffffff'
                                }}>
                            KPI
                        </button>
                    </Link>
                    <Link to='/analyse/comparator'>
                        <button type="button"
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                                style={{
                                    marginRight: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: '#294D61',
                                    color: '#ffffff'
                                }}>
                            Comparator
                        </button>
                    </Link>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{padding: '1rem'}}>
                    <div>
                            <RectangularCard
                                title="Current Clients"
                                subtitle="100"
                                content="Last month: 2000"
                            />
                    </div>
                    <div>
                            <RectangularCard
                                title="Current Leads"
                                subtitle="100"
                                content="Last month: 2000"
                            />
                    </div>
                    <div>
                            <RectangularCard
                                title="Revenue Generated"
                                subtitle="100"
                                content="Last month: 2000"
                            />
                    </div>
                    <div>
                            <RectangularCard
                                title="Leads on Progress"
                                subtitle="100"
                                content="Last month: 2000"
                            />
                    </div>
                    <div>
                            <RectangularCard
                                title="New Clients"
                                subtitle="100"
                                content="Last month: 2000"
                            />
                    </div>
                    <div>
                            <RectangularCard
                                title="Current Tickets"
                                subtitle="100"
                                content="Last month: 2000"
                            />
                    </div>
                </div>
            </div>
        </>
    )
}