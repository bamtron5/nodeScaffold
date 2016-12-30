import Boxer from '../Boxer';

export class BoxerSeed {
  constructor() {
    console.log('boxerseed');
    const seeds = [
      {name: 'Bill Brasky', age: 37, weight: 201},
      {name: 'Chip McDaniels', age: 29,  weight: 179},
      {name: 'Kevin Evans', age: 28, weight: 181}
    ]

    seeds.map((seed) => {
      Boxer.create(seed, (e, data) => {
        if(e) throw new Error(e);
        console.log(data);
      });
    });
  }
}

export default new BoxerSeed();
