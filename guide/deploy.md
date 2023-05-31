# 快速部署

:::tip
在开始之前，请先阅读 [Anni 简介](./intro.md)。
:::

## 创建元数据仓库

元数据仓库本质上是一个 Git 仓库，可以存放在任意支持 Git 的托管平台。我们推荐使用 GitHub 。

最简单的方式是直接 Fork [官方的元数据仓库](https://github.com/ProjectAnni/repo) ，之后修改 `repo.toml` 中的部分信息即可。

也可以选择自己重新创建元数据仓库，格式可参考官方元数据仓库。详细的 Anni 元数据仓库标准可参考[book 的相关章节](https://book.anni.rs/02.metadata-repository/00.readme.html)。

## 部署 annil

我们推荐通过 Docker 部署 annil 服务，参考的 `docker-compose.yml` 如下：

```yml
version: "3"
services:
  annil:
    container_name: annil
    image: ghcr.io/projectanni/annil:latest
    ports:
      - 8081:80/tcp # 可将 8081 修改为其他端口
    volumes:
      - ./data:/app/data
      - /path/to/audio/library:/library # 将 /path/to/audio/library 修改为音频文件存放目录
    restart: unless-stopped
```

运行 `docker-compose up -d` 之后，我们需要修改位于 `data/config.toml` 的 `annil` 的配置文件：

```toml
[server]
name = "My Anni Library"
listen = "0.0.0.0:80"

hmac-key = "d31d03ba-8fde-4605-999e-b281be766141" # 随机生成，不用修改，下同
share-key = "5dea211d-da50-44b2-8564-84fe99731fa5"
share-key-id = "22bc0d6b-e16f-4959-9f37-b6ebcb7b2f76"
admin-token = "c51788e7-1203-4957-b342-7ead5a4919b4"

[backends.default] # 指定音频后端，这里我们使用文件后端
enable = true
type = "file"
root = "/library"
strict = true
layers = 2
```

配置文件修改后需要重启 Docker 容器。

## 部署 anniv

我们同样推荐使用 Docker 部署 anniv ，参考的 `docker-compose.yml` 如下：

```yml
version: "3"
services:
  anniv:
    container_name: anniv
    image: ghcr.io/projectanni/anniv-go:latest
    ports:
      - 8080:80/tcp # 可将 8080 修改为其他端口
    volumes:
      - ./config:/app/config
    environment:
      - CONF=/app/config/config.yml
      - DB_VENDOR=postgres
      - DB_PATH=postgres://anni:changetoyourdbpasswd@db:5432/anniv # 修改数据库密码
    depends_on:
      - db
    restart: unless-stopped
  db:
    container_name: anniv-postgres
    image: postgres:14.2
    environment:
      - POSTGRES_USER=anni
      - POSTGRES_PASSWORD=changetoyourdbpasswd # 修改数据库密码
      - POSTGRES_DB=anniv
    volumes:
      - ./db-data:/var/lib/postgresql/data
    restart: unless-stopped
```

第一次启动后，我们同样需要修改 `anniv` 的配置文件(`config/config.yml`)：

```yml
site_name: Project Anni
description: Project Anni Production Site
listen: 0.0.0.0:80
enforce_2fa: false
headers: {}
trusted_proxies:
  - 127.0.0.1/32
repo_url: https://github.com/ProjectAnni/repo.git # 修改为自己的元数据仓库地址
require_invite: true # 注册是否需要邀请码
invite_code: xxxxxx # 邀请码
annil_token:
  - enabled: true # 为每个用户默认配置的音频仓库
    name: Default token
    url: https://xxxxxx # 修改为自己 annil 的 URL
    allow_share: true # 是否为这个音频仓库启用分享功能
    credential: xxxx # 修改为 annil 配置文件中的 admin-token
```

配置文件修改后需要重启 Docker 容器。

## 开始使用

部署完 annil 与 anniv 之后，就可以打开客户端并开始使用了。Anni 当前有两个客户端：

- 基于网页的 anniw 客户端，直接使用浏览器访问 anniv 的 URL 即可开始使用
- 基于 Flutter 的 annix 客户端，可在 [Release](https://github.com/ProjectAnni/annix/releases/tag/canary) 中下载对应版本，并填写 anniv URL 开始使用

虽然 Anni 已经可以正常工作了，但当前音频仓库中并没有任何专辑。要了解如何向 Anni 中添加专辑，请阅读下一章。
