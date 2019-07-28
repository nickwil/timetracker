import React from 'react'
import PieChart from 'react-minimal-pie-chart'
import shortTimeFormatting from '../util/shortTimeFormatting.js'
import { observer } from 'mobx-react-lite'
import CustomLink from '../general/CustomLink.jsx'
import styles from './Stats.module.css'
const moment = require('moment')

const Stats = observer(function Stats({ data, years, months, weeks }) {
  return (
    <div className={styles.container} aria-labelledby="stats-page-header">
      <h1 id="stats-page-header">Time Spent Working</h1>
      {
        /*
        data.filter(obj => obj.value >= 1).length >= 1 ? */
        <div className={styles.chartAndLegend}>
          <PieChart
            lineWidth={15}
            data={data}
            paddingAngle={18}
            rounded
            label={({ data, dataIndex }) =>
              shortTimeFormatting(data[dataIndex].value)
            }
            labelStyle={{
              fontSize: '5px',
              fontFamily: 'sans-serif',
            }}
            labelPosition={60}
          />
          <section>
            <h4>Legend Tags</h4>
            {data.map(obj => (
              <div key={'legend-tags-' + obj.id}>
                {obj.title} - <span style={{ color: obj.color }}>•</span>
              </div>
            ))}
          </section>
        </div>
        /*:
      <h4>There is no data for this time period</h4>*/
      }

      <section>
        <h3>See stats throughout your history</h3>
        <div className={styles.statsOverTime}>
          <div>
            <h4>Years</h4>
            {years.map(year => (
              <div key={'history-years:' + year}>
                <CustomLink to={'/stats/' + year}>{year}</CustomLink>
              </div>
            ))}
          </div>
          <div>
            <h4>Months</h4>
            {months.map(month => (
              <div key={'history-months:' + month}>
                <CustomLink to={'/stats/' + month}>
                  {moment(month, 'YYYY/MM').format('MMMM, YYYY')}
                </CustomLink>
              </div>
            ))}
          </div>

          <div>
            <h4>Weeks</h4>
            {weeks.map(week => (
              <div key={'history-weeks:' + week}>
                <CustomLink to={'/stats/' + week}>
                  {moment(week, 'YYYY/MM').format('MMMM, YYYY') +
                    '; Week #:' +
                    week.split('/')[2]}
                </CustomLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})
export default Stats
