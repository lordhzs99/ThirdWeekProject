// import mockData from './mock';

const getData = async () => {
  try {
    return mockData;
  } catch (error) {
    console.error(error);
  }
};

export { getData };