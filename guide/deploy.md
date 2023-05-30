# 快速部署

:::tip
在开始之前，请先阅读[ Anni 简介](./intro.md)。
:::

## 创建元数据仓库

元数据仓库本质上是一个 Git 仓库，可以存放在任意支持 Git 的托管平台。我们推荐使用 GitHub 。

最简单的方式是直接 Fork [官方的元数据仓库](https://github.com/ProjectAnni/repo) ，之后修改 `repo.toml` 中的部分信息即可。

也可以选择自己重新创建元数据仓库，格式可参考官方元数据仓库。详细的 Anni 元数据仓库标准可参考[book 的相关章节](https://book.anni.rs/02.metadata-repository/00.readme.html)。

## 部署 annil

我们推荐通过 Docker 部署 annil 服务，参考的 `docker-compose.yml` 如下：

```yml
version: '3'
services:
  annil:
    container_name: annil
    image: ghcr.io/projectanni/annil:latest
    ports:
      - 8081:80/tcp
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

运行 `docker-compose up -d` 之后，我们需要修改位于 `config/config.toml` 的 `annil` 的配置文件：

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
version: '3'
services:
  anniv:
    container_name: anniv
    image: ghcr.io/projectanni/anniv-go:latest
    ports:
      - 8080:80/tcp
    volumes:
      - ./config:/app/config
    environment:
      - CONF=/app/config/config.yml
      - DB_VENDOR=postgres
      - DB_PATH=postgres://anni:changetoyourdbpasswd@db:5432/anniv
    depends_on:
      - db
    restart: unless-stopped
  db:
    container_name: anniv-postgres
    image: postgres:14.2
    environment:
      - POSTGRES_USER=anni
      - POSTGRES_PASSWORD=changetoyourdbpasswd
      - POSTGRES_DB=anniv
    volumes:
      - ./db-data:/var/lib/postgresql/data
    restart: unless-stopped
```

第一次启动后，我们同样需要修改 `anniv` 的配置文件：

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
    credential: xxxx # 修改为 annil 配置文件中的
```

配置文件修改后需要重启 Docker 容器。

## 整理音频资源

### 安装 anni-cli

从 [GitHub Actions](https://github.com/ProjectAnni/anni/actions/workflows/build.yaml) 中下载操作系统对应的 anni 二进制，解压 anni 可执行文件并加入 PATH 变量。

### 创建 Anni Workspace

```bash
# 切换到存放 Workspace 的目录
mkdir AnniWorkspace
cd AnniWorkspace
anni ws init .
cd .anni
# 克隆自己的元数据仓库到 .anni/repo 下
git clone https://github.com/ProjectAnni/repo.git repo
```

创建 `.anni/config.toml`:

```toml
[workspace]
publish-to = "default"

[library.default]
path = "/path/to/publish/path" # 填写音频文件发布的目录
layers = 2
```

### 使用 anni-workspace-gui 整理音频资源

TODO

### 发布元数据及音频资源

在使用 Workspace 中发布专辑后，将 `$WORKSPACE_DIR/.anni/repo` Git 仓库中的变更提交并推送到远端仓库，并将音频文件发布目录中的文件拷贝到 annil 音频后端目录。

完成后，重启 anniv 及 annil 服务。