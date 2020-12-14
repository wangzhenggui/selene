import * as React from 'react';
import classNames from 'classnames';
import './index.local.less';

export type ButtonType = 'primary' | 'dashed' | 'link' | 'default';
export type TargetType = '_self' | '_blank';
export type SizeType = 'small' | 'middle' | 'large' | undefined;

export interface BaseButtonProps {
  type?: ButtonType;
  disabled?: boolean;
  size?: SizeType;
  href?: string;
  loading?: boolean;
  target?: TargetType;
  children?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement | HTMLAnchorElement>;
}
const InternalButton: React.ForwardRefRenderFunction<unknown, BaseButtonProps> = (props, ref) => {
  const {
    type,
    disabled,
    size,
    href,
    target,
    loading,
    suffixIcon,
    prefixIcon,
    children,
    ...other
  } = props
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props
    if (loading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLElement | HTMLAnchorElement>)(e)
    }
  }

  const classes = classNames('selene-button', {
    [`selene-button-${type}`]: true,
  });
  
  return (
    <button
      onClick={handleClick}
      className={classes}
      {...other}
    >
      {React.Children.map(children, (item) => item)}
    </button>
  )
}

const Button = React.forwardRef<unknown, BaseButtonProps>(InternalButton)
export default Button