import React from 'react'

import { PieChart } from 'react-minimal-pie-chart';
import { composeName } from '../../utility';
import { css } from '@emotion/core';

export default function Visualizations ({users, data: transactions}) {

  const colors = ['#1da562', '#a52f1d', '#a5731d', '#3f1da5'];

  const data = users.map((user, index) =>  ({
    title: `${user.firstName[0]}${user.lastName[0]}`,
    value: user.transactions.length,
    color: colors[index]
  }))

  const userTotalSpend = transactions.reduce((acc, curr) => {
    if (!acc[curr.user_id]) {
      acc[curr.user_id] = curr.amount
    } else acc[curr.user_id] = acc[curr.user_id] + curr.amount
    return acc
  }, {})

  const spendData = users.map((user, index) => ({
    title: `${user.firstName[0]}${user.lastName[0]}`,
    value: userTotalSpend[user.id],
    color: colors[index]
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
                <span className="circle" style={{ backgroundColor: colors[index] }} />
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
            if (dataEntry.value) return `${dataEntry.title} ${dataEntry.value}`;
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
            if (dataEntry.value) return (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dataEntry.value));
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