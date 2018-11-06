const config = {
	html:{
		url:"C:/Users/wdgw/Desktop/json.txt",
		key:["jwjgBBxxForm","jwjgBBxxForm1","tr","td","tbody"],
		jwjgBBxxForm:{
			desc:"基卫监管公共卫生报表弹出表单模板（填报）"
			,temp:"\n\t\t\t\t<div class=\"flex row nowrap\">\n\t\t\t\t\t<label class=\"layui-form-label auto\">#{title}</label>\n\t\t\t\t\t<div class=\"input\">\n\t\t\t\t\t\t<input type=\"text\" class=\"layui-input\" name=\"#{id}_1\" id=\"#{id}_1\" placeholder=\"\" readonly/>\n\t\t\t\t\t\t<input type=\"text\" class=\"layui-input\" name=\"#{id}\" id=\"#{id}\" placeholder=\"\"/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"
		},
		jwjgBBxxForm1:{
			desc:"基卫监管公共卫生报表弹出表单模板（审核）"
			,temp:"\n\t\t\t\t<div class=\"flex row nowrap\">\n\t\t\t\t\t<label class=\"layui-form-label auto\">#{title}</label>\n\t\t\t\t\t<div class=\"input\">\n\t\t\t\t\t\t<input type=\"text\" class=\"layui-input\" name=\"#{id}\" id=\"#{id}\" placeholder=\"\" readonly/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>"
		},
		tbody:{
			desc:"table表格",
			temp:"<tbody>\n\t#{temp}\n</tbody>"
		},
		tr:{
			desc:"table表格行",
			temp:"<tr>\n\t\t#{temp}\n\t</tr>"
		},
		td:{
			desc:"table表格列",
			temp:"<td class='#{className}' colspan='#{colspan}' rowspan='#{rowspan}'>#{content}</td>\n\t\t"
		}
	},
	js:{
		url:""
	}
};
module.exports={
	config
};