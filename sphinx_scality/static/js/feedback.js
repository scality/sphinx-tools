const ARTESCA_DOCS_FEEDBACK_PROJECT_ID = "18624d5b-3d00-4989-8979-f835d24cf876"
const RING_DOCS_FEEDBACK_PROJECT_ID = "706d6ef8-5d55-47c7-b89b-45340f79e133"
const OLD_DOCS_FEEDBQCK_PROJECT_ID = "07e4358a-627c-4fd5-bbed-181f476eacc8";

window.onUsersnapCXLoad = function(api) {
    api.init();

    const isArtescaDocs = location.pathname.startsWith("/XDM") && location.pathname.startsWith("/Artesca");

    //Todo remove this once the old doc project is disabled 
    api.hide(OLD_DOCS_FEEDBQCK_PROJECT_ID);

    if (isArtescaDocs) {
        api.show(ARTESCA_DOCS_FEEDBACK_PROJECT_ID)
    } else {
        api.show(RING_DOCS_FEEDBACK_PROJECT_ID)
    }
}
var script = document.createElement('script');
script.defer = 1;
script.src = 'https://widget.usersnap.com/global/load/beb283e6-815c-4087-bfe7-7fb9a8362ec9?onload=onUsersnapCXLoad';
document.getElementsByTagName('head')[0].appendChild(script);

