const getRoot = () => {
  return document.getElementById('root');
};

const createDayTitle = (name) => {
  const dayTitleEl = document.createElement('h2');
  dayTitleEl.innerText = name;
  dayTitleEl.classList.add('day_title');
  return dayTitleEl;
};

const createStageTitle = (name) => {
  const dayTitleEl = document.createElement('h3');
  dayTitleEl.innerText = name;
  dayTitleEl.classList.add('stage_title');
  return dayTitleEl;
};

const createBandEntry = (name, start, end) => {
  console.log(name, start, end);
  const entryContainer = document.createElement('div');
  entryContainer.classList.add('band-entry');
  const nameEl = document.createElement('p');
  nameEl.classList.add('band-entry_name');
  const tiemEl = document.createElement('p');
  tiemEl.classList.add('band-entry_time');

  const [hourStart, minuteStart] = start.split(':');
  const [hourEnd, minuteEnd] = end.split(':');

  tiemEl.innerHTML = `${hourStart}<sup>${minuteStart}</sup> - ${hourEnd}<sup>${minuteEnd}</sup>`;
  nameEl.innerText = name;

  entryContainer.insertAdjacentElement('beforeend', tiemEl);
  entryContainer.insertAdjacentElement('beforeend', nameEl);

  return entryContainer;
};

const createStageContainter = (name, data) => {
  const stageContainer = document.createElement('div');
  stageContainer.classList.add(`stage_size-${CONFIG.stageSizes[name]}`, 'stage_containter');

  const stageTitleEl = createStageTitle(name);
  const bandEntries = data.map(({ band_name, start, end }) =>
    createBandEntry(band_name, start, end),
  );

  console.log(data);

  stageContainer.insertAdjacentElement('beforeend', stageTitleEl);
  bandEntries.forEach((container) =>
    stageContainer.insertAdjacentElement('beforeend', container),
  );

  return stageContainer;
};

const createDayContainer = (name, data) => {
  const dayContainer = document.createElement('div');
  dayContainer.classList.add('day_container');

  const dayTitleEl = createDayTitle(name);
  const stageContainers = Object.entries(data).map(([name, data]) =>
    createStageContainter(name, data),
  );

  dayContainer.insertAdjacentElement('beforeend', dayTitleEl);
  stageContainers.forEach((container) =>
    dayContainer.insertAdjacentElement('beforeend', container),
  );

  return dayContainer;
};
const insertTimetable = (data) => {
  const dayContainers = Object.entries(data).map(([name, data]) =>
    createDayContainer(name, data),
  );
  const root = getRoot();

  dayContainers.forEach((container) =>
    root.insertAdjacentElement('beforeend', container),
  );
};

const days = LINEUP.reduce((acc, { day, stage, ...entryData }) => {
  if (acc[day]) {
    if (acc[day][stage]) {
      acc[day] = {
        ...acc[day],
        [stage]: [...acc[day][stage], entryData],
      };
    } else {
      acc[day] = {
        ...acc[day],
        [stage]: [entryData],
      };
    }
  } else {
    acc[day] = {
      [stage]: [entryData],
    };
  }

  return acc;
}, {});

insertTimetable(days);
