# scrolled-in

Add a `si-scrolled-in` class to elements as they make an appearance on the page.

## Usage

The `scrolled-in` javascript file does not provide any animations, but adding animations is easy with CSS!

###### Example:

Here, we define our own custom animation class to interact with scrolled-in, the "scroll-reveal" class.
In order to avoid a flash of content, you should put the stylesheet and the `scrolled-in.js` script in the head of your page.

```html
<section class="si scroll-reveal">
    <h3>A welcoming title to this section</h3>
    <p>A simple body of text</p>
    <br>
    <p>Another interesting thought</p>
    <br>
    <p>An interesting thought</p>
</section>
```

```css
.scroll-reveal.si-enabled {
    transition: opacity 1s ease-out, transform 1s ease-out;
    opacity: 0;
    transform: translate(0px, 50px);
}
.scroll-reveal.si-scrolled-in {
    /* When the element is first seen */
    opacity: 1;
    transform: translate(0px, 0px);
}
```
