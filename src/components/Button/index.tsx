import { memo } from "react";

const Button = (
  props: { text: string } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { text, ...rest } = props;
  return (
    <button className="p-2 rounded bg-zinc-500 text-white w-28" {...rest}>
      {text}
    </button>
  );
};

export default memo(Button);
