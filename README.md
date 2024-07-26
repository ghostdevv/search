# Search

A CLI and API for searching that has built-in commands. Originally inspired by [alii/search](https://github.com/alii/search).

## Installation

### Grab the binary

```bash
curl -sL -o search https://github.com/ghostdevv/search/releases/latest/download/search-linux-amd64 \
  && chmod +x search \
  && sudo mv -f search /usr/local/bin \
  && sudo chown root:root /usr/local/bin/search
```

### Service

```bash
sudo curl -sL -o /lib/systemd/system/search.service https://raw.githubusercontent.com/ghostdevv/search/main/search.service \
  && sudo systemctl daemon-reload \
  && sudo systemctl enable search --now
```
