ntfd
====

ntfd is a daemon for continuously running [ntf](https://github.com/shutterstock/ntf)
tests.  ntfd runs ntf tests at specified intervals in an infinite loop and sends the
results to [ntfserver](https://github.com/shutterstock/ntfserver)

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

This work is licensed under the MIT License (see the LICENSE file).
