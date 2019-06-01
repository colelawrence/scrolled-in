;
(function (window, document) {
    var elementClass = window.siClass || "si";
    var elementScrolledInClass = window.siScrolledInClass || "si-scrolled-in";
    var elementEnabledClass = window.siScrolledInClass || "si-enabled";
    var onreadystatechange = function () {
        var ready = document.readyState;
        if (ready === "interactive" || ready === "loading") {
            // DOM is interactive
            // We can enable si
            document.removeEventListener("readystatechange", onreadystatechange);
            setupSiv();
        }
    };
    if (document.readyState === "loading") {
        document.addEventListener("readystatechange", onreadystatechange);
    }
    else {
        onreadystatechange();
    }
    function setupSiv() {
        var elts = [].slice.call(document.getElementsByClassName(elementClass));
        elts.forEach(function (elt) { return elt.classList.add("si-enabled"); });
        onScroll(window, function () {
            elts.forEach(function (elt) {
                var top = getOffset(elt).top;
                var viewHeight = window.innerHeight;
                // const height = elt.offsetHeight;
                if (top <= (scrollY + viewHeight) && elt.__sivEntered == null) {
                    elt.__sivEntered = true;
                    elt.classList.add(elementScrolledInClass);
                }
                // toggleClass(elt, "siv-leaving", top <= scrollY);
                // toggleClass(elt, "siv-entering", top <= (scrollY + viewHeight));
                // toggleClass(elt, "siv-offscreen-below", (top + height) < scrollY);
                // if (elt.__sivEntered != null) {
                //   toggleClass(elt, "siv-offscreen-above", top > (scrollY + viewHeight));
                // }
            });
        });
    }
    function onScroll(target, fn) {
        var onscroll = function () { return fn(); };
        setTimeout(onscroll, 100);
        if (supportsPassive()) {
            target.addEventListener("scroll", onscroll, { passive: true });
        }
        else {
            var timer_1;
            addEventListener("scroll", function (evt) {
                clearTimeout(timer_1);
                timer_1 = setTimeout(onscroll, 10);
            });
        }
    }
    function supportsPassive() {
        // borrowed from modernizr
        var supportsPassiveOption = false;
        try {
            var opts = Object.defineProperty({}, 'passive', {
                get: function () {
                    supportsPassiveOption = true;
                }
            });
            window.addEventListener('test', null, opts);
        }
        catch (e) { }
        return supportsPassiveOption;
    }
    function getOffset(elem) {
        // borrowed from jQuery
        // https://github.com/jquery/jquery/blob/438b1a3e8a52d3e4efd8aba45498477038849c97/src/offset.js#L68
        var rect, win;
        if (!elem) {
            return;
        }
        // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
        // Support: IE <=11+
        // Running getBoundingClientRect on a
        // disconnected node in IE throws an error
        if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
        }
        // Get document-relative position by adding viewport scroll to viewport-relative gBCR
        rect = elem.getBoundingClientRect();
        win = elem.ownerDocument.defaultView;
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };
    }
    /*
    function toggleClass(elt: HTMLElement, classname: string, force?: boolean) {
      elt.classList.toggle(classname, force)
    }
    */
}(window, document));
