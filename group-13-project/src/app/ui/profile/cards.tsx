// import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from '@heroicons/react/24/outline';
// // import { cn } from '@/app/lib/utils';

// const iconMap = {
//   collected: BanknotesIcon,
//   customers: UserGroupIcon,
//   pending: ClockIcon,
//   invoices: InboxIcon,
// };

// interface Profile {
//   image_url: string;
//   name: string;
//   email: string;
//   bio: string;
//   description: string;
//   workshop: string;
//   artStyle: string;
//   instagram: string;
//   facebook: string;
//   pinterest: string;
// }

// export function UserProfileCard({ profile, className }: { profile: Profile; className?: string }) {
//   return (
//     <div className={'rounded-xl bg-gray-50 p-4 shadow-sm'}>
//       <div className="flex items-center space-x-4 p-4">
//         <img src={profile.image_url} alt={profile.name} className="h-16 w-16 rounded-full object-cover" />
//         <div>
//           <h3 className="text-lg font-bold">{profile.name}</h3>
//           <p className="text-sm text-gray-600">{profile.email}</p>
//         </div>
//       </div>
//       <div className="p-4">
//         <p className="text-sm font-medium">Bio: {profile.bio}</p>
//         <p className="text-sm">{profile.description}</p>
//         <p className="text-sm">Workshop: {profile.workshop}</p>
//         <p className="text-sm">Art Style: {profile.artStyle}</p>
//         <div className="flex space-x-2 mt-2">
//           <a href={profile.instagram} target="_blank" className="text-blue-500">Instagram</a>
//           <a href={profile.facebook} target="_blank" className="text-blue-700">Facebook</a>
//           <a href={profile.pinterest} target="_blank" className="text-red-600">Pinterest</a>
//         </div>
//       </div>
//     </div>
//   );
// }
