// import DashboardMain from "@/components/dashboard/DashboardMain";
// import { getSession } from "next-auth/react";
// import Footer from "@/components/ui/Footer";
// import Navbar from "@/components/ui/Navbar";
// import UserDetails from "@/components/ui/UserDetails";
// import React from "react";

// function dashboard() {
//   return (
//     <div>
//       <UserDetails />
//       <Navbar />

//       <DashboardMain />

//       <Footer />
//     </div>
//   );
// }

// export default dashboard;

import { getSession } from "next-auth/react";
import DashboardMain from "@/components/dashboard/DashboardMain";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import UserDetails from "@/components/ui/UserDetails";
import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Session } from "next-auth";


// 1. Accept the session as a prop (optional)
function DashboardPage() {
  return (
    <div>
      <UserDetails />
      <Navbar />
      <DashboardMain />
      <Footer />
    </div>
  );
}

export default DashboardPage;

// 2. Protect the page using getServerSideProps
interface ServerSideProps {
  session: Session;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const session = await getSession(context);

  if (!session) {
    // If not logged in, redirect to login page
    return {
      redirect: {
        destination: "/login", // or your custom login route
        permanent: false,
      },
    };
  }

  // Optional: Pass session as props if needed
  return {
    props: {
      session,
    },
  };
}
