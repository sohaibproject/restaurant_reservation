import AppLogo from '../../../assets/logo-yassir.svg';
const NavBar = () => {
  return (
    <nav className='p-4 mx-4 mt-2 flex justify-between items-center bg-white shadow-md rounded-lg'>
      {/* Logo */}
      <div className='text-2xl font-bold'>
        <img src={AppLogo} alt='nav-logo' width={100} height={60} />
      </div>

      {/* User Icon */}
      <div className='flex items-center space-x-2'>
        <span className='font-bold text-gray-800'>Admin</span>
        <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
          <span className='text-gray-600 text-lg'>A</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
