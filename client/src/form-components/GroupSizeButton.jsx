import { ActionIcon } from '@mantine/core';
import '../styles/GroupSizeButton.css';

const increment = (prev, maxValue) => {
  if (isNaN(prev))
    return minValue+1;
  if (maxValue>prev)
    return prev + 1
  return prev;
}
const decrement = (prev, minValue) => {
  if (prev>minValue)
    return prev - 1;
  return minValue;
}

export const GroupSizeButton = ({content, maxValue, minValue, value, setFunction}) => {
  return (
    <ActionIcon
      className="group-size-button"
      color = "rgb(0, 160, 255)"
      aria-label={content ==="+" ? "Increase value" : "Decrease value"}
      onClick={() => setFunction(content === "+" ? increment(value, maxValue) : decrement(value, minValue))}
      disabled={content ==="+" ? value === maxValue :value === minValue}
    >
      {content}
    </ActionIcon>                       
  );
}