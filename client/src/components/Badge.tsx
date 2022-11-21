import React from 'react';

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Badge: React.FC<Props> = ({
  children,
  className,
  style,
  ...rest
}: Props) => {
  return (
    <div
      style={style}
      className={`min-w-[5rem] inline-block text-center py-1 px-2 rounded-md text-stone-900 font-medium ${
        className || ''
      }`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Badge;
