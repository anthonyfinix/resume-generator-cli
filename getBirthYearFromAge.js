module.exports = function getBirthYearFromAge(age) {
  const currentDate = new Date();
  return currentDate.getFullYear() - age; // Format as yyyy-mm-dd
};
