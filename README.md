# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

> 这个模板应该可以帮助你开始在 Vite 中使用 Vue 3 和 Typescript 进行开发。 该模板使用 Vue 3 `<script setup>` SFCs，查看 [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 学习 更多的。

## Recommended IDE Setup
> 推荐的 IDE 设置

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS
> 类型支持 TS 中的 .vue 导入

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

由于 TypeScript 无法处理 `.vue` 导入的类型信息，因此默认情况下它们被填充为通用 Vue 组件类型。 在大多数情况下，如果您并不真正关心模板之外的组件道具类型，这很好。 但是，如果您希望在 `.vue` 导入中获得实际的道具类型（例如，在使用手动 `h(...)` 调用时获得道具验证），您可以通过运行启用 Volar 的 `.vue` 类型支持插件 VSCode 命令面板中的`Volar: Switch TS Plugin on/off` `(Volar：打开/关闭 TS 插件)`。


# commit message格式

```
<type>(<scope>): <subject>
```
## type(必须)

用于说明git commit的类别，只允许使用下面的标识。

- feat：新功能（feature）。

- fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。

- fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
    - to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
    - docs：文档（documentation）。

- style：格式（不影响代码运行的变动）。

- refactor：重构（即不是新增功能，也不是修改bug的代码变动）。

- perf：优化相关，比如提升性能、体验。

- test：增加测试。

- chore：构建过程或辅助工具的变动。

- revert：回滚到上一个版本。

- merge：代码合并。

- sync：同步主线或分支的Bug。

## scope(可选)

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

例如在Angular，可以是location，browser，compile，compile，rootScope， ngHref，ngClick，ngView等。如果你的修改影响了不止一个scope，你可以使用*代替。

## subject(必须)

subject是commit目的的简短描述，不超过50个字符。

> 建议使用中文（感觉中国人用中文描述问题能更清楚一些）
> 
> fix(DAO):用户查询缺少username属性 
> feat(Controller):用户查询接口开发
