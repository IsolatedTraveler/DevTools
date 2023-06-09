const {copy} = require('./opreate')
const arr = ["cjrkfgl/cjrkfglda.js","cjrkfgl/cjrkfjllist.js","dazy/grdazylist.js","dazy/zysh.js","fjh/fjhda.js","fjh/fjhscjl.js","fjh/fjhsflist.js","gwxtgl/xtgwgxysf.js","gwxtgl/xtgwtnbsf.js","gxy/gxyda.js","gxy/gxysfjl.js","gxy/gxysflist.js","gxy/gxyzx.js","jkda/grjkdadh.js","jkda/grjkdaxx_print.html","jktj/jktjda.html","jsb/jsbda.html","jsb/jsbsflist.js","jtda/jtjkdaxx.js","lfs/lfsda.html","lfs/lfssflist.js","lnr/lnrda.js","lnr/lnrpglist.js","lnr/lnrzylist.js","pkrq/pkrqda.js","qyjl/grqygl.js","qyjl/grqygl_new.js","tnb/tnbda.js","tnb/tnbsfjl.js","tnb/tnbsflist.js","tnb/tnbzx.js","xse/xseda.js","xxtjgl/zxxspljd.js","zyjkfw/zygyjllist.js","zyjkfw/zyyda.js","jcsj/mbgl/dambgl.js","jsb/jsbda.js","lfs/lfsda.js","qyjl/qyjl.js","qyjl/qyjl_wx.js"],
copyMl = 'E:/jtGit/web/his-nm/webs/ggws/',
backMl = 'E:/version/his-nm/20221111/his-nm/webs/ggws/'
function init() {
  arr.forEach(it => {
    copy(copyMl + it, backMl + it).catch(() => {
      console.log(it + '拷贝失败')
    })
  })
}
init()