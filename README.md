# TestFlight Monitor

通过 `Cloudflare Workers` 的 `Cron Trigger` 定时监控 TestFlight 状态。

## 特性

- ⏱ 基于 Cloudflare Workers Cron Trigger 定时执行
- 🚀 部署简单，支持一键安装

## 快速安装（推荐）

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/001ProMax/TestFlight-Monitor)

> 部署完成后，请在 Cloudflare Dashboard 中配置环境变量：
>
> - **Cron Triggers**（定时执行频率）
> - 必要的 **环境变量**（如 App ID、通知配置等）
