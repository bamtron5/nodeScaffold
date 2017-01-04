##(From Scratch) Setup

* Create a .env file
  * Add `MONGO_URI=mongodb://localhost:27017/boxersApp`
  * Add `PORT=3000`

* `touch .gitignore` && add
```
.env
node_modules
bower_components
```

*RUN this in command line*
* `npm init`
  * Name your project, then hit enter a few times
* `bower init`
  * Name your project, then hit enter a few times
* `tsc --init`

* `npm i --save @types/angular @types/angular-resource @types/angular-ui-router @types/body-parser @types/ejs @types/express @types/mongodb @types/mongoose body-parser dotenv ejs express mongodb mongoose path`

* `bower i --save angular angular-ui-router angular-resource`

*ALTER `package.json` to `"main": "./bin/www.js",`*

*CREATE folders*
`mkdir api bin models models/seed ngApp ngApp/components ngApp/components/boxerList ngApp/components/boxerCard ngApp/services ngApp/filters routes views`

*CREATE files*
`touch app.ts bin/www.ts models/Boxers.ts models/seed/boxers.ts models/seed/index.ts views/index.ejs routes/index.ts ngApp/app.ts ngApp/components/boxerCard/boxerCard.ts ngApp/components/boxerCard/boxerCard.html ngApp/components/boxerList/boxerList.ts ngApp/components/boxerList/boxerList.html api/boxers.ts ngApp/services/services.ts`

*ALTER `./app.ts`*
```javascript
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as path from 'path';
import * as mongoose from 'mongoose';

//express routes
import routes from './routes/index';

//init express and assign it to app var
//INITIATE THE APP
let app = express();

//optional for security
const dev = app.get('env') === 'development' ? true : false;

//optional
if(dev){
  let dotenv = require('dotenv');
  dotenv.load();
}

//db connections
// mongodb://user:password@sub.mlab.com:39482/myapp
// instead of process if you don't use dotenv package
mongoose.connect(process.env.MONGO_URI);

//optional
mongoose.connection.on('connected', () => {
  console.log('mongoose connected');

  //if dev seed the deb
  if(dev) {
    mongoose.connection.db.dropDatabase();
    require('./models/seeds/index');
  }
});

//optional
mongoose.connection.on('error', (e) => {
  throw new Error(e);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//config bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static routing
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));

//a server route
app.use('/', routes);

//apis
app.use('/api', require('./api/boxers'));

// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: Error, req, res, next) => {

    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// TODO Error interface
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
```

*ALTER `./bin/www.ts`*
```javascript
let app = require('../app.js');
let http = require('http');

app.set('port', process.env.PORT);


var server = http.createServer(app);
server.listen(process.env.PORT);
console.log('im listening');
```

*ALTER `./ngApp/app.ts`*
```javascript
namespace chThreeApp {
  angular.module('ch-three-app', ['ngResource', 'ui.router'])
    .config((
      $resourceProvider: ng.resource.IResourceServiceProvider,
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider
    ) => {
      $stateProvider
        .state('home', {
          url: '/',
          template: '<boxer-list></boxer-list>'
        })

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
    })
    .run(() => {});
}
```

*ALTER `./models/Boxers.ts`*
```javascript
import * as mongoose from 'mongoose';

let Schema = mongoose.Schema;

export interface IBoxer extends mongoose.Document {
  name: string,
  age: number,
  weight: number
}

let BoxerSchema = new Schema({
  name: String,
  age: Number,
  weight: Number
});

export default mongoose.model<IBoxer>('Boxer', BoxerSchema);
```

*ALTER `./models/seeds/boxers.ts`*
```javascript
import Boxers from './../Boxers';

const seeds = [
  {name: 'Bill Brasky', age: 37, weight: 201},
  {name: 'Chip McDaniels', age: 29,  weight: 179},
  {name: 'Kevin Evans', age: 28, weight: 181}
]

seeds.map((seed) => {
  Boxers.create(seed, (e, data) => {
    if(e) throw new Error(e);
    console.log(`Created ${data.name} in the ${Boxers.modelName} collection as ${data._id}`);
  });
});
```

*ALTER `./models/seeds/index.ts`*
```javascript
require('./Boxers');
```

*ALTER `./api/boxers.ts`*
```javascript
import * as express from 'express';
import Boxers from './../models/Boxers';
let router = express.Router();

//get all
//TODO paginated
router.get('/boxers', (req, res, next) => {
  Boxers.find({}, {}, (e, data) => {
    if(e) return res.status(500);
    res.json(data);
  });
});

//new
router.post('/boxers', (req, res, next) => {
  Boxers.create(req.body, (e, data) => {
    if(e) return res.status(500);
    res.json(data);
  })
});

//update
router.put('/boxers/:id', (req, res, next) => {
  Boxers.update(
    { _id: req.params.id },
    req.body,
    {},
    (e, data) => {
      if(e) return res.status(500);
      res.json(data);
    });
});

export = router;
```

*ALTER `./ngApp/services/services.ts`*

```javascript
namespace chThreeApp.Services {
  export class BoxerService{
    public BoxerResource;

    getBoxers() {
      return this.BoxerResource.query().$promise;
    }

    //TODO should be typed
    update(boxer) {
      return this.BoxerResource.update({id: boxer._id}, boxer).$promise;
    }

    constructor(
      $resource: ng.resource.IResourceService
    ) {
      this.BoxerResource = $resource('/api/boxers/:id', {id: '@id'}, { update: { method: 'put' }});
    }
  }

  angular.module('ch-three-app').service('BoxerService', BoxerService);
}
```

*ALTER `./views/index.ejs`*
```html
<!DOCTYPE html>
 <html ng-app="ch-three-app">
 	<head>
 		<meta charset="utf-8">
 		<meta http-equiv="X-UA-Compatible" content="IE=edge">
 		<title>chThreeExpress</title>
 		<meta name="description" content=" " />
 		<meta name="author" content=" " />
 		<meta name="HandheldFriendly" content="true" />
 		<meta name="MobileOptimized" content="320" />
    <base href="/">
 		<!-- Use maximum-scale and user-scalable at your own risk. It disables pinch/zoom. Think about usability/accessibility before including.-->
 		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
 	</head>
 	<body>

    <ui-view></ui-view>

    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/angular-resource/angular-resource.js"></script>
    <script src="/bower_components/angular-ui-router/release/angular-ui-router.js"></script>

    <script src="/ngApp/app.js"></script>
    <script src="/ngApp/services/services.js"></script>

    <!-- grunt or gulp injection start -->
      <script src="/ngApp/components/boxerList/boxerList.js"></script>
      <script src="/ngApp/components/boxerCard/boxerCard.js"></script>
    <!-- grunt or gulp injection end -->

 	</body>
 </html>
```

*ALTER `./routes/index.ts`*
```javascript
import * as express from 'express';
let router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

export default router;
```

*ALTER `./ngApp/components/boxerCard/boxerCard.ts`*
```javascript
namespace chThreeApp.Components {
  //component config
  //boxerCard translates to <boxer-card boxer="vm.boxer"></boxer-card>
  const name = 'boxerCard'
  const template = '/ngApp/components/boxerCard/boxerCard.html';

  export class BoxerCard {
    public boxer;
    constructor(
      private BoxerService: chThreeApp.Services.BoxerService
    ) {
    }

    submit() {
      this.BoxerService.update(this.boxer)
        .then((data) => {
          //null
        }).catch((e) => {
          throw new Error(e);
        })
    }
  }

  angular.module('ch-three-app').component(name, {
    templateUrl: template,
    controller: chThreeApp.Components.BoxerCard,
    controllerAs: 'vm',
    bindings: {
      boxer: '<'
    }
  });
}
```

*ALTER `./ngApp/components/boxerCard/boxerCard.html`*
```html
<div style="border:1px solid black; padding: 5px;">

  <label for="name">Name</label>
  <input type="text" ng-model="vm.boxer.name" name="name">

  <label for="age">Age</label>
  <input type="number" ng-model="vm.boxer.age" name="age">

  <label for="weight">Weight</label>
  <input type="number" ng-model="vm.boxer.weight" name="weight">

  <button ng-click="vm.submit()">Submit</button>
</div>
```

*ALTER `./ngApp/boxerList/boxerList.ts`*
```javascript
  namespace chThreeApp.Components {
    //component config
    //boxerList translates to <boxer-list></boxer-list>
    const name = 'boxerList'
    const template = '/ngApp/components/boxerList/boxerList.html';

    export class BoxerList {
      public boxers;
      constructor(
        private BoxerService: chThreeApp.Services.BoxerService,
      ) {
        this.BoxerService.getBoxers()
          .then((data) => {
            this.boxers = data;
          }).catch((e) => {
            this.boxers = [];
            throw new Error(e);
          })
      }
    }

    angular.module('ch-three-app').component(name, {
      templateUrl: template,
      controller: chThreeApp.Components.BoxerList,
      controllerAs: 'vm'
    });
  }
```

*ALTER `./ngApp/components/boxerList/boxerList.html`*
```html
<form>
  <boxer-card ng-repeat="boxer in vm.boxers" boxer="boxer"></boxer-card>
</form>
```

## (From Clone) Setup
* `npm i`
* `bower i`
* Create a .env file
  * Add `MONGO_URI=mongodb://localhost:27017/boxersApp`
  * Add `PORT=3000`

## Includes
* component architecture
* boxer api, model, seed, service
