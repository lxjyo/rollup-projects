import React from 'react';
interface IProps {
  type: 'primary' | 'danger' | 'default';
  size: 'small' | 'large' | 'middle';
  disabled: boolean;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
import styles from './index.module.scss';
console.log(styles);

const Button: React.FC<Partial<IProps>> = ({
  type = 'default',
  size = 'small',
  disabled = false,
  children,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[`button-${type}`]} ${
        styles[`button-${size}`]
      }`}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
      }}
    >
      {children}
    </button>
  );
};
export default Button;
