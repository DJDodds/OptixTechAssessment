
export const calculateReviewScore = (value: number[]) => {
    let sum = 0;
    const count = value.length;
    for (const review of value) {
      sum += review;
    }
  
    const average = sum / count;
    return average.toFixed(1)
  };
  