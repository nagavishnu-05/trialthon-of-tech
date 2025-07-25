// This disables F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, right click, etc.
export function disableDevTools() {
  if (typeof window === 'undefined') return;
  window.addEventListener('keydown', function (e) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I/J/C/U
    if ((e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
      return false;
    }
  });
  // Right click
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });
}
