# _mock

[文档](https://ng-alain.com/mock/getting-started)

**Mock** 是指通过生成模拟数据让前端开发人员独立于后端进行开发，有时我们也会运用在测试环境中。

**应** 包含定义：

+ _mock对应拦截URL


**不应** [空]

## mockl拦截数据请求url,并返回DEMO数据

每一个_mock文件内应该有一个完整说明注释，**建议**一个合理的目录结构应该是：

```
├── _[serviceName1].data.mock.ts
├── _[serviceName2].data.mock.ts
├── ...
├── index.ts //导出所有数据规则
```
