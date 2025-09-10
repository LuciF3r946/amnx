// src/components/Button.tsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

interface ButtonProps {
  label?: string;
  href?: string; // For navigation
  onClick?: () => void; // For actions
}

const Btnb: React.FC<ButtonProps> = ({ label = "Anatomy", href, onClick }) => {
  const ButtonContent = (
    <button className="button" onClick={onClick}>

      <div className="padding-left hide">
        <div className="padding-left-line">
          <span className="padding-left-text">My Journey</span>
        </div>
      </div>

      <div className="background hide">
        <span className="background-text">Where i Live</span>
      </div>
      <div className="border hide">
        <span className="border-text">My Education</span>
      </div>
      <span className="title">{label}</span>
      <div className="icon">
        <span className="text-icon hide">My Age</span>
        <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth={2} stroke="currentColor" height={24} width={24} viewBox="0 0 24 24">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </div>
    </button>
  );

  // If href is provided → use Next.js <Link>
  return (
    <StyledWrapper>
      {href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 14px;
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8));
    color: hsl(var(--primary-foreground));
    border: solid 2px hsl(var(--primary));
    height: 52px;
    padding: 0px 24px;
    border-radius: 26px;
    font-weight: 600;
    font-family: var(--font-inter, system-ui, sans-serif);
    transform: scale(0.92);
    position: relative;
    min-height: 48px;
    width: 100%;
    touch-action: manipulation;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  @media (min-width: 640px) {
    .button {
      width: auto;
    }
  }

  .button:not(:hover) .hide,
  .button:not(:hover) .icon::before,
  .button:not(:hover) .icon::after {
    opacity: 0;
    visibility: hidden;
    transform: scale(1.4);
  }
  .hide {
    transition: all 0.2s ease;
  }
  .button:active {
    background: linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary) / 0.7));
    border-color: hsl(var(--primary));
    transform: scale(0.95);
  }

  /* Mobile-specific optimizations */
  @media (hover: none) {
    .button:not(:hover) .hide,
    .button:not(:hover) .icon::before,
    .button:not(:hover) .icon::after {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
    
    .button:hover .icon svg {
      border: solid 2px transparent;
      filter: none;
    }
  }

  @media (max-width: 639px) {
    .hide {
      display: none !important;
    }
    
    .icon::before,
    .icon::after {
      display: none !important;
    }
    
    .padding-left,
    .padding-left-line,
    .padding-left-text,
    .background,
    .background::before,
    .background::after,
    .background-text,
    .border,
    .border::before,
    .border::after,
    .border-text,
    .text-icon {
      display: none !important;
    }
  }

  .icon {
    position: relative;
  }
  .icon::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    background-color: hsl(var(--primary-foreground));
    border-radius: 100%;
  }
  .icon::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(-19%, -60%);
    width: 100px;
    height: 33px;
    background-color: transparent;
    border-radius: 12px 22px 2px 2px;
    border-right: solid 2px hsl(var(--primary-foreground));
    border-top: solid 2px transparent;
  }
  .icon .text-icon {
    color: hsl(var(--primary-foreground));
    position: absolute;
    font-size: 12px;
    left: -37px;
    top: -38px;
    font-weight: 500;
    text-shadow: 0 0 8px hsl(var(--primary-foreground) / 0.5);
  }
  .icon svg {
    width: 20px;
    height: 20px;
    border: solid 2px transparent;
    display: flex;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .button:hover .icon svg {
    border: solid 2px hsl(var(--primary-foreground));
    filter: drop-shadow(0 0 8px hsl(var(--primary-foreground) / 0.5));
  }
  .padding-left {
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: hsl(var(--primary-foreground));
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-left:before {
    content: "";
    width: 2px;
    height: 10px;
    background-color: hsl(var(--primary-foreground));
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-left:after {
    content: "";
    width: 2px;
    height: 10px;
    background-color: hsl(var(--primary-foreground));
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-left-line {
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: hsl(var(--primary-foreground));
    left: -24px;
    top: 11px;
    transform: rotate(-50deg);
  }
  .padding-left-line::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    background-color: hsl(var(--primary-foreground));
    border-radius: 100%;
  }
  .padding-left-text {
    color: hsl(var(--primary-foreground));
    font-size: 12px;
    position: absolute;
    white-space: nowrap;
    transform: rotate(50deg);
    bottom: 30px;
    left: -67px;
    font-weight: 500;
    text-shadow: 0 0 8px hsl(var(--primary-foreground) / 0.5);
  }

  .padding-right {
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: hsl(var(--primary-foreground));
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-right:before {
    content: "";
    width: 2px;
    height: 10px;
    background-color: hsl(var(--primary-foreground));
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-right:after {
    content: "";
    width: 2px;
    height: 10px;
    background-color: hsl(var(--primary-foreground));
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .padding-right-line {
    position: absolute;
    width: 30px;
    height: 2px;
    background-color: hsl(var(--primary-foreground));
    right: -24px;
    top: 11px;
    transform: rotate(50deg);
  }
  .padding-right-line::before {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 6px;
    height: 6px;
    transform: translate(-50%, -50%);
    background-color: hsl(var(--primary-foreground));
    border-radius: 100%;
  }
  .padding-right-text {
    color: hsl(var(--primary-foreground));
    font-size: 12px;
    position: absolute;
    white-space: nowrap;
    transform: rotate(-50deg);
    bottom: 34px;
    left: 21px;
    font-weight: 500;
    text-shadow: 0 0 8px hsl(var(--primary-foreground) / 0.5);
  }
  .background {
    position: absolute;
  }
  .background::before {
    content: "";
    position: absolute;
    right: 27px;
    bottom: -70px;
    width: 100px;
    height: 53px;
    background-color: transparent;
    border-radius: 0px 0px 22px 22px;
    border-right: solid 2px hsl(var(--primary-foreground));
    border-bottom: solid 2px transparent;
  }
  .background::after {
    content: "";
    position: absolute;
    right: 25px;
    bottom: -20px;
    width: 6px;
    height: 6px;
    background-color: hsl(var(--primary-foreground));
    border-radius: 100%;
  }
  .background-text {
    position: absolute;
    color: hsl(var(--primary-foreground));
    font-size: 12px;
    bottom: -70px;
    left: -115px;
    font-weight: 500;
    text-shadow: 0 0 8px hsl(var(--primary-foreground) / 0.5);
  }
  .border {
    position: absolute;
    right: 0;
    top: 0;
  }
  .border:before {
    content: "";
    width: 15px;
    height: 15px;
    border: solid 2px hsl(var(--primary-foreground));
    position: absolute;
    right: 0%;
    top: 0;
    transform: translate(50%, -50%);
    border-radius: 100%;
  }
  .border:after {
    content: "";
    width: 2px;
    height: 25px;
    background-color: hsl(var(--primary-foreground));
    position: absolute;
    right: -10px;
    top: -15px;
    transform: translate(50%, -50%) rotate(60deg);
  }
  .border .border-text {
    position: absolute;
    color: hsl(var(--primary-foreground));
    font-size: 12px;
    right: -112px;
    top: -30px;
    white-space: nowrap;
    font-weight: 500;
    text-shadow: 0 0 8px hsl(var(--primary-foreground) / 0.5);
  }`;

export default Btnb;
