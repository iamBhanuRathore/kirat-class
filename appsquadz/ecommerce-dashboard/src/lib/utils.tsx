export function getInitials(username: string): string {
  // Split the username by spaces
  const words = username.split(" ");

  // Initialize an empty string for storing initials
  let initials = "";

  // Iterate through each word to get the first character
  words.forEach((word) => {
    // Check if the first character is a letter or number
    if (/^[A-Za-z0-9]/.test(word)) {
      initials += word.charAt(0).toUpperCase(); // Append the initial in uppercase
    }
  });

  return initials;
}
