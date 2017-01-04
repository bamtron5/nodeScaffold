##(From Scratch) Setup
*RUN this in command line*
* `npm init`
  * Name your project, then hit enter a few times
* `bower init`
  * Name your project, then hit enter a few times
* `tsc --init`

* `npm i --save @types/angular @types/angular-resource @types/angular-ui-router @types/body-parser @types/ejs @types/express @types/mongodb @types/mongoose body-parser dotenv ejs express mongodb mongoose path`

* `bower i --save angular angular-ui-router angular-resource`

*ALTER `package.json` to `"main": "./bin/www.js",`*


## (From Clone) Setup
* `npm i`
* `bower i`
* Create a .env file
  * Add `MONGO_URI=mongodb://localhost:27017/boxersApp`
  * Add `PORT=3000`

## Includes
* component architecture
* boxer api, model, seed, service
