# SiriusAPI
Projects ported from Bitcore to support the Insight API.
These scripts assume you cloned this repository into a folder called `projects` in your home directory.

## Dependencies
**sirius-explorer** requires the **sirius-insight-api** that runs on **siriuscore-node** that has dependencies on **siriuscore-lib** and **siriusd-rpc**

Everything also depends on the siriuscore wallet here: https://github.com/siriuscore/sirius

After a successful build of the sirius wallet, you need to create a link to the sirius daemon in the bin folder of the **siriuscore-node** project. Eg:
```bash
cd ~/projects/siriusAPI/siriuscore-node/bin
ln -sf ~/projects/sirius/src/siriusd
```
Also add the inter-project dependencies in the **siriuscore-node** node_modules directory:
```bash
cd ~/projects/siriusAPI/siriuscore-node/node_modules/
ln -s ~/projects/siriusAPI/siriuscore-lib
ln -s ~/projects/siriusAPI/siriusd-rpc
```
And then the link for the **sirius-insight-api** node_modules directory:
```bash
cd ~/projects/siriusAPI/sirius-insight-api/node_modules/
ln -s ~/projects/siriusAPI/siriuscore-lib
```

## Running a Development Node (siriuscore-node)

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch siriuscore-node.json
touch package.json
```

Edit `siriuscore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "siriusd",
    "web",
    "sirius-insight-api",
    "sirius-explorer"
  ],
  "servicesConfig": {
    "siriusd": {
      "spawn": {
        "datadir": "/home/<youruser>/.sirius",
        "exec": "/home/<youruser>/sirius/src/siriusd"
      }
    }
  }
}
```

Setup symlinks for all of the (locally cloned) services and dependencies:

```bash
cd node_modules
ln -s ~/projects/siriusAPI/siriuscore-lib
ln -s ~/projects/siriusAPI/siriuscore-node
ln -s ~/projects/siriusAPI/sirius-insight-api
ln -s ~/projects/siriusAPI/sirius-explorer
```

Make sure that the `<datadir>/sirius.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
par=2
onlynet=ipv4
maxconnections=24
zmqpubrawtx=tcp://127.0.0.1:8332
zmqpubhashblock=tcp://127.0.0.1:8332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=8332
reindex=1
gen=0
addrindex=1
logevents=1
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../projects/siriusAPI/siriuscore-node/bin/siriuscore-node start
```

