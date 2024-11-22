'use client';
import React, { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

const RootLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};
export default RootLayout;
