import React, { FC, useEffect, useState, useCallback } from "react";
import { shiftType, AvailabilitySchedulesType } from '../schema/Utils'
import moment from "moment";

type PropsType = {
    item: AvailabilitySchedulesType
    baseTimeLength: number
    selectedDay: number
}

const Comp: FC<PropsType> = ({ item, baseTimeLength, selectedDay }) => {

    const shiftsNumber = item.shifts.length
    const shiftshour = item.shifts.map(i => i.period[1] - i.period[0]).reduce((a, b) => a + b)
    return (
        <div className="flex p-1 ">
            <div className="flex w-6">
                <input type="checkBox"></input>
            </div>

            <div className="flex-none w-32 " >
                {item.name}
                {!!item.shifts.filter(i => i.availableWeekDays.includes(selectedDay)).length ?
                    <p className="text-xs text-gray-500">
                        {shiftshour} hrs {shiftsNumber} shifts
                    </p> :
                    <p className="text-xs text-gray-500">
                        no Scheduled
                    </p>
                }

            </div>

            <div className="relative flex flex-1 content-center">
                {item.shifts.filter(i => i.availableWeekDays.includes(selectedDay)).map((i: shiftType) => <div style={{
                    left: `${((i.period[0] - 5) * 100 / baseTimeLength)}%`,
                    width: `${(((i.period[1] - i.period[0]) * 100 / baseTimeLength))}%`
                }}
                    className={`absolute rounded-lg border-2
              ${item.id === 5 && 'bg-orange-200  border-orange-200'}
              ${item.id === 1 && 'bg-lime-200  border-lime-200'}
              ${item.id === 2 && 'bg-violet-200  border-violet-200'}
              ${item.id === 3 && 'bg-amber-200  border-amber-200'}
              ${item.id === 4 && 'bg-red-200  border-red-200'}
              text-gray-800 p-2 text-sm `}>
                    {item.name}  {i.period[0] + ':00'} -  {i.period[1] + ':00'}
                </div>)}
            </div>
        </div>
    )
}

export default Comp