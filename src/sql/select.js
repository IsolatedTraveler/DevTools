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
module.exports = {
  tree,
  row_line
}