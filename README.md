# SiriusAPI
Projects ported from Bitcore to support the Insight API.


These projects require the Sirius core wallet. Clone and build the siriuscore wallet from here before you start: https://github.com/siriuscore/sirius


Follow these scripts to install nvm, node and some required dependencies.
## Getting Started
```bash
wget -qO- https://raw.githubusercontent.com/xtuple/nvm/master/install.sh | sudo bash
sudo nvm install 6
sudo nvm use 6
sudo apt-get install -y build-essential
sudo apt-get install libzmq3-dev
sudo npm install mocha -g
sudo npm install touch -g
sudo npm install gulp-cli -g
sudo npm install jshint -g
sudo npm install phantomjs-prebuilt -g
```  
Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
Then open a Mongodb client window and create a user in the admin database:
```
use admin
db.createUser(
   {
     user: "sirius",
     pwd: "mynewpassword",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```
Clone this repository into a folder called `projects` in your home directory.
```bash
mkdir projects
cd projects
git clone https://github.com/SportsPodium/siriusAPI --recursive
```
## Project Dependencies
**sirius-explorer** requires the **sirius-insight-api** that runs on **siriuscore-node** that has dependencies on **siriuscore-lib** and **siriusd-rpc**

After a successful build of the siriuscore wallet, you need to create a link to the sirius daemon in the bin folder of the **siriuscore-node** project. Eg:
```bash
cd ~/projects/siriusAPI/siriuscore-node/bin
chmod +x siriuscore-node
ln -sf ~/sirius/src/siriusd
```

Run **npm install** in all of the project folders.
```bash
cd ~/projects/siriusAPI/siriusd-rpc
npm install

cd ~/projects/siriusAPI/siriuscore-lib
npm install

cd ~/projects/siriusAPI/siriuscore-node
npm install

cd ~/projects/siriusAPI/sirius-insight-api
npm install

cd ~/projects/siriusAPI/sirius-explorer
npm install
```

Then create links as specified below.


Add the inter-project dependencies in the **siriuscore-node** node_modules directory:
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
cd ~/projects
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
    "sirius-explorer": {
      "apiPrefix": "sirius-insight-api",
      "routePrefix": "sirius-explorer",
      "nodemapLink": "localhost/nodemap"
   },
    "sirius-insight-api": {
      "routePrefix": "sirius-insight-api",
      "db": {
        "user": "sirius",
        "password": "mynewpassword",
        "host": "localhost",
        "port": 27017,
        "database": "admin"
      },
      "erc20Config": {
        "updateFromBlockHeight": 0
      }
    },
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
logevents=1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
par=2
onlynet=ipv4
maxconnections=24
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=user
rpcpassword=password
rpcport=8332
reindex=1
gen=0
addrindex=1
```
Make sure the Sirius wallet functions properly.
```bash
cd ~/sirius/src
./siriusd &
./sirius-cli getinfo
sudo pkill siriusd
```
From within the `devnode` directory with the configuration file, start the node:
```bash
cd ~/projects/devnode/
../siriusAPI/siriuscore-node/bin/siriuscore-node start
```

Test the insight API:
http://localhost:3001/sirius-insight-api/status

Open the Block Explorer:
http://localhost:3001/sirius-explorer/


