interface HTMLElement {
    __sivEntered: boolean;
}
interface Window {
    /** Class to select elements that need to be set up (defaults to "si")*/
    siClass?: string;
    /** Class to mark elements that have scrolled in (defaults to "si-scrolled-in")*/
    siScrolledInClass?: string;
    /** Class to mark elements that have scrolled in enabled (defaults to "si-enabled")*/
    siEnabledClass?: string;
    /** Should we mark the additional states? (default: false)
     * other status can include
     * ".si-leaving" – the element top is above the top of frame,
     * ".si-entering" – the element bottom is above bottom of the frame,
     * ".si-offscreen-below" – the element is below the scroll area,
     * ".si-offscreen-above" – the element is above the scroll area (applied only after it has scrolled-in once)
     */
    siAdditionalEvents?: boolean;
}
