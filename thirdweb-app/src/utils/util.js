export const daysLeft = (deadline) => {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeLeft = deadline - now; // Time left in seconds
    const daysLeft = Math.ceil(timeLeft / (60 * 60 * 24)); // Convert seconds to days
    return daysLeft > 0 ? daysLeft : 0; // Return 0 if the deadline has passed
};
  
export const calculateBarPercentage = (goal, amountRaised) => {
    const percentage = Math.round((amountRaised * 100) / goal);
  
    return percentage;
};
  
export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
};
