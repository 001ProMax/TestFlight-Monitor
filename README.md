# TestFlight Monitor

通过 `Cloudflare Workers` 的 `Cron Trigger` 定时监控 TestFlight 状态。

## 特性

- ⏱ 基于 Cloudflare Workers Cron Trigger 定时执行
- 🚀 部署简单，支持一键安装

## 部署

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/001ProMax/TestFlight-Monitor)

> 部署完成后，请在 `Settings` -> `Variables and Secrets` 中配置环境变量（类型均为 Text）：
>
> - `Bark_IDs=["your_bark_id"]`
>
> - `TF_IDs=["your_testflight_id"]`
>
> - `interval=5` （默认触发间隔为 5s）
