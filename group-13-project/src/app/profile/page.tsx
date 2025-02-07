import Image from 'next/image';
import { fetchUserProfiles } from '@/app/lib/data';
import { FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';




export default async function Page() {
    // const profile = fetchUserProfiles();
    const fetchprofile =  await fetchUserProfiles();
    const profile = fetchprofile[0];
    return (
        <main>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="max-w-md w-full shadow-lg rounded-2xl overflow-hidden">
        <div className="bg-white p-6 text-center">
          <Image
            src={profile.image_url || 'mockup.png'}
            alt={profile.name}
            width={120}
            height={120}
            className="mx-auto rounded-full border-4 border-purple-400"
          />
          <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        <div className="bg-white p-6">
          <h3 className="text-xl font-semibold mb-2">About Me</h3>
          <p className="text-gray-800 mb-4">{profile.bio}</p>
          <h3 className="text-xl font-semibold mb-2">My Workshop</h3>
          <p className="text-gray-800 mb-4">{profile.workshop}</p>
          <h3 className="text-xl font-semibold mb-2">Art Style</h3>
          <p className="text-gray-800 mb-4">{profile.artStyle}</p>
          <div className="flex justify-around mt-4">
            <a href={profile.instagram} target="_blank" className="text-pink-600">
              <FaInstagram size={28} />
            </a>
            <a href={profile.facebook} target="_blank" className="text-blue-600">
              <FaFacebook size={28} />
            </a>
            <a href={profile.pinterest} target="_blank" className="text-red-600">
              <FaPinterest size={28} />
            </a>
          </div>
          
        </div>
      </div>
    </div>
        </main>
    )
}        



// export default function Page() {
//     const profile = fetchUserProfiles();

//     return (
//       <main>
//         <h1 className={`mb-4 text-xl md:text-2xl`}>
//           Profile
//         </h1>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {/* <Suspense fallback={<CardSkeleton />}>
//             <CardWrapper />
//           </Suspense> */}
          
//         </div>
        // <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        //   <RevenueChart revenue={revenue}  />
        //   <Suspense fallback={<RevenueChartSkeleton />}>
        //     <RevenueChart />
        //   </Suspense>
        //   <Suspense fallback={<LatestInvoicesSkeleton />}>
        //     <LatestInvoices />
        //   </Suspense> 
        // </div>
//       </main>
//     );
//   }
  





// export default function Profile() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//         {/** Navigation / Search */}
//       <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm">
//         <Image
//           src={artistProfile.profilePicture}
//           width={120}
//           height={120}
//           className="rounded-full mx-auto"
//           alt="Profile Picture"
//         />

//         <h1 className="text-2xl font-bold mt-4">{artistProfile.name}</h1>
//         <p className="text-gray-600 mt-2">{artistProfile.bio}</p>
//         <p className="text-gray-500 mt-4 text-sm">{artistProfile.description}</p>
//         <h2 className="text-lg font-semibold mt-6">Workshop</h2>
//         <p className="text-gray-700 mt-2 font-medium">{artistProfile.workshop.title}</p>
//         <p className="text-gray-500 text-sm">{artistProfile.workshop.details}</p>
//         <h2 className="text-lg font-semibold mt-6">Art Style</h2>
//         <p className="text-gray-700 mt-2">{artistProfile.artStyle}</p>
        // <div className="flex justify-center space-x-4 mt-4">
        //   <a href={artistProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
        //     <FaInstagram className="text-pink-600 hover:text-pink-800 text-2xl" />
        //   </a>
        //   <a href={artistProfile.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
        //     <FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl" />
        //   </a>
        //   <a href={artistProfile.socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
        //     <FaPinterest className="text-red-600 hover:text-red-800 text-2xl" />
        //   </a>
        // </div>
//       </div>
//     </div>
//   );
// }


// export default function Profile() {
//     return (
//       <Layout>
//         <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm">
//           <Image
//             src={artistProfile.profilePicture}
//             width={120}
//             height={120}
//             className="rounded-full mx-auto"
//             alt="Profile Picture"
//           />
//           <h1 className="text-2xl font-bold mt-4">{artistProfile.name}</h1>
//           <p className="text-gray-600 mt-2">{artistProfile.bio}</p>
//           <p className="text-gray-500 mt-4 text-sm">{artistProfile.description}</p>
//           <h2 className="text-lg font-semibold mt-6">Workshop</h2>
//           <p className="text-gray-700 mt-2 font-medium">{artistProfile.workshop.title}</p>
//           <p className="text-gray-500 text-sm">{artistProfile.workshop.details}</p>
//           <h2 className="text-lg font-semibold mt-6">Art Style</h2>
//           <p className="text-gray-700 mt-2">{artistProfile.artStyle}</p>
//           <div className="flex justify-center space-x-4 mt-4">
//             <a href={artistProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
//               <FaInstagram className="text-pink-600 hover:text-pink-800 text-2xl" />
//             </a>
//             <a href={artistProfile.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
//               <FaFacebook className="text-blue-600 hover:text-blue-800 text-2xl" />
//             </a>
//             <a href={artistProfile.socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
//               <FaPinterest className="text-red-600 hover:text-red-800 text-2xl" />
//             </a>
//           </div>
//         </div>
//       </Layout>
//     );
//   }
  