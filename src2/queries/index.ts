export * from './client.sql';
export * from './account.sql';
export * from './address.sql';

// TODO 에러처리 완료하기
// 1. Error instanceof BaseError(= Sequelize Base Error): 쿼리 쪽 문제
// 2. 그냥 Error 이면 문법쪽 작성의 문제
// 3. 나머지 케이스도 있을 수 있게 때문에 .stringify.JSON으로 처리하기