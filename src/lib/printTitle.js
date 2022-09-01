import figlet from 'figlet';

const createTitle = (title) => {
  return new Promise((resolve, reject) =>
    figlet.text(
      title,
      {
        font: 'Rammstein',
        width: 100,
      },
      (error, data) => {
        if (error) reject(error);
        else {
          console.log('\n' + data);
          resolve(null);
        }
      }
    )
  );
};

export default createTitle;
