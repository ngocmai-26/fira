import HeaderAdmin from "./HeaderLayout";
import NavBarAdmin from "./NavBar";

function Layout({ children }) {
  return (
    <div>
      <div class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
        <NavBarAdmin />
        <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
          <HeaderAdmin />
          <div className="scroll bg-white">
            <div className="scroll-item" style={{ height: "90vh" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
