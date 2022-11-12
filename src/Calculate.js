const MissionUtils = require('@woowacourse/mission-utils');
const { result, money } = require('./Result');

class Calculate {
  constructor(amount, winning, bonus, lottos) {
    this.amount = amount;
    this.winning = winning;
    this.bonus = bonus;
    this.lottos = lottos;
  }

  //   lottos에 있는 lotto 번호 하나씩 보기
  // lotto 번호의 요소가 winning에 있다면 count 증가
  //하나의 로또에 대한 winning 당첨 갯수
  count_number_of_wins(winning, lotto) {
    const COUNT = lotto.reduce((count, number) => {
      if (!winning.includes(number)) {
        return count;
      }
      return (count += 1);
    }, 0);
    return COUNT;
  }

  check_bonus(bonus, lotto) {
    let count = 0;
    if (lotto.includes(bonus)) count++;
    return count;
  }

  //계산해서 [[winning갯수, 보너스 일치 여부],[winning갯수, 보너스 일치 여부],[winning갯수, 보너스 일치 여부] ... ] 형식으로 return
  calculate_lottos(lottos, winning, bonus) {
    const CALCULATE = [];
    lottos.map(lotto => {
      const WIN_NUM = this.count_number_of_wins(winning, lotto);
      const BONUS_CHECK = this.check_bonus(bonus, lotto);
      CALCULATE.push([WIN_NUM, BONUS_CHECK]);
    });
    return CALCULATE;
  }

  //   [3,0],[4,0],[5,0],[5,1],[6,0] : 5등 4등 3등 2등 1등
  count_rank(lottos, winning, bonus) {
    let ans = [0, 0, 0, 0, 0];
    const RESULTS = this.calculate_lottos(lottos, winning, bonus);
    RESULTS.map(result => {
      if (result[0] === 3) ans[0] += 1;
      if (result[0] === 4) ans[1] += 1;
      if (result[0] === 5 && result[1] === 0) ans[2] += 1;
      if (result[0] === 5 && result[1] === 1) ans[3] += 1;
      if (result[0] === 6) ans[4] += 1;
    });
    return ans;
  }
}

module.exports = Calculate;

const calculate = new Calculate();
// console.log(
//   calculate.calculate_lottos(
//     [
//       [3, 7, 14, 15, 22, 24],
//       [1, 10, 12, 37, 39, 43],
//       [3, 4, 18, 22, 28, 32],
//       [7, 14, 22, 30, 31, 32],
//       [1, 2, 6, 8, 19, 22],
//     ],
//     [1, 2, 3, 4, 5, 6],
//     7,
//   ),
// );
// console.log(calculate.check_bonus(13, [2, 4, 6, 13, 31, 35]));
// console.log(
//   calculate.count_rank([[30, 31, 33, 38, 39, 41]], [30, 31, 41, 33, 1, 2], 3),
// );
