const config = {
	ydgw: {
		name: "ydgw",
		sourceAddr: "D:/Vue/ydgw/dist",
		title: "移动公卫",
		version: "1.3.1",
		testversion: "1.3.1.0.1",
		url: "com.wonderscd.mobile.ydgw",
		site: "D:/cordova",
		backUpUrl: "D:/version/ydgw",
		keystore: "ydgw.release.keystore",
		alias: "ydgw",
		storePassword: "wonderscd",
		password: "wonderscd",
		plugin: [
			"cordova-plugin-backbutton",
			"cordova-plugin-splashscreen",
			"cordova-plugin-statusbar",
			"cordova-plugin-file",
			"cordova-plugin-file-transfer",
			"cordova-plugin-file-opener2",
			"phonegap-plugin-barcodescanner",
			"cordova-plugin-screen-orientation",
			"cordova-plugin-camera",
			"cordova-plugin-app-version",
			"ionic-plugin-keyboard",
			"cordova-android-support-gradle-release"
		],
		platform: [
			"android"
		],
		desc: "移动公卫项目"
	},
	test: {
		name: "test",
		title: "测试项目",
		url: "com.wonderscd.mobile.test",
		version: "1.0.0",
		site: "D:/cordova",
		plugin: [
			"cordova-android-support-gradle-release",
			"cordova-plugin-app-version",
			"cordova-plugin-backbutton",
			"cordova-plugin-camera",
			"cordova-plugin-file",
			"cordova-plugin-file-transfer",
			"cordova-plugin-file-opener2",
			"cordova-plugin-screen-orientation",
			"cordova-plugin-splashscreen",
			"cordova-plugin-statusbar",
			"ionic-plugin-keyboard",
			"phonegap-plugin-barcodescanner"
		],
		platform: [
			"android"
		],
		desc: "测试项目"
	},
	key: [
		"ydgw",
		"test"
	]
};
module.exports={
	config
};