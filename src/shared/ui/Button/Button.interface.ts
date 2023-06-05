export interface IButtonProps {
  onClick?: () => void;
  variant?: string;
  size?: string;
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  styleProps?: unknown;
}
