const getInput = require('../cmd/').getInput
function tree() {
  getInput('Please input table name:').then(e => {
    console.log(`-- 不包括父路径
    select id, pid
      from ${e} a
    where 1 = 1
    start with pid = #{pid}
    connect by prior id = pid;
    
    -- 包括父路径
    select id, pid
      from ${e} a
    where 1 = 1
    start with id = #{pid}
    connect by prior id = pid`)
  })
}
function row_line() {
  console.log(`-- 行转列
  SELECT COLUMN_VALUE FROM TABLE(SPLIT('1,2', ','));
  -- 列转行
  SELECT to_char(wm_concat(mc))
    FROM (SELECT '名称1' AS mc
            FROM dual
          UNION ALL
          SELECT '名称2' AS mc
            FROM dual);`)
}
function update_select () {
  console.log(`update table set (a, b, c) = (select a, b,c from table where id=v_id)`)
}
function insert_select() {
  console.log(`insert into table (a, b, c) select a, b,c from table where id=v_id`)
}
function getCols() {
  getInput('Please input table name:').then(e => {
    console.log(`SELECT 'a=['|| to_char(wm_concat('{col:"' || col || '", mc:"' || comments || '",type: "'||data_type||'"}'))|| ']'
    from (select lower(a.column_name) col, b.data_type, comments
            from user_tab_columns b, user_col_comments a
           where a.column_name = b.column_name
             and a.table_name = b.table_name
             and a.table_name = upper('${e}')
             and lower(a.COLUMN_NAME) not in
                 ('id',
                  'jgid',
                  'gysid',
                  'zdrid',
                  'shrid',
                  'fkid',
                  'shrid1',
                  'shrid2',
                  'xmid',
                  'ckid',
                  'rkmxid',
                  'jlid'));
    `)
  })
}
module.exports = {
  tree,
  row_line,
  update_select,
  insert_select,
  getCols
}