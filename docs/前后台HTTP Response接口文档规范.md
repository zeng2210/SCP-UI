# 前后台（web/app <-> server）的HTTP Response接口文档规范

> 后台系统错误（如nginx挂了、server的的主进程core了等场景）走对应的http status。
逻辑错误（如需要查询的数据不存在、分页越界等）走http 200，在response json 里面
使用固定格式来区分。

## 基础格式
```js
{
	/**
	 * @type {string}
	 */
	code,

	/**
	 * @type {string}
	 */
	msg,

	/**
	 * @type {*}
	 */
	data
}
```

## 字段详细说明：
错误码 `code`
由于历史原因，被定义成了五位数字的string类型。
>`00000`：成功。此时`msg`字段无实际意义。<br>
 其他类型的值参加各模块自定义说明

错误消息 `msg` :
> 错误消息。和错误码`code`一一对应，各厂商自己维护好自己的列表。
 重点需要注意，当 `code` 不为0，即 `msg` 有意义时，`msg` 的值可以直接给终端用户显示，信息要友好，不能给个如`NaN`这样的错误提示。

业务数据`data`
>泛型，和具体业务相关。仅当`code`为`0`时有意义。

## 返回接口举例
```json
{
	"code" : "00000",
	"msg" : "",
	"data" : {
		"name" : "张三",
		"face_url" : "http://www.qq.com/x.png",
		"sex" : 1,
		"age" : 30
	}
}
```

```json
{
	"code" : "20001",
	"msg" : "地图引擎初始化失败",
	"data" : ""
}
```
