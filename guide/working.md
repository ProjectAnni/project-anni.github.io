# 整理并导入音频资源

## 安装 anni-cli

从 [GitHub Actions](https://github.com/ProjectAnni/anni/actions/workflows/build.yaml) 中下载操作系统对应的 anni 二进制，解压 anni 可执行文件并加入 PATH 变量。

## 创建 Anni Workspace

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

## 使用 anni-workspace-gui 整理音频资源

TODO

## 发布元数据及音频资源

在使用 Workspace 中发布专辑后，将 `$WORKSPACE_DIR/.anni/repo` Git 仓库中的变更提交并推送到远端仓库，并将音频文件发布目录中的文件拷贝到 annil 音频后端目录。

完成后，重启 anniv 及 annil 容器（可选）。
