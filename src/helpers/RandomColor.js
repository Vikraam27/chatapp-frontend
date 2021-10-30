const RandomColor = () => {
  const hex = Math.floor(Math.random() * 0xFFFFFF);
  const color = `#${hex.toString(16)}`;

  return color;
};

export default RandomColor;
