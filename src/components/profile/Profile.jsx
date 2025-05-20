import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile } from "../../../service/profileApi";
import ChangePasswordModal from "./ChangePasswordModal";


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (error) {
      toast.error('Failed to fetch profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!profile) return <div className="text-center p-4">No profile data found.</div>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-xl mt-4 relative">
      {/* Profile Info */}
      <div className="flex flex-col items-center">
        <img
          src={profile.avatar || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <h2 className="text-xl font-semibold capitalize">{profile.name}</h2>
        <p className="text-gray-500">{profile.email || 'No Email'}</p>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p><strong>Mobile:</strong> {profile.mobileNumber}</p>
        {profile.contactNumber && <p><strong>Contact:</strong> {profile.contactNumber}</p>}
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>City:</strong> {profile.city}</p>
        <p><strong>State:</strong> {profile.state}</p>
        <p><strong>Country:</strong> {profile.country}</p>
        <p><strong>PIN Code:</strong> {profile.pinCode}</p>
        {profile.gender && <p><strong>Gender:</strong> {profile.gender}</p>}
        {profile.dateOfBirth && <p><strong>DOB:</strong> {profile.dateOfBirth}</p>}
        {profile.marrigeAniversary && <p><strong>Anniversary:</strong> {profile.marrigeAniversary}</p>}
        {profile.tradeName && <p><strong>Trade Name:</strong> {profile.tradeName}</p>}
        {profile.gstin && <p><strong>GSTIN:</strong> {profile.gstin}</p>}
        {profile.accountType && <p><strong>Account Type:</strong> {profile.accountType}</p>}
        <p><strong>Balance:</strong> ₹{profile.balance}</p>
        <p><strong>Loyalty Points:</strong> {profile.loyaltyPoints}</p>
        {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
        {profile.remark && <p><strong>Remark:</strong> {profile.remark}</p>}

      </div>

      {/* Change Password Button */}
      <button
        className="btn btn-outline btn-sm absolute top-4 right-4"
        onClick={() => setIsModalOpen(true)}
      >
        Change Password
      </button>

      {/* Modal */}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
