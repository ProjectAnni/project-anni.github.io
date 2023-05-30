---
home: true
heroImage: https://avatars.githubusercontent.com/u/78713540
heroText: Project Anni
tagline: 另一种方案自建音乐服务的方案
actions:
  - text: 快速上手
    link: /guide/intro
    type: secondary

features:
  - title: 元数据仓库
    details: 以统一的方式管理元数据，并提供了向音频文件写入仓库内元数据的功能。
  - title: 音频仓库 Annil
    details: Annil 提供了音频和封面资源的分发能力。
  - title: 音频后端
    details: Annil 支持多种音频后端提供的音频/封面文件。目前支持本地文件系统和 Google Drive。
  - title: Anniv
    details: Anniv 提供歌单、播放记录、Token 同步、歌词等功能，与元数据分离。
  - title: Anniw
    details: Anniw 提供了简单可用的前端应用。
  - title: Annix
    details: Annix 提供了功能丰富的客户端应用。

footerHtml: true
footer: "Project Anni 的出现是为了填补「不满足我们需求」的空白，而不是为了纯泛用性而生。
<br>
和每一个定制项目一样，Anni 并不一定适合每一个人，我们也不奢求所有用户和我们的需求都完全一致。"
---

### 更简单的整轨切分

```bash
# 切分当前目录下的整轨音频
#
# 默认设置：
# 1. 切分 WAV 整轨
# 2. 输出 FLAC 分轨
# 3. 将 CUE 中元数据导入到切分完成后的分轨文件
# 4. 在切分成功后将整轨和 CUE 文件移动到回收站
# 5. 导入目录中 jpg 文件作为音频封面
anni split .

# 切分 FLAC 整轨
anni split --input-format flac .

# 切分后不自动删除整轨和 CUE 文件
anni split --keep .

# 切分后直接删除整轨和 CUE 文件，不移动到回收站
anni split --no-trashcan .
```

### FLAC 信息查看/导出

```bash
# 查看 FLAC 文件的元数据
anni flac export FILE.flac

# 导出 FLAC 文件的内置封面
anni flac export -t=cover FILE.flac > cover.jpg
```
