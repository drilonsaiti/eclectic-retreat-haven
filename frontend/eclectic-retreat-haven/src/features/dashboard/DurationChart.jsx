import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import styled from 'styled-components';
import {useDarkMode} from "../../context/DarkModeContext.jsx";
import Heading from "../../ui/Heading.jsx";


const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;
const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
        obj.duration === field ? {...obj, value: obj.value + 1} : obj
    );
  }

  const data = stays
      .reduce((arr, cur) => {
        const num = cur.numNights;
        const conditions = [
          { range: [1], label: '1 night' },
          { range: [2], label: '2 nights' },
          { range: [3], label: '3 nights' },
          { range: [4, 5], label: '4-5 nights' },
          { range: [6, 7], label: '6-7 nights' },
          { range: [8, 14], label: '8-14 nights' },
          { range: [15, 21], label: '15-21 nights' },
          { range: [22, Infinity], label: '21+ nights' }
        ];

        const condition = conditions.find(({ range }) => range.includes(num));
        const label = condition ? condition.label : undefined;
        return incArrayValue(arr, label);
      }, startData)
      .filter((obj) => obj.value > 0);

  return data;
}

  function DurationChart({confirmedStays}) {
    const {isDarkMode} = useDarkMode();
    const startData = isDarkMode ? startDataDark : startDataLight;
    const data = prepareData(startData, confirmedStays);

    return (
        <ChartBox>
          <Heading type='h2'>Stay duration summary</Heading>
          <ResponsiveContainer width='100%' height={240}>
            <PieChart>
              <Pie
                  data={data}
                  nameKey='duration'
                  dataKey='value'
                  cx='40%'
                  cy='50%'
                  innerRadius={85}
                  outerRadius={110}
                  fill='#4f46e5'
                  paddingAngle={3}
                  startAngle={180}
                  endAngle={-180}
              >
                {data.map((entry, i) => (
                    <Cell
                        key={entry.duration}
                        fill={entry.color}
                        stroke={entry.color}
                    />
                ))}
              </Pie>
              <Tooltip/>
              <Legend
                  // verticalAlign='bottom'
                  // align='center'
                  verticalAlign='middle'
                  align='right'
                  width='30%'
                  layout='vertical'
                  iconSize={15}
                  iconType='circle'
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
    );
  }

export default DurationChart;
