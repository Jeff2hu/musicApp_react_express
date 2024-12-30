interface ClickMeProps {
  count: number;
  handleClick: () => void;
}

const ClickMe = ({ count, handleClick }: ClickMeProps) => {
  // const ClickMe = () => {
  // const [count, setCount] = useState(0);

  // const handleClick = () => {
  //   setCount(count + 1);
  // };

  return (
    <div>
      <img src="/assets/react.svg" alt="React Logo" />
      <button onClick={handleClick}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default ClickMe;
