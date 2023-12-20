/* eslint-env mocha */

const assert = require("assert");
const fs = require("fs");
const child_process = require("child_process");
const rimraf = require("rimraf");

describe("index.js", function () {
  beforeEach(function () {
    rimraf.sync("test/dist");
  });

  it("should generate icon files", function (done) {
    this.timeout(10000);

    const paths = [
      "mac/icon.icns",
      "win/icon.ico",
      "png/16x16.png",
      "png/24x24.png",
      "png/32x32.png",
      "png/48x48.png",
      "png/64x64.png",
      "png/128x128.png",
      "png/256x256.png",
      "png/512x512.png",
      "png/1024x1024.png",
    ];

    const child = child_process.fork(
      "./index.js",
      ["--input", "test/test.png", "--output", "test/dist"],
      { silent: true }
    );

    child.on("exit", (code) => {
      assert.equal(code, 0, "Exit code");
      for (const path of paths) {
        assert.ok(fs.existsSync("./test/dist/" + path), path);
      }

      done();
    });
  });

  it("should generate icon files with flatten option", function (done) {
    this.timeout(10000);

    const paths = [
      "icon.icns",
      "icon.ico",
      "16x16.png",
      "24x24.png",
      "32x32.png",
      "48x48.png",
      "64x64.png",
      "128x128.png",
      "256x256.png",
      "512x512.png",
      "1024x1024.png",
    ];

    const child = child_process.fork(
      "./index.js",
      ["--input", "test/test.png", "--output", "test/dist", "--flatten"],
      { silent: true }
    );

    child.on("exit", (code) => {
      assert.equal(code, 0, "Exit code");
      for (const path of paths) {
        assert.ok(fs.existsSync("./test/dist/" + path), path);
      }

      done();
    });
  });
});
