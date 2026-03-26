---
sort: 2
sideName: Codex配置
---

:::: tabs

::: tab Windows
1. 键盘按下 `Win + R`。输入以下内容后回车，打开你的 Codex 配置目录。

```bash
explorer %USERPROFILE%\.codex
```

2. 当前目录中，常用的配置文件主要是这两个：

- `config.toml`：Codex 的核心配置文件，中转服务与 MCP 等都在这里配置。
- `auth.json`：用来保存你在中转站获取的 API Key。

3. 配置config.toml

将以下配置文本复制到你的 config.toml文件中保存
``` toml
model_provider = "custom"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"
service_tier = "fast"
model_context_window = 1000000
model_auto_compact_token_limit = 900000

[model_providers]

[windows]
sandbox = "elevated"
[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "http://e6q77.online/v1"

[projects]
trust_level = "trusted"

[notice]
hide_rate_limit_model_nudge = true

```

4. 配置ApiKey

将以下配置文本复制到你的 auth.json文件中
``` json
{
  "OPENAI_API_KEY": "API令牌中的Key"
}
```
:::

::: tab Mac
1. 打开“终端”应用。执行以下命令，打开你的 Codex 配置目录。

```bash
open ~/.codex
```

2. 当前目录中，常用的配置文件主要是这两个：

- `config.toml`：Codex 的核心配置文件，中转服务与 MCP 等都在这里配置。
- `auth.json`：用来保存你在中转站获取的 API Key。

3. 配置config.toml

将以下配置文本复制到你的 config.toml文件中保存
``` toml
model_provider = "custom"
model = "gpt-5.4"
model_reasoning_effort = "xhigh"
service_tier = "fast"
model_context_window = 1000000
model_auto_compact_token_limit = 900000

[model_providers]

[model_providers.custom]
name = "custom"
wire_api = "responses"
requires_openai_auth = true
base_url = "http://e6q77.online/v1"

[projects]
trust_level = "trusted"

[notice]
hide_rate_limit_model_nudge = true

```

4. 配置ApiKey

将以下配置文本复制到你的 auth.json文件中
``` json
{
  "OPENAI_API_KEY": "API令牌中的Key"
}
:::

::::
