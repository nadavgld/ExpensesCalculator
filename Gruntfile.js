module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      folder: ["./public"]
    },
    exec: {
      "build-react": {
        command: "cd react && npm run build && cd .."
      },
      "start-server": {
        command: "npm run start",
        options: {}
      },
      "start-dev-server": {
        command: "npm run dev"
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: "react/build/",
        src: "**",
        dest: "./public/"
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-exec");

  grunt.registerTask("build", ["clean", "exec:build-react", "copy"]);

  grunt.registerTask("run", ["clean", "copy", "exec:start-server"]);

  grunt.registerTask("run:dev", [
    "clean",
    "exec:build-react",
    "copy",
    "exec:start-dev-server"
  ]);

  grunt.registerTask("default", [
    "clean",
    "exec:build-react",
    "copy",
    "exec:start-server"
  ]);
};
