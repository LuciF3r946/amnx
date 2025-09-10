// src/components/Button.tsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface ButtonProps {
  label?: string;
  href?: string;  // page to navigate
}

const Btna: React.FC<ButtonProps> = ({ label = "Let's Start the project", href }) => {
  return (
    <StyledWrapper>
      {href ? (
        <Link href={href} className="button">
          <span className="button__icon-wrapper">
            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
          </span>
          {label}
        </Link>
      ) : (
        <button className="button">
          <span className="button__icon-wrapper">
            <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={10}>
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 14 15" fill="none" width={10} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
              <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
            </svg>
          </span>
          {label}
        </button>
      )}
    </StyledWrapper>
  );
}


const StyledWrapper = styled.div`
  .button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, oklch(60% 0.18 280), oklch(65% 0.2 300));
    color: oklch(98% 0 0);
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.875rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 40px -8px oklch(60% 0.18 280 / 0.15);
    min-height: 48px;
    width: 100%;
    justify-content: center;
    touch-action: manipulation;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  @media (min-width: 640px) {
    .button {
      width: auto;
      justify-content: flex-start;
      min-height: auto;
      padding: 0.75rem 1.5rem;
    }
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: oklch(60% 0.18 280);
    background-color: oklch(98% 0 0);
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 60px -12px oklch(60% 0.18 280 / 0.25);
    background: linear-gradient(135deg, oklch(65% 0.2 300), oklch(70% 0.18 320));
  }

  .button:hover .button__icon-wrapper {
    color: oklch(65% 0.2 300);
  }

  .button:active {
    transform: scale(0.98);
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }

  /* Mobile-specific optimizations */
  @media (hover: none) {
    .button:hover {
      transform: none;
      box-shadow: 0 8px 40px -8px oklch(60% 0.18 280 / 0.15);
      background: linear-gradient(135deg, oklch(60% 0.18 280), oklch(65% 0.2 300));
    }
    
    .button:hover .button__icon-wrapper {
      color: oklch(60% 0.18 280);
    }
    
    .button:hover .button__icon-svg:first-child {
      transform: none;
    }
    
    .button:hover .button__icon-svg--copy {
      transform: translate(-150%, 150%);
    }
  }
`;

export default Btna;
