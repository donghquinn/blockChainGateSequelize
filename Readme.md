Sequelize 사용.

1. Model Init
2. Model Sync
3. Query or Whatever You want


* prepared Statement: 기본적으로 Sequelize 안에 구현되어 있다.

* Sequelize 내에 Operators 가 내장되어 있으며, Op 라는 클래스로 구현되어 있다.


   객체                           관계형 데이터베이스
  Model              ===             Table

Model.findOne()      ===         SELECT A FROM ...
Model.findAll()      ===        SELECT A,B,C FROM ...
Model.update()       ===          UPDATE A 
Model.destroy()      ===         DELETE A FROM ...




----------------------------------- 예시 ----------------------------------------


import { Sequelize, Datatypes, Op, Models } from 'sequelize';


// extends Model Class

class Models extends Model {}


// Init Model : Which means defining the columns.

Models.init {
  columen1 {
    type: Datatypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelname: 'Models'
  tableName: 'test',
  timestamp: false
};


//Syncronize the Models Object with RDB's Table.

await Models.sync();


// SELECT first_One FROM test WHERE Optional_Cond = 13 OR Optional_Cond = 4

await Models.findOne({
  attributes: ['first_One'],
  where: {
    Optional_Cond: {
      [Op.eq]: [13, 4]        => means Equal Operator(=)
    }
  }
})



------------------------------------------------------------------------------------