import { useEffect, useState } from "react";
import { AvailabilitySchedulesType } from '../../schema/Utils'
import data from '../../data/data.json';
import baseTimeDate from '../../data/baseTime.json';

import moment from "moment";
import PersonInfo from '../../components/PersonInfo'
const Comp = () => {
    const [availabilitySchedules] = useState<AvailabilitySchedulesType[]>(data)
    const [unionScheduls, setUnionScheduls] = useState<AvailabilitySchedulesType>()
    const [selectedDay, setSelectedDay] = useState(moment().format())
    const [baseTime] = useState<string[]>(baseTimeDate)

    useEffect(() => {
        const startTime = Math.min(...availabilitySchedules.
            map(i => Math.min(...i.shifts.filter(i => i.availableWeekDays.includes(moment(selectedDay).weekday())).map(j => Math.min(j.period[0])))))
        const endTime = Math.max(...availabilitySchedules.
            map(i => Math.max(...i.shifts.filter(i => i.availableWeekDays.includes(moment(selectedDay).weekday())).map(j => Math.max(j.period[1])))))

        setUnionScheduls({
            id: 0,
            name: 'Scheduled',
            shifts: [{
                availableWeekDays: [moment(selectedDay).weekday()],
                period: [startTime, endTime]
            }]
        })
    }, [selectedDay])

    const goToPrevDay = () => {
        setSelectedDay(moment(selectedDay).add(-1, 'day').format())
    }


    const goToNextDay = () => {
        setSelectedDay(moment(selectedDay).add(1, 'day').format())
    }


    return (<div className='w-100'>
        <div className="flex ">
            <div className="flex w-6"></div>
            <div className="flex w-32"></div>
            <div className="flex flex-1 justify-between p-1">
                <div>
                    <p> date & time </p>
                    <p className="text-xs text-gray-500"> {moment(selectedDay).format('yyyy-MM-DD')}</p>
                </div>
                <div className="flex ">
                    <button
                        onClick={goToPrevDay}
                        className="rounded-lg border-2 px-4">{'<'}</button>
                    <div className="flex pt-2 px-4 rounded-lg border-2 w-32 justify-center	"
                    > {moment(selectedDay).format('dddd')}</div>
                    <button
                        onClick={goToNextDay}
                        className="rounded-lg border-2 px-4">{'>'}</button>
                </div>
            </div>
        </div>

        <div className="flex bg-gray-200 p-1 mb-1">
            <div className="flex w-6">
                <input type="checkBox"></input>
            </div>

            <div className="flex-none w-32">
                select all
            </div>

            <div className="relative flex flex-1 content-center">
                {
                    baseTime.map((timeItem, index) =>
                        <div key={timeItem + index}
                            style={{ left: `${(index) * 100 / baseTime.length}%`, }}
                            className="absolute flex-none ">
                            {timeItem}
                        </div>
                    )
                }
            </div>
        </div>

        {availabilitySchedules.map((item: AvailabilitySchedulesType) =>
            <PersonInfo
                item={item}
                key={item.id}
                baseTimeLength={baseTime.length}
                selectedDay={moment(selectedDay).weekday()}
            />
        )}

        {unionScheduls && <PersonInfo
            item={unionScheduls}
            key={10}
            baseTimeLength={baseTime.length}
            selectedDay={moment(selectedDay).weekday()}
        />
        }
    </div>
    )
}

export default Comp