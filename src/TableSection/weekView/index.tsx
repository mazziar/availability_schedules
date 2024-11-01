import { useEffect, useState } from "react";
import { AvailabilitySchedulesType } from '../../schema/Utils'
import data from '../../data/data.json';
import baseTimeDate from '../../data/baseTime.json';

import moment from "moment";
import PersonInfo from '../../components/PersonInfo'
const Comp = () => {
    const [availabilitySchedules] = useState<AvailabilitySchedulesType[]>(data)

    const [selectedWeek, setSelectedWeek] = useState<string>(moment().format());
    const [daysOfSelectedWeek, setDaysOfSelectedWeek] = useState<string[]>([]);

    const [baseTime] = useState<string[]>(baseTimeDate)

    useEffect(() => {
        setDaysOfSelectedWeek(() => {
            var index = 0;
            var days: string[] = [];
            while (
                moment().startOf('week').format('w') ===
                moment().startOf('week').add(index, 'day').format('w')
            ) {
                days.push(
                    moment(selectedWeek)
                        .startOf('week')
                        .add(index, 'day')
                        .format(),
                );
                index += 1;
            }
            return days;
        });
    }, [selectedWeek]);


    const getUnionScheduls = (day: string) => {
        const startTime = Math.min(...availabilitySchedules.
            map(i => Math.min(...i.shifts.filter(i => i.availableWeekDays.includes(moment(day).weekday())).map(j => Math.min(j.period[0])))))
        const endTime = Math.max(...availabilitySchedules.
            map(i => Math.max(...i.shifts.filter(i => i.availableWeekDays.includes(moment(day).weekday())).map(j => Math.max(j.period[1])))))

        return {
            id: 0,
            name: 'Scheduled',
            shifts: [{
                availableWeekDays: [moment(day).weekday()],
                period: [startTime, endTime]
            }]
        }
    }

    const goToPrevWeek = () => {
        setSelectedWeek(moment(selectedWeek).add(-1, 'week').format())
    }


    const goToNextWeek = () => {
        setSelectedWeek(moment(selectedWeek).add(1, 'week').format())
    }


    return (<div className='w-100 '>
        <div className="flex ">
            <div className="flex w-6"></div>
            <div className="flex w-32"></div>
            <div className="flex flex-1 justify-between p-1">
                <div>
                </div>
                <div className="flex ">
                    <button
                        onClick={goToPrevWeek}
                        className="rounded-lg border-2 px-4">{'<'}</button>

                    <button
                        onClick={goToNextWeek}
                        className="rounded-lg border-2 px-4">{'>'}</button>

                    <div className="flex pt-2 px-4 rounded-lg border-2 w-32 justify-center	"
                    >
                        {moment(selectedWeek).format('MMMM')}
                    </div>
                </div>
            </div>
        </div>

        <div className="flex bg-gray-400 p-1 mb-1">
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

        {daysOfSelectedWeek.map(day => <>

            <div className="flex  mt-4">
                <div className="flex w-6"></div>
                <div className="flex w-32">  <p> date & time </p></div>
                <div className="flex flex-1 justify-between p-1">
                    <div>
                        <p>{moment(day).format('dddd')}</p>
                        <p className="text-xs text-gray-600"> {moment(day).format('yyyy-MM-DD')}</p>
                    </div>
                </div>
            </div>

            {
                availabilitySchedules.map((item: AvailabilitySchedulesType) =>
                    <PersonInfo
                        item={item}
                        key={item.id}
                        baseTimeLength={baseTime.length}
                        selectedDay={moment(day).weekday()}
                    />
                )
            }

            <PersonInfo
                item={getUnionScheduls(day)}
                key={10}
                baseTimeLength={baseTime.length}
                selectedDay={moment(day).weekday()}
            />

        </>)
        }


    </div >
    )
}

export default Comp