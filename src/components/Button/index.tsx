import classnames from 'classnames';
import { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from 'react';

import './style.scss';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  title: string;
  icon?: ReactNode;
  outline?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  title,
  icon,
  outline,
  disabled,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classnames(outline && 'outline', 'button', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="icon">{icon}</span>}
      {title}
    </button>
  );
};

export default Button;
