import { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

const RootLayout: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <>
        {/* {children} */}
    </>
  );
};
export default RootLayout;
