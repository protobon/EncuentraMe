const cookies = () => {
  const urlsScriptsCookies = ['https://analytics.google.com', 'https://facebook.com'];

  function contentScriptCookies () {

  }

  const sectionCookie = document.querySelector('section.cookies');
  const cookiesYes = document.querySelector('.cookies__boton--si');
  const cookieNo = document.querySelector('.cookies__boton--no');
  const nuevosScripts = document.querySelector('#nuevosScripts');

  function hideCookies () {
    sectionCookie.remove();
  }

  function okCookies () {
    hideCookies();
    localStorage.setItem('cookie', true);
    runOnOk();
  }

  function cancelCookies () {
    hideCookies();
    localStorage.setItem('cookie', false);
  }

  function runOnOk () {
    urlsScriptsCookies.forEach((url) => {
      const newScripts = document.createElement('script');
      newScripts.setAttribute('src', url);
      nuevosScripts.appendChild(newScripts);
    });
    contentScriptCookies();
  }

  function init () {
    if (localStorage.getItem('cookie') !== null) {
      if (localStorage.getItem('cookie') === 'true') {
        okCookies();
      } else {
        cancelCookies();
      }
    }
  }

  cookiesYes.addEventListener('click', okCookies, false);
  cookieNo.addEventListener('click', cancelCookies, false);

  return {
    init: init
  };
};

cookies().init();
