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
      size = "xxl"
      variant="gradient"
      gradient={{ from: '#007bff', to: '#00c6ff', deg: 90 }}
      aria-label={content ==="+" ? "Increase value" : "Decrease value"}
      onClick={() => setFunction(content === "+" ? increment(value, maxValue) : decrement(value, minValue))}
      disabled={content ==="+" ? value === maxValue :value === minValue}
    >
      {content}
    </ActionIcon>                       
  );
}