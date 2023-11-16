module.exports = {
  generateUniqueCode: () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let uniqueCode = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      uniqueCode += charset[randomIndex];
    }
    return uniqueCode;
  },
};
