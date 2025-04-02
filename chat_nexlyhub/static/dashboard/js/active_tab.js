const liButtons = document.querySelectorAll('.nav-item button.nav-link');

// Add event listeners to the buttons
liButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('id');
    setActiveTabCookie(tabId);
  });
});

// Function to set the cookie with the active tab ID
function setActiveTabCookie(tabId) {
  document.cookie = `activetab=${tabId}; path=/`;
}


function getCookieValue(cookieName) {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }

  return null;
}
const activeTab = getCookieValue('activetab');
var matchingButtonId = "";

$(".nav-item button.nav-link").each(function() {
  var buttonId = $(this).attr("id");
  if (buttonId === activeTab) {
    matchingButtonId = buttonId;
    return false; // Exit the loop if a match is found
  }
});
