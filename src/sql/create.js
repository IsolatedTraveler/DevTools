const getInput = require('../cmd/').getInput
function define() {
  getInput('Please input table name:').then(name => {
    console.log(`select 'v_' || v || '      ' || '${name}.' || upper(v) || '%TYPE; --' || c a,'v_' || v || ':=Json_Str(v_Json_Data, ''' || v || '''); --' || c b 
    from (select LOWER(a.column_name) v, comments c
            from user_tab_columns b, user_col_comments a
          where a.column_name = b.column_name
            and a.table_name = b.table_name
            and a.table_name = upper('${name}'))`)
  })
}
function procedure() {
  getInput('Please input sql procedure name:').then(name => {
    getInput('Please input sql procedure comment:').then(comment => {
      let date = new Date(), m = date.getMonth() + 1, d = date.getDate()
      console.log(`CREATE OR REPLACE PROCEDURE ${name}(data_in    IN CLOB,
        result_out OUT VARCHAR2) IS
        /*-------------------------------
        过程名：    ${name}
        作者：      hebo
        功能:       ${comment}
        创建日期：  ${date.getFullYear()}-${m > 9 ? m : ('0'+m)}-${d > 9 ? d : ('0'+d)}
        版本号:     v1.0.1
        data_in: 
        --------------------------------
        */
        v_json_data      json; -- 入参
        v_json_out       json := json(); --返回信息
        
        v_CJSJ      date; --创建时间
        v_Err         Varchar2(2000); -- 错误提示消息
        Err_Custom Exception; -- 自定义异常错误
      BEGIN
        json_data(data_in, '${comment}', v_json_data);

        v_cjsj :=sysdate; --创建时间
      exception
        when others then
          if sqlcode < -20000 then
            v_err := sqlerrm;
          end if;
          result_out := return_fail(v_err, 2);
      end;`)
    })
  })
}
function table() {
  console.log('123')
}
module.exports = {
  table,
  define,
  procedure
}
