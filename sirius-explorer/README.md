# Explorer

A Sirius blockchain explorer web application service for [Siriuscore Node](https://github.com/siriusproject/siriuscore-node) using the [Sirius API](https://github.com/siriusproject/insight-api).


## Getting Started

1. Install nvm https://github.com/creationix/nvm  

    ```bash
    nvm i v6
    nvm use v6
    ```  
2. Install mongo https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  

3. Install sirius-bitcore https://github.com/siriusproject/sirius-bitcore - with ZMQ ! 

    ```bash
    # with ZMQ
    sudo apt-get install libzmq3-dev 
    ```  
4. Install siriuscore-node  

    ```bash
    npm i https://github.com/siriusproject/siriuscore-node.git#master

    $(npm bin)/siriuscore-node create mynode

    cd mynode

    $(npm bin)/siriuscore-node install https://github.com/siriusproject/insight-api.git#master
    $(npm bin)/siriuscore-node install https://github.com/siriusproject/sirius-explorer.git#master
    ```  
5. Edit siriuscore-node.json  

    ```json
    {
      "network": "livenet",
      "port": 3001,
      "services": [
        "siriusd",
        "sirius-insight-api",
        "sirius-explorer",
        "web"
      ],
      "servicesConfig": {
        "sirius-explorer": {
          "apiPrefix": "sirius-insight-api",
          "routePrefix": "sirius-explorer",
          "nodemapLink": "https://sirius.org/en/nodemap"
       },
       "sirius-insight-api": {
         "routePrefix": "sirius-insight-api",
         "rateLimiterOptions": {
           "whitelist": [
             "123.456.12.34",
             "::ffff:123.456.12.34"
           ],
           "whitelistLimit": 9999999,
           "limit": 200,
           "interval": 60000,
           "banInterval": 3600000
         },
          "db": {
            "host": "127.0.0.1",
            "port": "27017",
            "database": "sirius-api-livenet",
            "user": "",
            "password": ""
         },
          "erc20": {
            "updateFromBlockHeight": 0
          }
        },
        "siriusd": {
          "spawn": {
            "datadir": "/home/user/.sirius",
           "exec": "/home/user/sirius-bitcore/src/siriusd"
          }
        }
      }
    }

    ```  
6. Edit sirius.conf  

    ```
    server=1
    whitelist=127.0.0.1
    txindex=1
    addressindex=1
    timestampindex=1
    spentindex=1
    zmqpubrawtx=tcp://127.0.0.1:28332
    zmqpubhashblock=tcp://127.0.0.1:28332
    rpcallowip=127.0.0.1
    rpcuser=user
    rpcpassword=password
    rpcport=18332
    reindex=1
    gen=0
    addrindex=1
    logevents=1
    ```  
7. Run Node  

    ```
    $(npm bin)/siriuscore-node start
    ```  

8. Open a web browser to `http://localhost:3001/sirius-explorer` or `http://localhost:3001/sirius-insight-api`  

## Development

To run Insight UI locally in development mode:

Install bower dependencies:

```
$ bower install
```

To compile and minify the web application's assets:

```
$ grunt compile
```

There is a convenient Gruntfile.js for automation during editing the code

```
$ grunt
```

## Multilanguage support

Insight UI uses [angular-gettext](http://angular-gettext.rocketeer.be) for multilanguage support.

To enable a text to be translated, add the ***translate*** directive to html tags. See more details [here](http://angular-gettext.rocketeer.be/dev-guide/annotate/). Then, run:

```
grunt compile
```

This action will create a template.pot file in ***po/*** folder. You can open it with some PO editor ([Poedit](http://poedit.net)). Read this [guide](http://angular-gettext.rocketeer.be/dev-guide/translate/) to learn how to edit/update/import PO files from a generated POT file. PO file will be generated inside po/ folder.

If you make new changes, simply run **grunt compile** again to generate a new .pot template and the angular javascript ***js/translations.js***. Then (if use Poedit), open .po file and choose ***update from POT File*** from **Catalog** menu.

Finally changes your default language from ***public/src/js/config***

```
gettextCatalog.currentLanguage = 'es';
```

This line will take a look at any *.po files inside ***po/*** folder, e.g.
**po/es.po**, **po/nl.po**. After any change do not forget to run ***grunt
compile***.


## Note

For more details about the [Sirius API](https://github.com/siriusproject/insight-api) configuration and end-points, go to [Sirius API](https://github.com/siriusproject/insight-api).

## Contribute

Contributions and suggestions are welcomed at the [Explorer GitHub repository](https://github.com/siriusproject/sirius-explorer).


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
