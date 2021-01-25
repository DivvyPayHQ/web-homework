import React, { useRef } from 'react'

import { PieChart } from 'react-minimal-pie-chart';
import { composeName, isRomanNumeral } from '../../utility';
import { css } from '@emotion/core';
import { convertToRoman } from '../../roman-numeral/roman-numeral';

export default function Visualizations ({users, data: transactions}) {


  const romanNumeral = useRef(isRomanNumeral())

  const data = users.map((user, index) =>  ({
    title: `${user.firstName[0]}${user.lastName[0]}`,
    value: user.transactions.length,
    color: user.color
  }))

  const userTotalSpend = transactions.reduce((acc, curr) => {
    if (!acc[curr.user_id]) {
      acc[curr.user_id] = curr.amount
    } else acc[curr.user_id] = acc[curr.user_id] + curr.amount
    return acc
  }, {})

  const spendData = users.filter(user => userTotalSpend[user.id]).map((user, index) => ({
    title: `${user.firstName[0]}${user.lastName[0]}`,
    value: userTotalSpend[user.id],
    color: user.color
  }));

  const styles = css`
    .circle {
      height: 18px;
      width: 18px;
      border-radius: 50%;
      display: inline-block;
      margin-left: 4px;
    }
    .userRow {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  `;

  return (
    <>
      <div css={styles}>
        <div>
          {users.map((user, index) => {
            return (
              <div className="userRow" key={user.id}>
                {composeName(user)}
                <span className="circle" style={{ backgroundColor: user.color }} />
              </div>
            );
          })}
        </div>
      </div>
        Transactions per user
      <div>
        <PieChart
          data={data}
          label={({ dataEntry }) => {
            if (dataEntry.value) return `${dataEntry.title} ${romanNumeral.current ? convertToRoman(dataEntry.value) : dataEntry.value}`;
          }}
          labelPosition={100 - 60 / 2}
          labelStyle={{
            fontSize: '6px'
          }}
          lineWidth={60}
          radius={PieChart.defaultProps.radius - 6}
          segmentsShift={1}
        />
      </div>
      Spend per user
      <div>
        <PieChart
          data={spendData}
          label={({ dataEntry }) => {
            if (dataEntry.value) return romanNumeral.current
              ? convertToRoman(Math.floor(dataEntry.value))
              : (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dataEntry.value));
          }}
          labelPosition={100 - 60 / 2}
          labelStyle={{
            fontSize: '6px'
          }}
          lineWidth={60}
          radius={PieChart.defaultProps.radius - 6}
          segmentsShift={1}
        />
      </div>
    </>
  );
}