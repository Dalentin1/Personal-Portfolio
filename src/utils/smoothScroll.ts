/**
 * Utility function to handle smooth scrolling to specific page sections.
 * 
 * @param targetId - The target ID selector (e.g., "#projects") or the ID string (e.g., "projects").
 * 
 * Logic:
 * 1. cleans the ID string.
 * 2. Calculates position relative to the document (viewport top + current scroll).
 * 3. Adjusts for the fixed navbar height (offset).
 * 4. Performs the scroll.
 */
export const smoothScrollTo = (targetId: string) => {
  // Remove the '#' character if present to get the clean ID
  const id = targetId.startsWith('#') ? targetId.slice(1) : targetId;
  
  // Find the target element in the DOM
  const element = document.getElementById(id);

  if (element) {
    // Define the offset to account for the fixed Navbar height
    const offset = 80;
    
    // Get the element's position relative to the viewport
    const elementRect = element.getBoundingClientRect().top;
    
    // Get the current scroll position of the window
    const scrollPosition = window.scrollY || window.pageYOffset;
    
    // Calculate the absolute position of the element on the page
    const offsetPosition = elementRect + scrollPosition - offset;

    // Execute the scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    // Fallback if ID is invalid: Scroll to top if href is '#' or just warn
    if (id === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn(`Target element with ID "${id}" not found.`);
    }
  }
};