/**
 * 封装网络请求模块
 */

//dev、prod用于区分开发环境和线上环境,上线前要改为prod
let env = "",
	baseUrl;

if (env === "dev") {
	baseUrl = 'https://www.surveyonline.cn/survey-1.0/';
} else {
	baseUrl = 'https://www.surveyonline.cn/survey-1.0/';
}

const http = ({ url = "", param = {}, ...other } = {}) => {
    if(param.tip){
        wx.showLoading({
            title: "加载中..",
        });
    }

	return new Promise((resolve, reject) => {
		wx.request({
			url: getUrl(url),
			data: param,
			header: {
				"content-type": "application/json", // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
			},
			...other,
			complete: (res) => {
                if(param.tip){
                    wx.hideLoading();
                }

				// 根据实际接口数据结构及错误状态进行提示
				if (res.statusCode == 200) {
					resolve(res.data?.data);
				} else {
					// 错误提示
					wx.showToast({
						title: url + "请求错误:" + res?.data?.msg,
						icon: "none",
						duration: 2000,
					});
					reject(res);
				}
			},
		});
	});
};

const getUrl = (url) => {
	if (url.indexOf("://") == -1) {
		url = baseUrl + url;
	}
	return url;
};

const _get = (url, param = {}) => {
	return http({
		url,
		param,
	});
};

const _post = (url, param = {}) => {
	return http({
		url,
		param,
		method: "POST",
	});
};

const _put = (url, param = {}) => {
	return http({
		url,
		param,
		method: "PUT",
	});
};

const _delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: "PUT",
	});
};

module.exports = {
	baseUrl,
	_get,
	_post,
	_put,
	_delete,
};
