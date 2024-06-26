import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className=" bg-black">
      {/* {children} */}
      {/* <UserProvider> */}

      <ToastContainer />

      {/* <Header /> */}

      <div>{children}</div>



      {/* </UserProvider> */}

      {/* <MenuContextProvider>
        <MainLayout>{children}</MainLayout>
      </MenuContextProvider>
       */}
      {/* {
        isAuthenticated ?  <RouterProvider router={router} /> : <RouterProvider router={LoginRoutes} />
      }
          */}

      {/* <Home/> */}

      {/* <Addproducts/> */}
    </body>
  </html>
  );
}
