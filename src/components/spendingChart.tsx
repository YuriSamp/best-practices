'use client'

import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    created_at: "13",
    id: 18,
    project_id: 14,
    token_count: 700,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "14",
    id: 19,
    project_id: 15,
    token_count: 1000,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "15",
    id: 20,
    project_id: 16,
    token_count: 3000,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "16",
    id: 21,
    project_id: 17,
    token_count: 300,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "17",
    id: 22,
    project_id: 18,
    token_count: 1500,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "18",
    id: 23,
    project_id: 19,
    token_count: 1700,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "19",
    id: 24,
    project_id: 20,
    token_count: 1000,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
  {
    created_at: "20",
    id: 25,
    project_id: 21,
    token_count: 2000,
    user_id: "0e58c92b-652b-4751-b80d-af4025e052cf"
  },
];

type Logs = {
  created_at: string;
  id: number;
  project_id: number;
  token_count: number;
  user_id: string;
}

interface Props {
  data2: Logs[]
}


const SpendingChart = ({ data2 }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={150}
        height={40}
        data={data}
        barGap={3}
      >
        <XAxis dataKey='created_at' />
        <YAxis dataKey='token_count' />
        <Bar dataKey="token_count" fill="#EA580C" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export { SpendingChart }
