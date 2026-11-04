# 开发文档

面向要改这个站点（代码、样式、结构）的人。只写文章请看根目录 [README](../README.md)。

## 文档索引

| 文档 | 内容 |
| --- | --- |
| [development.md](development.md) | 技术栈、目录结构、构建流程、React islands、工具函数、常见改造点 |
| [design-system.md](design-system.md) | 视觉语言速查：颜色、字体、圆角、间距、命名规则、页面布局轴 |
| [seo.md](seo.md) | sitemap、robots、RSS、lastmod、草稿处理 |

站点规范文档放在仓库根目录，不在本目录：

- [`DESIGN.md`](../DESIGN.md) —— 设计系统规范与机器可读 token（frontmatter），`.impeccable/design.json` 是对应的详细扩展（组件 HTML/CSS、色彩渐变阶、动效曲线）
- [`PRODUCT.md`](../PRODUCT.md) —— 站点定位、内容原则、无障碍要求、明确未决的事项

这两份是「什么是对的」的判断依据，改视觉或改定位前先读；代码与它们冲突时，先判断是描述过期还是实现回归。

## 未决事项

以下问题还没有答案，不要在文档或代码里擅自补全（来源：[`PRODUCT.md`](../PRODUCT.md)）：

- 是否引入站内搜索（等内容上量再评估）
- 部署方式与自动构建流程（仓库里没有 CI workflow，目前只有本地 `npm run build` 的静态产物 `dist/`）
- 旧 Hexo 文章源文件位置与迁移脚本
- 旧站引导文章（如「新人必看」）是否重建
