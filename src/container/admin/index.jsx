import HeaderAdmin from "./layout/header";
import NavBarAdmin from "./layout/nav";

function AdminHome() {
  return (
    <div
      x-data="setup()"
      x-init="$refs.loading.classList.add('hidden'); setColors(color);"
    >
      <div class="flex h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
        <NavBarAdmin />
        <div class="flex-1 h-full overflow-x-hidden overflow-y-auto">
          <HeaderAdmin />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
