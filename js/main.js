"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e3) { throw _e3; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e4) { didErr = true; err = _e4; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  "use strict";

  var t,
      e = document.querySelectorAll(".ticker");

  var _iterator = _createForOfIteratorHelper(e),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _t9 = _step.value;
      s(_t9);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function s(t) {
    var e = t.querySelector(".ticker__list"),
        s = t.querySelectorAll(".ticker__item");

    var _iterator2 = _createForOfIteratorHelper(s),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _t = _step2.value;
        e.append(_t.cloneNode(!0));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    setInterval(function () {
      var s = getComputedStyle(e).transform.split(","),
          i = t.querySelector(".ticker__item"),
          n = i.offsetWidth;
      void 0 === s[4] ? s = -1 : (s = parseFloat(s[4]) - 1, -s > n && (s += n, e.append(i))), e.style.transform = "translateX(" + s + "px)";
    }, 10);
  }

  var i = /*#__PURE__*/function () {
    function i(t) {
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, i);

      this.options = e, this.slider = t, this.allSlides = t.querySelectorAll(".slider__list > *"), this.sliderList = t.querySelector(".slider__list"), e.loop && (this.loop = e.loop), e.nextButton && (this.nextButton = document.querySelector(e.nextButton)), e.prevButton && (this.prevButton = document.querySelector(e.prevButton)), e.infoCur && (this.infoCur = document.querySelector(e.infoCur)), e.infoLength && (this.infoLength = document.querySelector(e.infoLength)), e.bullets && (this.bullets = document.querySelector(e.bullets)), this.index = 0, this.length = this.allSlides.length, this.autoplay = e.autoplay || !1, this.paused = null, this.init();
    }

    _createClass(i, [{
      key: "destroy",
      value: function destroy() {
        var _iterator3 = _createForOfIteratorHelper(this.slider.querySelectorAll(".slider__list .cloneItem")),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _t2 = _step3.value;

            _t2.remove();
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        this.sliderList.style.transform = "", this.nextButton.removeEventListener("click", nextSlide), this.prevButton.removeEventListener("click", prevSlide), this.slider.classList.remove("init");
      }
    }, {
      key: "init",
      value: function init() {
        var _this = this;

        this.bullets && this.dots();

        var _iterator4 = _createForOfIteratorHelper(this.allSlides),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _t5 = _step4.value;

            var _e = _t5.cloneNode(!0);

            if (_t5.classList.contains("stages__item")) _e.classList.add("cloneItem");else {
              var _iterator5 = _createForOfIteratorHelper(_e.querySelectorAll(".stages__item")),
                  _step5;

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var _t6 = _step5.value;

                  _t6.classList.add("cloneItem");
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }
            this.sliderList.append(_e);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        if (this.infoLength && (this.infoLength.innerHTML = this.length, this.infoCur.innerHTML = 1), this.nextButton && this.prevButton) {
          if (this.nextButton) {
            var _t3 = function _t3(t) {
              t.preventDefault(), _this.next();
            };

            this.nextButton.addEventListener("click", _t3);
          }

          if (this.prevButton) {
            var _t4 = function _t4(t) {
              t.preventDefault(), _this.prev();
            };

            this.prevButton.addEventListener("click", _t4);
          }

          this.checkBtnsActive();
        }

        this.autoplay && (this.play(), this.slider.addEventListener("mouseenter", function () {
          return clearInterval(_this.paused);
        }), this.slider.addEventListener("mouseleave", function () {
          return _this.play();
        }), this.nextButton && (this.nextButton.addEventListener("mouseenter", function () {
          return clearInterval(_this.paused);
        }), this.nextButton.addEventListener("mouseleave", function () {
          return _this.play();
        })), this.prevButton && (this.prevButton.addEventListener("mouseenter", function () {
          return clearInterval(_this.paused);
        }), this.prevButton.addEventListener("mouseleave", function () {
          return _this.play();
        }))), this.slider.classList.add("init");
      }
    }, {
      key: "checkBtnsActive",
      value: function checkBtnsActive() {
        this.loop || (this.nextButton && (this.index === this.length - 1 ? this.nextButton.setAttribute("disabled", " ") : this.nextButton.removeAttribute("disabled")), this.prevButton && (0 === this.index ? this.prevButton.setAttribute("disabled", "") : this.prevButton.removeAttribute("disabled")));
      }
    }, {
      key: "goto",
      value: function goto(t) {
        t > this.length - 1 ? this.index = 0 : this.index = t < 0 ? this.length - 1 : t, this.infoCur && (this.infoCur.innerHTML = this.index + 1), this.checkBtnsActive(), this.move();
      }
    }, {
      key: "next",
      value: function next() {
        this["goto"](this.index + 1);
      }
    }, {
      key: "prev",
      value: function prev() {
        this["goto"](this.index - 1);
      }
    }, {
      key: "move",
      value: function move() {
        var t = this.allSlides[this.index].offsetLeft;

        if (this.sliderList.style.transform = "translateX(-".concat(t, "px)"), this.bullets) {
          var _iterator6 = _createForOfIteratorHelper(this.bullets.children),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var _t7 = _step6.value;

              _t7.classList.remove("active");
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          this.bullets.children[this.index].classList.add("active");
        }
      }
    }, {
      key: "play",
      value: function play() {
        var _this2 = this;

        this.paused = setInterval(function () {
          return _this2.next();
        }, 4e3);
      }
    }, {
      key: "dots",
      value: function dots() {
        if (!(this.bullets.children.length > 0)) for (var _t8 = 0; _t8 < this.length; _t8++) {
          var _e2 = document.createElement("div");

          _e2.classList.add("slider-nav__bullet"), 0 === _t8 && _e2.classList.add("active"), this.bullets.append(_e2);
        }
      }
    }]);

    return i;
  }();

  function n() {
    var e = window.innerWidth,
        s = document.querySelector(".stages__items");
    e <= 768 ? function () {
      var t = document.querySelector(".stages__list");
      if (t.classList.contains("groupped")) return;
      var e = document.querySelectorAll(".stages__item");
      var s = document.createElement("div");
      s.classList.add("stages__group"), e[0].insertAdjacentElement("beforebegin", s), s.append(e[0]), s.append(e[1]);
      var i = document.createElement("div");
      return i.classList.add("stages__group"), e[3].insertAdjacentElement("beforebegin", i), i.append(e[3]), i.append(e[4]), t.classList.add("groupped"), !0;
    }() && (t = new i(s, {
      prevButton: ".stages__nav .slider-nav__prev",
      nextButton: ".stages__nav .slider-nav__next",
      bullets: ".stages__nav .slider-nav__bullets"
    })) : function () {
      var t = document.querySelector(".stages__list");
      if (t.classList.contains("groupped")) return document.querySelectorAll(".stages__group").forEach(function (t) {
        t.querySelectorAll(".stages__item").forEach(function (e) {
          t.insertAdjacentElement("afterend", e);
        }), t.remove();
      }), t.classList.remove("groupped"), !0;
    }() && t.destroy();
  }

  document.addEventListener("DOMContentLoaded", function () {
    new i(document.querySelector(".participants__items"), {
      autoplay: !0,
      loop: !0,
      prevButton: ".participants__nav .slider-nav__prev",
      nextButton: ".participants__nav .slider-nav__next",
      infoCur: ".participants__nav .slider-nav__info-cur",
      infoLength: ".participants__nav .slider-nav__info-length"
    }), window.addEventListener("resize", function () {
      n();
    }, !0);
  }), n();
})();