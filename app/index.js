'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('Noodle') + ' generator!'
    ));

    var prompts = [
      {
        type: 'string',
        name: 'projectName',
        message: 'What would you like to call this new project?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('scrape.js'),
        this.destinationPath('scrape.js')
      );
      this.fs.copy(
        this.templatePath('service.js'),
        this.destinationPath('service.js')
      );
      this.fs.copy(
        this.templatePath('demo.js'),
        this.destinationPath('/sites/demo.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      callback: function () {
        console.log('Dependencies finished installing!');
      }
    });

    this.npmInstall(['q', 'underscore', 'request', 'noodlejs']);
  }
});
