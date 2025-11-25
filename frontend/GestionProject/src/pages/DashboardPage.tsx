import DashboardComponent from '../components/dashboard/Dashboard';
import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { getDashboard } from "../redux/actions/getDashboard";
import { DashboardStats } from '@/interfaces/dashboard';

function Dashboard  ({
    dashboard,
    getDashboard,
}: {
    dashboard: DashboardStats | null;
    getDashboard: () => Promise<void>;
})  {

    const countCalled = useRef(0);

    useEffect(() => {
        if (countCalled.current >= 1) return;
        countCalled.current += 1;
        getDashboard();
    }, [getDashboard]);

    return (
        <div>
            {dashboard && <DashboardComponent dashboard={dashboard} />}
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    dashboard: state.getDashboardReducer?.dashboard ?? null,
});

export default connect(mapStateToProps, { getDashboard })(Dashboard);
