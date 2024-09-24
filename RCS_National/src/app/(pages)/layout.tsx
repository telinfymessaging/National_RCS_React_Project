import SectionLayout from "./section";
interface LayoutProps{
  children:React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
   <SectionLayout>{children}</SectionLayout>
  );
};
export default Layout;









