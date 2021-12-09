window.onUsersnapCXLoad = function(api) {
    api.init();
}
var script = document.createElement('script');
script.defer = 1;
script.src = 'https://widget.usersnap.com/global/load/beb283e6-815c-4087-bfe7-7fb9a8362ec9?onload=onUsersnapCXLoad';
document.getElementsByTagName('head')[0].appendChild(script);
