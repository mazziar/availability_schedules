import React, { useState } from "react";
import { RouteList } from "./RouteList";
import DayView from "./dayView"
import WeekView from "./weekView"

type typeViewType = 'day' | 'week'

const Comp = () => {
    const [typeView, setTypeView] = useState<typeViewType>(
        localStorage.getItem('viewModel') as typeViewType || 'day'
    )

    const changeView = (view: typeViewType) => {
        localStorage.setItem('viewModel', view)
        setTypeView(view)
    }

    return <div className="w-100 p-5">
        <div className="flex">
            <button
                onClick={() => changeView('week')}
                className={`rounded-l-lg border-2 px-4 ${typeView === 'week' && ' bg-gray-200'}`}
            >
                week view
            </button>
            <button
                onClick={() => changeView('day')}
                className={`rounded-r-lg border-2 px-4 ${typeView === 'day' && ' bg-gray-200'}`}
            >
                day view
            </button>
        </div>
        {typeView == 'day' && <DayView />}
        {typeView == 'week' && <WeekView />}
    </div>
}

export default Comp