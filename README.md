ntfd
====

ntfd is a library for building daemons to continuously run
[ntf](https://github.com/shutterstock/ntf) tests.  ntfd runs ntf tests at
specified intervals in an infinite loop and sends the results to
[ntfserver](https://github.com/shutterstock/ntfserver).

See [the ntf homepage](http://code.shutterstock.com/ntf/) for more details about
the ntf framework.

### Requirements

  * [node](http://nodejs.org/)
  * [npm](http://npmjs.org/)

### Getting Started

Clone repository

    git clone git://github.com/shutterstock/ntfd.git

Switch to `example` directory

    cd ntfd/example

Install requirements

    npm install

Run daemon

    node .

### License

[MIT](LICENSE) © 2011-2017 Shutterstock Images, LLC
