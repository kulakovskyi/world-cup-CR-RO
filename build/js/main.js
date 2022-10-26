"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// Slider
var prizesLeftArrow = document.querySelector('.controls-left'),
  prizesRightArrow = document.querySelector('.controls-right');
var slider1 = slider('task-slider', '.task__slider-item', prizesLeftArrow, prizesRightArrow, true);
function slider(id, itemSelector, leftArrow, rightArrow, autoplay, config) {
  var AUTOPLAY_INTERVAL = 5000;
  var el = document.getElementById(id);
  el.classList.add('slider');
  var mediaStep = '';
  var activeIndIndex = 0;
  var toogleIndex = 0;
  var items = el.querySelectorAll(itemSelector);
  var timerId;
  function getMediaStep() {
    var width = window.innerWidth;
    var newStep = width > (obj.config.media && obj.config.media.lg) ? 'lg' : width > (obj.config.media && obj.config.media.md) ? 'md' : width > (obj.config.media && obj.config.media.sm) ? 'sm' : 'xs';
    if (mediaStep !== newStep) {
      mediaStep = newStep;
      obj.buildSlider();
    }
  }
  function getItemsQuantity() {
    return obj.config.elemsPerPage[mediaStep];
  }
  function onResize() {
    getMediaStep();
  }
  var obj = {
    activeIndex: 0,
    activeIndIndex: activeIndIndex > 0 ? activeIndIndex : 0,
    toggleIndex: 0,
    init: function init() {
      getMediaStep();
      var startX = 0;
      var touched = false;
      var inner = el.querySelector('.slider-inner');
      var indicators = el.querySelectorAll('.slider-indicator');
      function onMouseDown(e) {
        startX = e.clientX || e.touches[0].clientX;
        touched = true;
        var weekly = document.querySelectorAll('.result__weeks-btn');
        // for (const item of weekly) item.addEventListener('touchstart', selectWeek);
      }

      function onMouseMove(e) {
        e.preventDefault();
        if (touched) {
          inner = inner || el.querySelector('.slider-inner');
          var x = e.clientX || e.touches[0].clientX;
          var diff = x - startX;
          if (diff < 0 && activeIndIndex < indicators.length - 1 || diff > 0 && activeIndIndex > 0) {
            inner.style.transform = 'translateX(' + diff + 'px)';
          }
        }
      }
      function onMouseEnd(e) {
        if (touched) {
          var x = e.clientX || e.changedTouches[0].clientX;
          if (x - startX > 30) {
            toggleIndex(activeIndIndex - 1);
          } else if (startX - x > 30) {
            toggleIndex(activeIndIndex + 1);
          }
          inner = inner || el.querySelector('.slider-inner');
          inner.style.transform = '';
        }
        touched = false;
      }
      rightArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex + 1);
        // obj.next()
      });

      leftArrow.addEventListener('click', function () {
        toggleIndex(activeIndIndex - 1);
        // obj.prev()
      });

      window.removeEventListener('resize', onResize);
      window.addEventListener('resize', onResize);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('touchstart', onMouseDown);
      el.addEventListener('mousedown', onMouseDown);
      el.addEventListener('touchstart', onMouseDown);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchmove', onMouseMove);
      el.addEventListener('mousemove', onMouseMove);
      // el.addEventListener('touchmove', onMouseMove);
      window.removeEventListener('mouseup', onMouseEnd);
      window.removeEventListener('touchend', onMouseEnd);
      window.addEventListener('mouseup', onMouseEnd);
      window.addEventListener('touchend', onMouseEnd);
      if (autoplay) {
        timerId = setInterval(function () {
          return toggleIndex((activeIndIndex + 1) % indicators.length);
        }, AUTOPLAY_INTERVAL);
      }
      return obj;
    },
    config: {
      elemsPerPage: _objectSpread(_objectSpread({}, {
        'lg': 1,
        'md': 1,
        'sm': 1,
        'xs': 1
      }), config && config.elemsPerPage || {}),
      media: _objectSpread(_objectSpread({}, {
        'lg': 1160,
        'md': 920,
        'sm': 700
      }), config && config.media || {})
    },
    buildSlider: function buildSlider() {
      obj.removeSlider();
      var wrapper = document.createElement("div");
      wrapper.className = 'slider-wrapper';
      var inner = document.createElement("div");
      inner.className = 'slider-inner';
      wrapper.appendChild(inner);
      el.appendChild(wrapper);
      if (obj.config.elemsPerPage[mediaStep] >= items.length + 1) {
        el.classList.add('not-enough-elems');
        return;
      }
      buildPages();
    },
    //     getMediaStep() {
    //     // var width = window.innerWidth;
    //     // var newStep = width > mediaConfig && mediaConfig.lg !== undefined ? mediaConfig.lg : 1150 ? 'lg'
    //     //     : width > (mediaConfig && mediaConfig.md !== undefined ? mediaConfig.md : 767) ? 'md'
    //     //         : width > (mediaConfig && mediaConfig.sm !== undefined ? mediaConfig.sm : 600) ? 'sm' : 'xs';
    //
    //     if (mediaStep !== newStep) {
    //         mediaStep = newStep;
    //         obj.buildSlider();
    //     }
    // },
    removeSlider: function removeSlider() {
      var wrapper = el.querySelector('.slider-wrapper');
      el.classList.remove('not-enough-elems');
      wrapper && wrapper.remove();
      if (timerId) {
        clearInterval(timerId);
      }
    },
    toggle: toggleIndex
  };
  function buildIndicators() {
    var prevInd = el.querySelector('.slider-indicators');
    prevInd && prevInd.remove();
    var indicators = document.createElement('div');
    indicators.classList.add('slider-indicators');
    var _loop = function _loop(i) {
      var indicator = document.createElement('div');
      indicator.classList.add('slider-indicator');
      if (i === activeIndIndex) {
        indicator.classList.add('active');
      }
      indicator.setAttribute('index', i);
      indicator.addEventListener('click', function () {
        toggleIndex(i);
      });
      indicators.appendChild(indicator);
    };
    for (var i = 0; i < Math.ceil(items.length / getItemsQuantity()); i++) {
      _loop(i);
    }
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.appendChild(indicators);
  }
  function buildPages(step) {
    step = step || 1;
    var pagePrev = buildPage(obj.activeIndex + items.length - getItemsQuantity() * step);
    var pageCurrent = buildPage(obj.activeIndex);
    var pageNext = buildPage(obj.activeIndex + getItemsQuantity() * step);
    var inner = el.querySelector('.slider-inner');
    if (getItemsQuantity() < items.length) {
      buildIndicators();
      if (!el.querySelector('.slider-indicator.active')) {
        // toggleIndex(0);
      }
    }
    inner.innerHTML = '';
    inner.appendChild(pagePrev);
    inner.appendChild(pageCurrent);
    inner.appendChild(pageNext);
  }
  function buildPage(index) {
    var page = document.createElement("div");
    page.classList.add('slider-page');
    for (var i = index; i < index + getItemsQuantity(); i++) {
      var item = items[i % items.length];
      var newItem = item.cloneNode(true);
      page.appendChild(newItem);
    }
    return page;
  }
  function toggleIndex(index) {
    var indActive = el.querySelector('.slider-indicator.active');
    var indicators = el.querySelectorAll('.slider-indicator');
    if (!indicators[index]) {
      return;
    }
    leftArrow.classList.remove('arrow-disabled');
    rightArrow.classList.remove('arrow-disabled');
    if (index === 0) {
      leftArrow.classList.add('arrow-disabled');
    }
    if (index === indicators.length - 1) {
      rightArrow.classList.add('arrow-disabled');
    }
    indActive && indActive.classList.remove('active');
    indicators[index] && indicators[index].classList.add('active');
    if (index > activeIndIndex) {
      index - activeIndIndex > 1 && buildPages(index - activeIndIndex);
      obj.next();
    } else if (index < activeIndIndex) {
      activeIndIndex - index > 1 && buildPages(activeIndIndex - index);
      obj.prev();
    }
    activeIndIndex = index;
    // document.querySelector('.current').textContent = activeIndIndex + 1;
  }

  obj.prev = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('prev');
    setTimeout(function () {
      wrapper.classList.remove('prev');
      obj.activeIndex = (obj.activeIndex - getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };
  obj.next = function () {
    var wrapper = el.querySelector('.slider-wrapper');
    wrapper.classList.add('next');
    setTimeout(function () {
      wrapper.classList.remove('next');
      obj.activeIndex = (obj.activeIndex + getItemsQuantity() + items.length) % items.length;
      buildPages();
    }, 300);
  };
  return obj.init();
}
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsicHJpemVzTGVmdEFycm93IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHJpemVzUmlnaHRBcnJvdyIsInNsaWRlcjEiLCJzbGlkZXIiLCJpZCIsIml0ZW1TZWxlY3RvciIsImxlZnRBcnJvdyIsInJpZ2h0QXJyb3ciLCJhdXRvcGxheSIsImNvbmZpZyIsIkFVVE9QTEFZX0lOVEVSVkFMIiwiZWwiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTGlzdCIsImFkZCIsIm1lZGlhU3RlcCIsImFjdGl2ZUluZEluZGV4IiwidG9vZ2xlSW5kZXgiLCJpdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0aW1lcklkIiwiZ2V0TWVkaWFTdGVwIiwid2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwibmV3U3RlcCIsIm9iaiIsIm1lZGlhIiwibGciLCJtZCIsInNtIiwiYnVpbGRTbGlkZXIiLCJnZXRJdGVtc1F1YW50aXR5IiwiZWxlbXNQZXJQYWdlIiwib25SZXNpemUiLCJhY3RpdmVJbmRleCIsInRvZ2dsZUluZGV4IiwiaW5pdCIsInN0YXJ0WCIsInRvdWNoZWQiLCJpbm5lciIsImluZGljYXRvcnMiLCJvbk1vdXNlRG93biIsImUiLCJjbGllbnRYIiwidG91Y2hlcyIsIndlZWtseSIsIm9uTW91c2VNb3ZlIiwicHJldmVudERlZmF1bHQiLCJ4IiwiZGlmZiIsImxlbmd0aCIsInN0eWxlIiwidHJhbnNmb3JtIiwib25Nb3VzZUVuZCIsImNoYW5nZWRUb3VjaGVzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRJbnRlcnZhbCIsInJlbW92ZVNsaWRlciIsIndyYXBwZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kQ2hpbGQiLCJidWlsZFBhZ2VzIiwicmVtb3ZlIiwiY2xlYXJJbnRlcnZhbCIsInRvZ2dsZSIsImJ1aWxkSW5kaWNhdG9ycyIsInByZXZJbmQiLCJpIiwiaW5kaWNhdG9yIiwic2V0QXR0cmlidXRlIiwiTWF0aCIsImNlaWwiLCJzdGVwIiwicGFnZVByZXYiLCJidWlsZFBhZ2UiLCJwYWdlQ3VycmVudCIsInBhZ2VOZXh0IiwiaW5uZXJIVE1MIiwiaW5kZXgiLCJwYWdlIiwiaXRlbSIsIm5ld0l0ZW0iLCJjbG9uZU5vZGUiLCJpbmRBY3RpdmUiLCJuZXh0IiwicHJldiIsInNldFRpbWVvdXQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxJQUFJQSxlQUFlLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQzFEQyxnQkFBZ0IsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7QUFFaEUsSUFBSUUsT0FBTyxHQUFHQyxNQUFNLENBQ2hCLGFBQWEsRUFDYixvQkFBb0IsRUFDcEJMLGVBQWUsRUFBRUcsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO0FBRTVDLFNBQVNFLE1BQU0sQ0FBQ0MsRUFBRSxFQUFFQyxZQUFZLEVBQUVDLFNBQVMsRUFBRUMsVUFBVSxFQUFFQyxRQUFRLEVBQUVDLE1BQU0sRUFBRTtFQUN2RSxJQUFNQyxpQkFBaUIsR0FBRyxJQUFJO0VBRTlCLElBQUlDLEVBQUUsR0FBR1osUUFBUSxDQUFDYSxjQUFjLENBQUNSLEVBQUUsQ0FBQztFQUNwQ08sRUFBRSxDQUFDRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDMUIsSUFBSUMsU0FBUyxHQUFHLEVBQUU7RUFDbEIsSUFBSUMsY0FBYyxHQUFHLENBQUM7RUFDdEIsSUFBSUMsV0FBVyxHQUFHLENBQUM7RUFDbkIsSUFBSUMsS0FBSyxHQUFHUCxFQUFFLENBQUNRLGdCQUFnQixDQUFDZCxZQUFZLENBQUM7RUFDN0MsSUFBSWUsT0FBTztFQUVYLFNBQVNDLFlBQVksR0FBRztJQUNwQixJQUFJQyxLQUFLLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBVTtJQUM3QixJQUFJQyxPQUFPLEdBQUdILEtBQUssSUFBSUksR0FBRyxD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LyBTbGlkZXJcbmxldCBwcml6ZXNMZWZ0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbHMtbGVmdCcpLFxuICAgIHByaXplc1JpZ2h0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbHMtcmlnaHQnKTtcblxudmFyIHNsaWRlcjEgPSBzbGlkZXIoXG4gICAgJ3Rhc2stc2xpZGVyJyxcbiAgICAnLnRhc2tfX3NsaWRlci1pdGVtJyxcbiAgICBwcml6ZXNMZWZ0QXJyb3csIHByaXplc1JpZ2h0QXJyb3csIHRydWUpO1xuXG5mdW5jdGlvbiBzbGlkZXIoaWQsIGl0ZW1TZWxlY3RvciwgbGVmdEFycm93LCByaWdodEFycm93LCBhdXRvcGxheSwgY29uZmlnKSB7XG4gICAgY29uc3QgQVVUT1BMQVlfSU5URVJWQUwgPSA1MDAwO1xuXG4gICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcicpXG4gICAgdmFyIG1lZGlhU3RlcCA9ICcnO1xuICAgIHZhciBhY3RpdmVJbmRJbmRleCA9IDA7XG4gICAgdmFyIHRvb2dsZUluZGV4ID0gMDtcbiAgICB2YXIgaXRlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW1TZWxlY3Rvcik7XG4gICAgdmFyIHRpbWVySWQ7XG5cbiAgICBmdW5jdGlvbiBnZXRNZWRpYVN0ZXAoKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgbmV3U3RlcCA9IHdpZHRoID4gKG9iai5jb25maWcubWVkaWEgJiYgb2JqLmNvbmZpZy5tZWRpYS5sZykgPyAnbGcnXG4gICAgICAgICAgICA6IHdpZHRoID4gKG9iai5jb25maWcubWVkaWEgJiYgb2JqLmNvbmZpZy5tZWRpYS5tZCkgPyAnbWQnXG4gICAgICAgICAgICAgICAgOiB3aWR0aCA+IChvYmouY29uZmlnLm1lZGlhICYmIG9iai5jb25maWcubWVkaWEuc20pID8gJ3NtJyA6ICd4cyc7XG5cbiAgICAgICAgaWYgKG1lZGlhU3RlcCAhPT0gbmV3U3RlcCkge1xuICAgICAgICAgICAgbWVkaWFTdGVwID0gbmV3U3RlcDtcbiAgICAgICAgICAgIG9iai5idWlsZFNsaWRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRJdGVtc1F1YW50aXR5KCkge1xuICAgICAgICByZXR1cm4gb2JqLmNvbmZpZy5lbGVtc1BlclBhZ2VbbWVkaWFTdGVwXVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICAgICAgICBnZXRNZWRpYVN0ZXAoKVxuICAgIH1cblxuICAgIHZhciBvYmogPSB7XG4gICAgICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgICAgICBhY3RpdmVJbmRJbmRleDogYWN0aXZlSW5kSW5kZXggPiAwID8gYWN0aXZlSW5kSW5kZXggOiAwLFxuICAgICAgICB0b2dnbGVJbmRleDogMCxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2V0TWVkaWFTdGVwKCk7XG5cbiAgICAgICAgICAgIHZhciBzdGFydFggPSAwXG4gICAgICAgICAgICB2YXIgdG91Y2hlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgIHZhciBpbm5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItaW5uZXInKTtcbiAgICAgICAgICAgIHZhciBpbmRpY2F0b3JzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlci1pbmRpY2F0b3InKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Nb3VzZURvd24oZSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0WCA9IGUuY2xpZW50WCB8fCBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgICAgICB0b3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB3ZWVrbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzdWx0X193ZWVrcy1idG4nKTtcbiAgICAgICAgICAgICAgICAvLyBmb3IgKGNvbnN0IGl0ZW0gb2Ygd2Vla2x5KSBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzZWxlY3RXZWVrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgIGlmICh0b3VjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyID0gaW5uZXIgfHwgZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpXG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gZS5jbGllbnRYIHx8IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmZiA9IHggLSBzdGFydFg7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoZGlmZiA8IDAgJiYgYWN0aXZlSW5kSW5kZXggPCBpbmRpY2F0b3JzLmxlbmd0aCAtIDEpIHx8IChkaWZmID4gMCAmJiBhY3RpdmVJbmRJbmRleCA+IDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lci5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgZGlmZiArICdweCknXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTW91c2VFbmQoZSkge1xuICAgICAgICAgICAgICAgIGlmICh0b3VjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4ID0gZS5jbGllbnRYIHx8IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHggLSBzdGFydFggPiAzMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggLSAxKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0WCAtIHggPiAzMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlubmVyID0gaW5uZXIgfHwgZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpXG4gICAgICAgICAgICAgICAgICAgIGlubmVyLnN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRvdWNoZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByaWdodEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRvZ2dsZUluZGV4KGFjdGl2ZUluZEluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAvLyBvYmoubmV4dCgpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBsZWZ0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdG9nZ2xlSW5kZXgoYWN0aXZlSW5kSW5kZXggLSAxKVxuICAgICAgICAgICAgICAgIC8vIG9iai5wcmV2KClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25SZXNpemUpO1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG9uTW91c2VEb3duKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvbk1vdXNlRG93bik7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICAvLyBlbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VFbmQpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Nb3VzZUVuZCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VFbmQpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Nb3VzZUVuZCk7XG5cbiAgICAgICAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0b2dnbGVJbmRleCgoYWN0aXZlSW5kSW5kZXggKyAxKSAlIGluZGljYXRvcnMubGVuZ3RoKSwgQVVUT1BMQVlfSU5URVJWQUwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgZWxlbXNQZXJQYWdlOiB7XG4gICAgICAgICAgICAgICAgLi4ue1xuICAgICAgICAgICAgICAgICAgICAnbGcnOiAxLFxuICAgICAgICAgICAgICAgICAgICAnbWQnOiAxLFxuICAgICAgICAgICAgICAgICAgICAnc20nOiAxLFxuICAgICAgICAgICAgICAgICAgICAneHMnOiAxXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAuLi4oKGNvbmZpZyAmJiBjb25maWcuZWxlbXNQZXJQYWdlKSB8fCB7fSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZWRpYToge1xuICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgJ2xnJzogMTE2MCxcbiAgICAgICAgICAgICAgICAgICAgJ21kJzogOTIwLFxuICAgICAgICAgICAgICAgICAgICAnc20nOiA3MDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLigoY29uZmlnICYmIGNvbmZpZy5tZWRpYSkgfHwge30pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJ1aWxkU2xpZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvYmoucmVtb3ZlU2xpZGVyKCk7XG5cblxuICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSAnc2xpZGVyLXdyYXBwZXInO1xuICAgICAgICAgICAgdmFyIGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGlubmVyLmNsYXNzTmFtZSA9ICdzbGlkZXItaW5uZXInO1xuICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChpbm5lcik7XG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICAgICAgICAgICAgaWYgKG9iai5jb25maWcuZWxlbXNQZXJQYWdlW21lZGlhU3RlcF0gPj0gaXRlbXMubGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1lbm91Z2gtZWxlbXMnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWlsZFBhZ2VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vICAgICBnZXRNZWRpYVN0ZXAoKSB7XG4gICAgICAgIC8vICAgICAvLyB2YXIgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgLy8gICAgIC8vIHZhciBuZXdTdGVwID0gd2lkdGggPiBtZWRpYUNvbmZpZyAmJiBtZWRpYUNvbmZpZy5sZyAhPT0gdW5kZWZpbmVkID8gbWVkaWFDb25maWcubGcgOiAxMTUwID8gJ2xnJ1xuICAgICAgICAvLyAgICAgLy8gICAgIDogd2lkdGggPiAobWVkaWFDb25maWcgJiYgbWVkaWFDb25maWcubWQgIT09IHVuZGVmaW5lZCA/IG1lZGlhQ29uZmlnLm1kIDogNzY3KSA/ICdtZCdcbiAgICAgICAgLy8gICAgIC8vICAgICAgICAgOiB3aWR0aCA+IChtZWRpYUNvbmZpZyAmJiBtZWRpYUNvbmZpZy5zbSAhPT0gdW5kZWZpbmVkID8gbWVkaWFDb25maWcuc20gOiA2MDApID8gJ3NtJyA6ICd4cyc7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBpZiAobWVkaWFTdGVwICE9PSBuZXdTdGVwKSB7XG4gICAgICAgIC8vICAgICAgICAgbWVkaWFTdGVwID0gbmV3U3RlcDtcbiAgICAgICAgLy8gICAgICAgICBvYmouYnVpbGRTbGlkZXIoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSxcbiAgICAgICAgcmVtb3ZlU2xpZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXItd3JhcHBlcicpO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbm90LWVub3VnaC1lbGVtcycpXG4gICAgICAgICAgICB3cmFwcGVyICYmIHdyYXBwZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICBpZiAodGltZXJJZCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZTogdG9nZ2xlSW5kZXhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZEluZGljYXRvcnMoKSB7XG4gICAgICAgIHZhciBwcmV2SW5kID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbmRpY2F0b3JzJyk7XG4gICAgICAgIHByZXZJbmQgJiYgcHJldkluZC5yZW1vdmUoKTtcblxuICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbmRpY2F0b3JzLmNsYXNzTGlzdC5hZGQoJ3NsaWRlci1pbmRpY2F0b3JzJylcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLmNlaWwoaXRlbXMubGVuZ3RoIC8gZ2V0SXRlbXNRdWFudGl0eSgpKTsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW5kaWNhdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBpbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWluZGljYXRvcicpO1xuICAgICAgICAgICAgaWYgKGkgPT09IGFjdGl2ZUluZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kaWNhdG9yLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpKVxuICAgICAgICAgICAgaW5kaWNhdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRvZ2dsZUluZGV4KGkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaW5kaWNhdG9ycy5hcHBlbmRDaGlsZChpbmRpY2F0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdyYXBwZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXdyYXBwZXInKVxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGluZGljYXRvcnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkUGFnZXMoc3RlcCkge1xuICAgICAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgICAgICB2YXIgcGFnZVByZXYgPSBidWlsZFBhZ2Uob2JqLmFjdGl2ZUluZGV4ICsgaXRlbXMubGVuZ3RoIC0gZ2V0SXRlbXNRdWFudGl0eSgpICogc3RlcCk7XG4gICAgICAgIHZhciBwYWdlQ3VycmVudCA9IGJ1aWxkUGFnZShvYmouYWN0aXZlSW5kZXgpXG4gICAgICAgIHZhciBwYWdlTmV4dCA9IGJ1aWxkUGFnZShvYmouYWN0aXZlSW5kZXggKyBnZXRJdGVtc1F1YW50aXR5KCkgKiBzdGVwKTtcbiAgICAgICAgdmFyIGlubmVyID0gZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbm5lcicpO1xuICAgICAgICBpZiAoZ2V0SXRlbXNRdWFudGl0eSgpIDwgaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBidWlsZEluZGljYXRvcnMoKTtcbiAgICAgICAgICAgIGlmICghZWwucXVlcnlTZWxlY3RvcignLnNsaWRlci1pbmRpY2F0b3IuYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAvLyB0b2dnbGVJbmRleCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbm5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaW5uZXIuYXBwZW5kQ2hpbGQocGFnZVByZXYpXG4gICAgICAgIGlubmVyLmFwcGVuZENoaWxkKHBhZ2VDdXJyZW50KVxuICAgICAgICBpbm5lci5hcHBlbmRDaGlsZChwYWdlTmV4dClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBidWlsZFBhZ2UoaW5kZXgpIHtcbiAgICAgICAgdmFyIHBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHBhZ2UuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLXBhZ2UnKVxuICAgICAgICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPCAoaW5kZXggKyBnZXRJdGVtc1F1YW50aXR5KCkpOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gaXRlbXNbaSAlIGl0ZW1zLmxlbmd0aF07XG4gICAgICAgICAgICBsZXQgbmV3SXRlbSA9IGl0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChuZXdJdGVtKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYWdlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUluZGV4KGluZGV4KSB7XG4gICAgICAgIHZhciBpbmRBY3RpdmUgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLWluZGljYXRvci5hY3RpdmUnKVxuICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXItaW5kaWNhdG9yJyk7XG4gICAgICAgIGlmICghaW5kaWNhdG9yc1tpbmRleF0pIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgbGVmdEFycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2Fycm93LWRpc2FibGVkJyk7XG4gICAgICAgIHJpZ2h0QXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYXJyb3ctZGlzYWJsZWQnKTtcblxuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIGxlZnRBcnJvdy5jbGFzc0xpc3QuYWRkKCdhcnJvdy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSBpbmRpY2F0b3JzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJpZ2h0QXJyb3cuY2xhc3NMaXN0LmFkZCgnYXJyb3ctZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZEFjdGl2ZSAmJiBpbmRBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgaW5kaWNhdG9yc1tpbmRleF0gJiYgaW5kaWNhdG9yc1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgaWYgKGluZGV4ID4gYWN0aXZlSW5kSW5kZXgpIHtcbiAgICAgICAgICAgIGluZGV4IC0gYWN0aXZlSW5kSW5kZXggPiAxICYmIGJ1aWxkUGFnZXMoaW5kZXggLSBhY3RpdmVJbmRJbmRleClcbiAgICAgICAgICAgIG9iai5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBhY3RpdmVJbmRJbmRleCkge1xuICAgICAgICAgICAgYWN0aXZlSW5kSW5kZXggLSBpbmRleCA+IDEgJiYgYnVpbGRQYWdlcyhhY3RpdmVJbmRJbmRleCAtIGluZGV4KVxuICAgICAgICAgICAgb2JqLnByZXYoKVxuICAgICAgICB9XG4gICAgICAgIGFjdGl2ZUluZEluZGV4ID0gaW5kZXhcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1cnJlbnQnKS50ZXh0Q29udGVudCA9IGFjdGl2ZUluZEluZGV4ICsgMTtcbiAgICB9XG5cbiAgICBvYmoucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXdyYXBwZXInKVxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3ByZXYnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXYnKVxuICAgICAgICAgICAgb2JqLmFjdGl2ZUluZGV4ID0gKG9iai5hY3RpdmVJbmRleCAtIGdldEl0ZW1zUXVhbnRpdHkoKSArIGl0ZW1zLmxlbmd0aCkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICBidWlsZFBhZ2VzKClcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG5cbiAgICBvYmoubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc2xpZGVyLXdyYXBwZXInKVxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ25leHQnKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ25leHQnKVxuICAgICAgICAgICAgb2JqLmFjdGl2ZUluZGV4ID0gKG9iai5hY3RpdmVJbmRleCArIGdldEl0ZW1zUXVhbnRpdHkoKSArIGl0ZW1zLmxlbmd0aCkgJSBpdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICBidWlsZFBhZ2VzKClcbiAgICAgICAgfSwgMzAwKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iai5pbml0KCk7XG59XG4iLCIiXX0=
