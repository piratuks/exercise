export const randomNumber = (newTick: number, originalStep: number): number => {
  const lowerEnd = newTick - originalStep + 1;

  return Math.floor(Math.random() * originalStep) + lowerEnd;
};
