import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: "activateCamera" | "diagnose" | "secondary" | "danger" | "default";
}

export default function Button({
  onClick,
  loading = false,
  disabled = false,
  children,
  className = "",
  variant = "diagnose",
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      $variant={variant}
    >
      {loading ? <Spinner /> : <span>{children}</span>}
    </StyledButton>
  );
}

// Variant color map
const variantStyles: Record<string, { bg: string; hover?: string }> = {
  activateCamera: { bg: "#2e7d32", hover: "#27632a" },
  diagnose: { bg: "#388e3c", hover: "#2e7d32" },
  secondary: { bg: "#546e7a", hover: "#455a64" },
  danger: { bg: "#d32f2f", hover: "#c62828" },
  default: { bg: "#0288d1", hover: "#0277bd" },
};

// Styled button
const StyledButton = styled.button<{ $variant: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 40px;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background 0.3s ease,
    border-color 0.25s;
  color: white;
  margin-top: 15px;

  background-color: ${({ $variant }) =>
    variantStyles[$variant]?.bg || variantStyles.default.bg};

  &:hover {
    background-color: ${({ $variant }) =>
      variantStyles[$variant]?.hover || variantStyles.default.hover};
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Spinner
const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #4caf50;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
