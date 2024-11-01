import React, { FC, useEffect, useState, useCallback } from "react";
import data from '../data/data.json';
import moment from "moment";

const RouteList = () => {

  const [baseTime, setBaseTime] = useState<string[]>([
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '19:00', '20:00', '21:00', '22:00',
    '23:00'
  ])

  return (<div className='w-100'>
    <div className="flex bg-gray-200 p-1">
      <div className="flex w-4">
        #
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
  </div>
  )
}

export { RouteList }