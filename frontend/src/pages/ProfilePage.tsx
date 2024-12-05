import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Header from "./landing/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "", 
        email: "", 
        createdAt: "",
        password: ""
    });
    const navigate = useNavigate()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const token = localStorage.getItem("recipeAppToken");
    const { userId } = JSON.parse(atob(token!.split(".")[1]))
    useEffect(() => {
       
        const fetchUser = async () => {
            try {
                console.log(userId)
                const response = await axios.get(`http://localhost:3000/api/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user);
                setUpdatedUser(response.data.user);
            } catch (error) {
                toast.error("Failed to load user details.");
            }
        };

        fetchUser();
    }, []); 

    const handleDeleteAccount = async () => {
        try {
            await axios.delete("http://localhost:3000/api/delete-user", { headers: { Authorization: `Bearer ${token}` } });
            setIsDeleteModalOpen(false);
            toast.success("Your account has been deleted successfully.");
            navigate('/auth')
        } catch (error) {
            toast.error("An error occurred while deleting the account.");
        }
    };

    const toggleDeleteModal = () => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        try {
        
            const response = await axios.put("http://localhost:3000/api/update-user", updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
            toast.success("Profile updated successfully.");
            setIsEditMode(false);
        } catch (error) {
            toast.error("Error updating profile.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
          
            <Header />

            <div className="flex-grow bg-white rounded-lg shadow-lg w-full p-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center">Profile Settings</h1>

                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-700">User Details</h2>
                    <div className="space-y-4">
                        {isEditMode ? (
                            <>
                                <div className="flex flex-col justify-center items-center gap-6 text-left">
                                    <label className="text-gray-500">Username</label>
                                    <input
                                        className="border border-gray-300 p-2 rounded bg-white text-gray-700 w-3/5"
                                        type="text"
                                        name="username"
                                        value={updatedUser.name}
                                        onChange={handleEditChange}
                                    />

                                    <label className="text-gray-500">Email</label>
                                    <input
                                        className="border border-gray-300 p-2 rounded bg-white text-gray-700 w-3/5"
                                        type="email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={handleEditChange}
                                    />
                                    <label className="text-gray-500">Password</label>
                                    <input
                                        className="border border-gray-300 p-2 rounded bg-white text-gray-700 w-3/5"
                                        type="email"
                                        name="email"
                                        value={updatedUser.password}
                                        onChange={handleEditChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-500">Username: {user.name}</p>
                                <p className="text-gray-500">Email: {user.email}</p>
                                <p className="text-gray-500">Password: *********</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-between">
                    {isEditMode ? (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSaveProfile}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setIsEditMode(false)}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                    <button
                        onClick={toggleDeleteModal}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    >
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white rounded-lg w-80 p-6 space-y-4 relative z-20">
                        <h3 className="text-xl font-semibold text-gray-800 text-center">Are you sure?</h3>
                        <p className="text-gray-500 text-center">This action is irreversible.</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={toggleDeleteModal}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ProfilePage;
