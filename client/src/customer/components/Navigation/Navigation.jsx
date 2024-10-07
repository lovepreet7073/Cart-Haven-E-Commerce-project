import { Fragment, useEffect, useState } from 'react'
import React from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,

  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import { useSelector } from 'react-redux'
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getUser, logout } from '../../../Redux/Auth/Actions'
import AuthModal from '../../auth/AuthModal'
export const navigation = {
  categories: [
    {
      id: 'Women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'Clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: "top", href: `{women/clothing/tops}` },
            { name: 'Dresses', id: "women_dress", href: '#' },
            { name: 'Women Jeans', id: 'women_jeans' },
            { name: 'Lengha Choli', id: 'lengha_choli' },
            { name: 'Sweaters', id: 'sweater' },
            { name: 'T-Shirts', id: 't-shirt' },
            { name: 'Jackets', id: 'jacket' },
            { name: 'Gouns', id: 'gouns' },
            { name: 'Sarees', id: 'saree' },
            { name: 'Kurtas', id: 'kurtas' },
          ],
        },
        {
          id: 'Accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watch' },
            { name: 'Wallets', id: 'wallet' },
            { name: 'Bags', id: 'bag' },
            { name: 'Sunglasses', id: 'sunglasse' },
            { name: 'Hats', id: 'hat' },
            { name: 'Belts', id: 'belt' },
          ],
        },
        {
          id: 'Brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', id: '#' },
            { name: 'My Way', id: '#' },
            { name: 'Re-Arranged', id: '#' },
            { name: 'Counterfeit', id: '#' },
            { name: 'Significant Other', id: '#' },
          ],
        },
      ],
    },
    {
      id: 'Men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          id: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'Clothing',
          name: 'Clothing',
          items: [
            { name: 'Mens Kurtas', id: 'mens_kurta' },
            { name: 'Shirt', id: 'shirt' },
            { name: 'Men Jeans', id: 'men_jeans' },
            { name: 'Sweaters', id: '#' },
            { name: 'T-Shirts', id: 'T-Shirt' },
            { name: 'Jackets', id: '#' },
            { name: 'Activewear', id: '#' },

          ],
        },
        {
          id: 'Accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watches' },
            { name: 'Wallets', id: '#' },
            { name: 'Bags', id: '#' },
            { name: 'Sunglasses', id: '#' },
            { name: 'Hats', id: '#' },
            { name: 'Belts', id: '#' },
          ],
        },
        {
          id: 'Brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', id: '#' },
            { name: 'Counterfeit', id: '#' },
            { name: 'Full Nelson', id: '#' },
            { name: 'My Way', id: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
}
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [openModal, setopenModal] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const { auth } = useSelector(store => store)
  console.log(auth, "auth")
  const { cart } = useSelector(store => store)
  console.log(cart, "navigaton-cart")
  const jwt = localStorage.getItem("jwt")
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  const handleCategoryClick = (category, section, item) => {
    console.log(category.id, section.id, item.id, "category, section, item,")
    navigate(`/${category.id}/${section.id}/${item.id}`);
    setOpen(false);
  }

  const handleMyOrders = () => {
    navigate('/account/order')
    handleCloseUserMenu()
  }
  const hanldeMyprofile = () => {
    navigate('/user/profile')
    handleCloseUserMenu()
  }

  const hanldecloseModal = () => {
    setopenModal(false)
  }
  const handleopenModal = () => {
    setopenModal(true)
    setOpen(false)
  }

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])

  useEffect(() => {
    if (auth.user) {
      hanldecloseModal()
      handleCloseUserMenu()
      if (location.pathname === '/login' || location.pathname === '/register') {
        navigate('/')
      }
    }

  }, [auth.user])

  const handleLogout = () => {
    dispatch(logout())
    hanldecloseModal()
    navigate('/')
  }


  const handleCartClick = (event) => {
    event.preventDefault();
    navigate('/cart');

  }
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm" >
                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                          </div>
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >

                          {section.items.map((item) => (
                            <li key={item.name} className="flex">
                              <p
                                onClick={() => handleCategoryClick(category, section, item, close)

                                }
                                className='cursor-pointer hover:text-[#38a3a5]'
                              >
                                {item.name}
                              </p>
                            </li>
                          ))}

                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <Button onClick={handleopenModal}>
                Sign in
              </Button>
            </div>


          </DialogPanel>
        </div>

      </Dialog>

      {/* absolute bg-white z-10 w-full h-[20vh] */}
      <header className="relative bg-white ">
        <p style={{ backgroundColor: '#38a3a5' }} className="flex h-10 items-center justify-center  px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₹1000
        </p>

        <nav aria-label="Top" className=" ">
          <div className="border-b border-gray-200 lg:px-8 px-2">
            <div className="flex h-16 items-center lg:px-12 sm:px-0">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="lg:ml-4 flex lg:ml-0 items-center justify-between cursor-pointer" onClick={() => navigate('/')}>
                <img
                  src={"https://media.istockphoto.com/id/1172893073/vector/a-trolley-shopping-cart-logo-icon-design-shop-symbol-vector-illustrations.jpg?s=612x612&w=0&k=20&c=vvSTR1pKiLgb9taXhqf5V3E2MCfJDoe0Te9CgGRAZys="}
                  className="w-[4rem] h-[4rem]"
                  alt="Cart logo"
                />
                <a>
                  <span className="font-semibold text-lg sm:hidden"></span> {/* Hidden on small screens */}
                  <span className="font-semibold text-lg hidden sm:block">CartHaven</span> {/* Visible on screens larger than 'sm' */}
                </a>
              </div>


              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          {/* Button to trigger popover */}
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-[#38a3a5] text-[#38a3a5]'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          {/* Popover panel */}
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Shadow overlay */}
                              <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                              {/* Popover content */}
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    {/* Featured items */}
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              alt={item.imageAlt}
                                              src={item.imageSrc}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">Shop now</p>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Sectioned links */}
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <p
                                                  onClick={() => handleCategoryClick(category, section, item)}
                                                  className='cursor-pointer hover:text-[#38a3a5]'
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>
              {/* right side nav */}
              <div className="ml-auto flex items-center">
                <div className=" lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {
                    auth?.user?.firstName ? (
                      <div>
                        <Avatar
                          className='text-white mr-2'
                          aria-controls={open ? "basic-menu" : undefined}
                          onClick={handleClick}
                          area-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          sx={{
                            bgcolor: "#38a3a5",
                            color: "white",
                            cursor: "pointer"
                          }}
                        >
                          {auth.user?.firstName[0].toUpperCase()}

                        </Avatar>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openMenu}
                          onClose={handleCloseUserMenu}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={hanldeMyprofile}>

                            Profile
                          </MenuItem>
                          <MenuItem onClick={handleMyOrders}>
                            My Orders
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>
                            logout
                          </MenuItem>

                        </Menu>
                      </div>
                    ) : (
                      <>
                        <Button onClick={handleopenModal} variant="outlined"
                          component="span"

                          sx={{
                            borderColor: "#38a3a5",
                            color: "#38a3a5",
                            "&:hover": {
                              borderColor: "#2b8b8c",
                              backgroundColor: "#e0f7fa", // Light background color on hover
                              color: "#2b8b8c",
                            },
                          }}>
                          Sign in
                        </Button>

                      </>
                    )
                  }

                </div>


                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" onClick={handleCartClick} className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart?.cartItems?.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={hanldecloseModal} open={openModal} />
    </div>
  )
}