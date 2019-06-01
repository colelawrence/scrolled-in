interface HTMLElement {
  __sivEntered: boolean
}

interface Window {
  /** Class to select elements that need to be set up (defaults to "si")*/
  siClass?: string,
  /** Class to mark elements that have scrolled in (defaults to "si-scrolled-in")*/
  siScrolledInClass?: string,
  /** Class to mark elements that have scrolled in enabled (defaults to "si-enabled")*/
  siEnabledClass?: string,
  /** Should we mark the additional states? (default: false)
   * other status can include
   * ".si-leaving" – the element top is above the top of frame,
   * ".si-entering" – the element bottom is above bottom of the frame,
   * ".si-offscreen-below" – the element is below the scroll area,
   * ".si-offscreen-above" – the element is above the scroll area (applied only after it has scrolled-in once)
   */
  siAdditionalEvents?: boolean,
}

; (function (window: Window, document: Document) {
  const elementClass = window.siClass || "si";
  const elementScrolledInClass = window.siScrolledInClass || "si-scrolled-in";
  const elementEnabledClass = window.siScrolledInClass || "si-enabled";

  const onreadystatechange = () => {
    const ready = document.readyState;
    if (ready === "interactive" || ready === "loading") {
      // DOM is interactive
      // We can enable si
      document.removeEventListener("readystatechange", onreadystatechange)
      setupSiv()
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("readystatechange", onreadystatechange)
  } else {
    onreadystatechange()
  }

  function setupSiv() {
    const elts = <HTMLElement[]> [].slice.call(document.getElementsByClassName(elementClass));

    elts.forEach(elt => elt.classList.add("si-enabled"));

    onScroll(window, () => {
      elts.forEach(elt => {
        const top = getOffset(elt).top;
        const viewHeight = window.innerHeight;
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
      })
    })

  }

  function onScroll(target: EventTarget, fn: () => any) {
    const onscroll = () => fn();
    setTimeout(onscroll, 100)

    if (supportsPassive()) {
      target.addEventListener("scroll", onscroll, { passive: true });
    } else {
      let timer: number;
      addEventListener("scroll", (evt) => {
        clearTimeout(timer);
        timer = setTimeout(onscroll, 10);
      })
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
    } catch (e) { }
    return supportsPassiveOption;
  }

  function getOffset(elem: HTMLElement) {
    // borrowed from jQuery
    // https://github.com/jquery/jquery/blob/438b1a3e8a52d3e4efd8aba45498477038849c97/src/offset.js#L68
    var rect: ClientRect, win: Window;

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