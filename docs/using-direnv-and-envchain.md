[back](../README.md)

---
# Using direnv and envchain

## direnv - per directory environment variables
more details - [direnv website](https://direnv.net)

When you have multiple projects which need environment variables to be set, adding them to your global shell profile can quickly lead to having a lot of unneccessary environment variables set.

(and when two projects both need the same variable name, but different values, it can become a mess)

One good solution to this is to use `direnv` which allows configuration of your shell on a per-directory basis using a `.envrc` file.


#### Installation (on mac):
```bash
brew install direnv
```
Then follow the displayed instructions to add integration for the shell you use.


#### Installation (linux/wsl):
On most linux distributions, direnv is available via the standard package manager for that distro (apt, yum etc.) which should also work in wsl.

#### Installation (windows native):
Direnv can be installed with winget, and is reportedly working in both bash and powershell although there may be some issues with path formatting.

#### Usage

Once set up, by adding a .envrc file to any directory will allow you to set environment variables and paths that will only be active within that directory or it's children.

By default, the first time you create a .envrc file, and each time it changes, you'll need to run `direnv allow` in that directory to allowlist your changes.

(this can be changed by setting `[whitelist]` directives in a `~/.config/direnv/direnv.toml` - see the [direnv.toml manpage](https://direnv.net/man/direnv.toml.1.html) for details)

#### VSCODE Integration:
There is a vscode extension that will load environment variables for the integrated terminal, and custon tasks [vscode plugin](https://marketplace.visualstudio.com/items?itemName=mkhl.direnv)

## envchain - sensitive environment variables stored in your keychain
more details - [envchain github](https://github.com/znz/envchain)

Another useful tool is `envchain`, which allows you to store sensitive values in the osx login keychain on mac, or the gnome keychain on linux, and then execute commands with specific variables defined.

This is useful when you need to expose passwords, api keys etc. to docker compose or other tools.

#### Installation (mac):
```bash
brew install envchain
```

#### Installation (linux):
Install from source (needs gcc installed)
```bash
make
sudo make install
```

#### Usage

Envchain uses the concept of namespaces, with each namespace able to store any number of environment variables.
to set a variable, `envchain --set NAMESPACE VARNAME` will prompt for a value.
to use it, execute a command with `envchain NAMESPACE command`

## Combining envchain with direnv
By creating a shell function to load envchain namespaces into the current shell, we can use the two together so that both non-sensitive, and sensitive environment variables can
be set when entering a directory.

To do this, first create a direnv central file in `~/.config/direnv/direnvrc` with the following content
```bash
# helper to load variables from envchain into current shell
# examples of usage:
# load the vars for the current directory
# envchainload
# load the vars for SECRETSQUIRREL
# envchainload SECRETSQUIRREL
function envchainload {
  for var in $(envchain --list ${1:-$(pwd)}); do
    export $var=$(envchain ${1:-$(pwd)} bash -c "echo \$$var")
  done
}
```

in any .envrc file, you can now load envchain variables... e.g.

`.envrc`
```bash
# AWS_REGION is not sensitive
export AWS_REGION=us-east-1
# aws credentials are stored in the keychain
envchainload AWS_CREDS
```

and all the environment variables you need will be set whenever you enter that directory, unset when you leave it, and sensitive ones never stored plaintext.

---
[back](../README.md)
